import { IOrderFillingErrors } from '@entities/orders/model/types/IOrder';
import { getDeclensions } from '@shared/lib/helpers';
import { memo } from 'react';

interface OrderFillingErrorsProps {
  fillingErrors?: IOrderFillingErrors;
}

export const OrderFillingErrors = memo(({ fillingErrors }: OrderFillingErrorsProps) => {
  const notFoundProductsText = fillingErrors?.productsNotFound.join(', ');

  const numberDuplicatesText = fillingErrors?.numberDuplicates
    .map(
      ({ count, number }) =>
        `№${number} (${count} ${getDeclensions(count, ['раз', 'раза', 'раз'])})`,
    )
    .join(', ');

  const productsDuplicatesText = fillingErrors?.productsDuplicates
    .map(({ numbers, productName }) => `${productName} - позиции ${numbers.join(', ')}`)
    .join('\n');

  if (!numberDuplicatesText && !productsDuplicatesText && !notFoundProductsText) {
    return null;
  }
  return (
    <div>
      {!!notFoundProductsText && (
        <div>Нет товаров в базе данных: позиции {notFoundProductsText}</div>
      )}
      {(!!numberDuplicatesText || !!productsDuplicatesText) && `Обнаружены дубликаты в записях:`}
      {!!numberDuplicatesText && (
        <div>
          {'- по номеру: '}
          {numberDuplicatesText}
        </div>
      )}
      {!!productsDuplicatesText && (
        <div>
          - по наименованию:
          {productsDuplicatesText}
        </div>
      )}
    </div>
  );
});
