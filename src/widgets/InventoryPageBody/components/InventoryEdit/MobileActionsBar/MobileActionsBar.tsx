import { ScanBarcodeButton } from '@features/ScanBarcodeButton';
import { memo } from 'react';
import s from './MobileActionsBar.module.scss';

export const MobileActionsBar = memo(() => {
  console.log('scan');

  return (
    <div className={s.scanBtn}>
      {/* <Button onClick={createNewProduct}>Добавить товар</Button> */}
      <ScanBarcodeButton />
    </div>
  );
});
