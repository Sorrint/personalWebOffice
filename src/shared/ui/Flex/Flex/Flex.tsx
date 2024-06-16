import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import styles from './Flex.module.scss';
import classNames from 'classnames';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

const justifyClasses: Record<FlexJustify, string> = {
  start: styles['justify-start'],
  center: styles['justify-center'],
  end: styles['justify-end'],
  between: styles['justify-between'],
};

const alignClasses: Record<FlexAlign, string> = {
  start: styles['align-start'],
  center: styles['align-center'],
  end: styles['align-end'],
};

const directionClasses: Record<FlexDirection, string> = {
  row: styles['direction-row'],
  column: styles['direction-column'],
};

const gapClasses: Record<FlexGap, string> = {
  4: styles.gap4,
  8: styles.gap8,
  16: styles.gap16,
  24: styles.gap24,
  32: styles.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    styles[wrap],
    gap && gapClasses[gap],
  ];

  const mods = {
    [styles.max]: max,
  };

  return (
    <div className={classNames(styles.flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
