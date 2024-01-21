import { memo } from 'react';
import style from './editOrderingRows.module.scss';
import { HPopover } from '@shared/ui/popover';
import { IconFont } from '@shared/ui/iconFont';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import {
  type IOrderingChapter,
  getOrderingChaptersData,
  orderingActions,
} from '@entities/orderings';
import classNames from 'classnames';
import { CounterField } from '@shared/ui/counterField';
import { useForm } from 'react-hook-form';

interface EditOrderingRowsProps {
  classname?: string;
  chapterKey: string;
}

export const EditOrderingRows = memo(({ chapterKey, classname }: EditOrderingRowsProps) => {
  const dispatch = useAppDispatch();
  const chapters = useAppSelector(getOrderingChaptersData);

  const { register, handleSubmit } = useForm<IOrderingChapter['summary']>({
    defaultValues: {
      rowsCount: chapters?.[chapterKey]?.summary.rowsCount ?? 0,
    },
    mode: 'onChange',
  });

  const editRows = (key: Partial<IOrderingChapter['summary']>) => {
    dispatch(orderingActions.setChapterSummary({ [chapterKey]: key }));
  };

  return (
    <HPopover
      button={
        <IconFont iconName={'icon-plus'} classname={classNames(style['edit-rows'], classname)} />
      }
      placementPanel='right'
      offsetY={10}
    >
      <form onSubmit={handleSubmit(editRows)} className={style.form}>
        <CounterField
          min={0}
          autofocus
          {...register('rowsCount', { valueAsNumber: true })}
        ></CounterField>
        <div className={style.actions}>
          <IconFont iconName={'icon-check'} classname={style.check} />
          <IconFont iconName={'icon-close'} classname={style.close} />
          <IconFont iconName={'icon-cached'} classname={style.cached} />
        </div>
      </form>
    </HPopover>
  );
});
