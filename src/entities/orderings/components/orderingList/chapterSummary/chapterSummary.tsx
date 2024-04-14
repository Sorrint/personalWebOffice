import { type ReactNode } from 'react';
import styles from './chapterSummary.module.scss';
import classNames from 'classnames';

interface ChapterSummaryProps {
  value?: string | number;
  editRows?: () => ReactNode;
  variant?: 'default' | 'edit-rows';
}
export const ChapterSummary = ({ value, editRows, variant }: ChapterSummaryProps) => {
  const currentVariant = variant ?? 'default';
  return (
    <div className={classNames(styles.summary, { [styles[currentVariant]]: currentVariant })}>
      {value}
      {editRows?.()}
    </div>
  );
};
