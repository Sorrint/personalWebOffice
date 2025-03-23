import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CounterField } from '@shared/ui/CounterField';
import { HPopover } from '@shared/ui/Popover';
import { IconFont } from '@shared/ui/IconFont';
import { useResetOrderingRows, useUpdateOrderingRows } from '../../api/editOrderingRowsApi';
import style from './EditOrderingRows.module.scss';

interface EditOrderingRowsProps {
  className?: string;
  category: string | null;
  rowsCount?: number;
}

export const EditOrderingRows = memo(({ category, rowsCount }: EditOrderingRowsProps) => {
  const { orderNumber } = useParams();

  const [updateOrderingRows] = useUpdateOrderingRows();
  const [ressetOrderingRows] = useResetOrderingRows();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      rowsCount,
    },
    mode: 'onChange',
  });

  const editRows = useCallback(
    async (currentRowsCount?: number, close?: () => void) => {
      if (currentRowsCount && category && orderNumber) {
        await updateOrderingRows({
          category,
          orderNumber: Number(orderNumber),
          rowsCount: currentRowsCount,
        });
      }
      close?.();
    },
    [category, orderNumber],
  );

  const setToStartValue = useCallback(async (close?: () => void) => {
    if (category && orderNumber) {
      await ressetOrderingRows({
        category,
        orderNumber: Number(orderNumber),
      });
    }
    close?.();
  }, []);

  return (
    <HPopover
      as={'div'}
      button={<IconFont iconName={'icon-plus'} />}
      buttonClassName={style['edit-rows']}
      placementPanel='right'
      offsetY={10}
      renderChildren={({ close }) => (
        <form
          onSubmit={handleSubmit(data => editRows(data.rowsCount, close))}
          className={style.form}
        >
          <CounterField
            min={0}
            autofocus
            {...register('rowsCount', { valueAsNumber: true })}
            setValue={setValue}
          ></CounterField>
          <div className={style.actions}>
            <IconFont
              iconName={'icon-check'}
              className={style.check}
              onClick={handleSubmit(data => editRows(data.rowsCount, close))}
            />
            <IconFont iconName={'icon-close'} className={style.close} onClick={() => close()} />
            <IconFont
              iconName={'icon-cached'}
              className={style.cached}
              onClick={() => setToStartValue(close)}
            />
          </div>
        </form>
      )}
    />
  );
});

EditOrderingRows.displayName = 'EditOrderingRows';
