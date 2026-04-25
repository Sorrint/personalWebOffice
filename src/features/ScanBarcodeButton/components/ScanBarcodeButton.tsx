import { memo } from 'react';
import { Button } from '@shared/ui/Button';
import { IconFont } from '@shared/ui/IconFont';

export const ScanBarcodeButton = memo(() => {
  console.log('scan');

  return (
    <Button>
      <IconFont iconName='icon-barcode' />
    </Button>
  );
});
