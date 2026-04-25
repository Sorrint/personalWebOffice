import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import useDebounce from '../../lib/hooks/useDebounce/useDebounce';
import { TextField } from '../TextField';
import { Loader } from '../Loaders/Loader';

import styles from './SearchInput.module.scss';
import { Popover } from '../Popover';

export interface SearchInputHandle {
  focus(): void;
  select(): void;
}

export interface SearchInputProps {
  onSearch: (value: string) => void;
  loading?: boolean;
  autoFocusOnTyping?: boolean;
  popoverOpen?: boolean;
  onPopoverClose?: () => void;
  children?: ReactNode;
}

const FOCUSABLE_SELECTOR = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

const isEditableTarget = (el: Element | null): boolean => {
  if (!el) return false;
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLElement && el.isContentEditable) return true;
  return false;
};
// TODO: подумать над переводом на Combobox из headlessUI
export const SearchInput = memo(
  forwardRef<SearchInputHandle, SearchInputProps>(function SearchInput(
    { onSearch, loading, autoFocusOnTyping, popoverOpen, onPopoverClose, children },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        select: () => inputRef.current?.select(),
      }),
      [],
    );

    const debouncedSearch = useDebounce(onSearch, 1000);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      debouncedSearch(e.target.value);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleInputKeydown = (e: KeyboardEvent) => {
      if (!popoverOpen) return;
      if (e.code === 'ArrowDown') {
        const first = popoverRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (first) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.code === 'ArrowUp' || e.code === 'Escape') {
        e.preventDefault();
        onPopoverClose?.();
      }
    };

    const handlePopoverKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        onPopoverClose?.();
        inputRef.current?.focus();
        return;
      }
      if (e.code === 'ArrowUp') {
        const first = popoverRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (e.target === first) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    useEffect(() => {
      if (!autoFocusOnTyping) return;
      const onKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key.length !== 1) return;
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (isEditableTarget(document.activeElement)) return;
        inputRef.current?.focus();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [autoFocusOnTyping]);

    const hidePopover = () => onPopoverClose?.();

    return (
      <>
        <div className={styles.field}>
          <TextField
            type='text'
            name='searchText'
            onChange={handleChange}
            label='Поиск'
            ref={inputRef}
            onKeyDown={handleInputKeydown}
            variant='standard'
            onFocus={handleFocus}
          />
          {loading && (
            <div className={styles.icon}>
              <Loader />
            </div>
          )}
        </div>
        <Popover
          isOpen={Boolean(popoverOpen)}
          onClose={hidePopover}
          referenceElement={inputRef.current as HTMLElement}
          sameWidth
        >
          <div ref={popoverRef} onKeyDown={handlePopoverKeyDown} className={styles.dropdown}>
            {children}
          </div>
        </Popover>
      </>
    );
  }),
);

SearchInput.displayName = 'SearchInput';
