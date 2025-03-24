import { type InventoryDocs } from '@entities/Inventories';
import { Button } from '@shared/ui/Button';
import { saveInventoryToExcel } from '../lib/helpers/saveInventoryToExcel';

interface SaveInventoryToXLSXProps {
  inventoryList?: InventoryDocs;
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
