import {
  type MouseEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
  memo,
  forwardRef,
  type ForwardedRef,
} from 'react';
import { type FieldValues, type Path } from 'react-hook-form';
import classNames from 'classnames';

import style from './counterField.module.scss';

interface ICounterFieldsProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  onClick?: (e: MouseEvent) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  onKeyPress?: (e: KeyboardEvent, name: Path<T>) => void;
  tabIndex?: number;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const CounterField = memo(
  forwardRef(function CounterField<T extends FieldValues>(
    props: ICounterFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) {
    const { label, name, onChange, onClick, classname, onKeyPress, tabIndex, onFocus } = props;
    const inputClass = classNames(style.input, classname);

    return (
      <div className={style.component}>
        {label && (
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          className={inputClass}
          onChange={onChange}
          onClick={onClick}
          type={'number'}
          ref={ref}
          onKeyDown={
            onKeyPress &&
            ((e) => {
              onKeyPress(e, name);
            })
          }
          tabIndex={tabIndex}
          onFocus={onFocus}
        />
      </div>
    );
  }),
);
