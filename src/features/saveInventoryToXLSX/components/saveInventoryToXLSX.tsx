import { type IInventoryDocs } from '@entities/inventoryDocs';
import { Button } from '@shared/ui/button';
import { saveInventoryToExcel } from '../lib/helpers/saveInventoryToExcel';

interface SaveInventoryToXLSXProps {
  inventoryList?: IInventoryDocs;
  classname?: string;
}
export const SaveInventoryToXLSX = ({ classname, inventoryList }: SaveInventoryToXLSXProps) => {
  const handleClick = () => {
    inventoryList && saveInventoryToExcel(inventoryList);
  };

  return (
    <Button buttonType='submit' classname={classname} onClick={handleClick} outline>
      Скачать в XLSX
    </Button>
  );
};
