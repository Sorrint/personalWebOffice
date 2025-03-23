import { PropsWithChildren } from 'react';
import styles from './ChapterSummary.module.scss';

interface ChapterSummaryProps extends PropsWithChildren {}
export const ChapterSummary = ({ children }: ChapterSummaryProps) => {
  return <div className={styles.summary}>{children}</div>;
};
