import { memo } from 'react';
import style from './editOrderingRows.module.scss';
import { HPopover } from '@shared/ui/popover';
import { IconFont } from '@shared/ui/iconFont';
import { useAppDispatch } from '@shared/lib/hooks';
import { orderingActions } from '@entities/orderings';
import classNames from 'classnames';
import { CounterField } from '@shared/ui/counterField';

interface EditOrderingRowsProps {
  classname?: string;
  chapterKey: string;
}

export const EditOrderingRows = memo(({ chapterKey, classname }: EditOrderingRowsProps) => {
  const dispatch = useAppDispatch();
  const editRows = (key: string) => {
    dispatch(
      orderingActions.setChapterSummary({
        [key]: { rowsCount: 2 },
      }),
    );
  };

  return (
    <HPopover
      button={
        <IconFont iconName={'icon-plus'} classname={classNames(style['edit-rows'], classname)} />
      }
      placementPanel='right'
      offsetY={10}
    >
      <CounterField name='rows' min={0}></CounterField>
    </HPopover>
  );
});
