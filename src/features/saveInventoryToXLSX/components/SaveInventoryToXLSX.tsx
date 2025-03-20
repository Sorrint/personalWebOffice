import { type IInventoryDocs } from '@entities/inventories';
import { Button } from '@shared/ui/button';
import { saveInventoryToExcel } from '../lib/helpers/saveInventoryToExcel';

interface SaveInventoryToXLSXProps {
  inventoryList?: IInventoryDocs;
  className?: string;
}
export const SaveInventoryToXLSX = ({ className, inventoryList }: SaveInventoryToXLSXProps) => {
  const handleClick = () => {
    inventoryList && saveInventoryToExcel(inventoryList);
  };

  return (
    <Button buttonType='submit' className={className} onClick={handleClick} outline>
      Скачать в XLSX
    </Button>
  );
};
