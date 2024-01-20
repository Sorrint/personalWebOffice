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
}

export const CounterField = memo(
  forwardRef(function CounterField<T extends FieldValues>(
    props: ICounterFieldsProps<T>,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) {
    const { label, name, onChange, onClick, classname, onKeyPress, tabIndex, onFocus, min, max } =
      props;
    const inputClass = classNames(style.component, classname);

    return (
      <div className={inputClass}>
        {label && (
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={style.counter}>
          <IconFont iconName='icon-minus' classname={style.icon} />
          <input
            id={name}
            name={name}
            min={min}
            max={max}
            className={style.input}
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
          <IconFont iconName='icon-plus' classname={style.icon} />
        </div>
      </div>
    );
  }),
);
