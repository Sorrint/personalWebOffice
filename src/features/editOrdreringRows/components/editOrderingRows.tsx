import { memo, useEffect } from 'react';
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

  const { register, handleSubmit, setValue, watch } = useForm<IOrderingChapter['summary']>({
    defaultValues: {
      rowsCount: chapters?.[chapterKey]?.summary.rowsCount ?? 0,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);

  const editRows = (key: Partial<IOrderingChapter['summary']>, close?: () => void) => {
    dispatch(orderingActions.setChapterSummary({ [chapterKey]: key }));
    close?.();
  };

  const setToStartValue = () => {
    if (chapters?.[chapterKey]?.summary.rowsCount) {
      setValue('rowsCount', chapters?.[chapterKey]?.summary.rowsCount);
    }
  };

  return (
    <HPopover
      button={
        <IconFont iconName={'icon-plus'} classname={classNames(style['edit-rows'], classname)} />
      }
      placementPanel='right'
      offsetY={10}
      renderChildren={({ close }) => (
        <form onSubmit={handleSubmit((data) => editRows(data, close))} className={style.form}>
          <CounterField
            min={0}
            autofocus
            {...register('rowsCount', { valueAsNumber: true })}
            setValue={setValue}
          ></CounterField>
          <div className={style.actions}>
            <IconFont
              iconName={'icon-check'}
              classname={style.check}
              onClick={handleSubmit((data) => editRows(data, close))}
            />
            <IconFont iconName={'icon-close'} classname={style.close} onClick={() => close()} />
            <IconFont iconName={'icon-cached'} classname={style.cached} onClick={setToStartValue} />
          </div>
        </form>
      )}
    />
  );
});
