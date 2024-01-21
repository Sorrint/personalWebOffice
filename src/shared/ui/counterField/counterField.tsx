import {
  type MouseEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
  memo,
  forwardRef,
  type ForwardedRef,
  useRef,
  useEffect,
} from 'react';
import { type FieldValues, type Path } from 'react-hook-form';
import classNames from 'classnames';

import style from './counterField.module.scss';
import { IconFont } from '../iconFont';

interface ICounterFieldsProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  min?: number | string;
  max?: number | string;
  onClick?: (e: MouseEvent) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  onKeyPress?: (e: KeyboardEvent, name: Path<T>) => void;
  tabIndex?: number;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  autofocus?: boolean;
}

export const CounterField = memo(
  forwardRef(function CounterField<T extends FieldValues>(
    props: ICounterFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) {
    const {
      label,
      name,
      onChange,
      onClick,
      classname,
      onKeyPress,
      tabIndex,
      onFocus,
      min,
      max,
      autofocus,
    } = props;
    const inputClass = classNames(style.component, classname);
    const inputRef = useRef<HTMLInputElement | null>();

    const decrement = () => {
      inputRef.current?.stepDown();
    };

    const increment = () => {
      inputRef.current?.stepUp();
    };
    useEffect(() => {
      if (inputRef.current && !inputRef.current?.value) {
        inputRef.current.value = '0';
      }
    }, []);

    return (
      <div className={inputClass}>
        {label && (
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={style.counter}>
          <IconFont iconName='icon-minus' classname={style.icon} onClick={decrement} />
          <input
            autoFocus={autofocus ?? false}
            id={name}
            name={name}
            min={min}
            max={max}
            className={style.input}
            onChange={onChange}
            onClick={onClick}
            type={'number'}
            ref={(e) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref && 'current' in ref) {
                ref.current = e;
              }
              inputRef.current = e;
            }}
            onKeyDown={
              onKeyPress &&
              ((e) => {
                onKeyPress(e, name);
              })
            }
            tabIndex={tabIndex}
            onFocus={onFocus}
          />
          <IconFont iconName='icon-plus' classname={style.icon} onClick={increment} />
        </div>
      </div>
    );
  }),
);
