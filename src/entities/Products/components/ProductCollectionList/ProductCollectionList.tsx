import { ListBoxItem, SelectListBox } from '@shared/ui/SelectListBox';

interface ProductCollectionListProps {
  onChange?: (e: ListBoxItem) => void;
  selected?: ListBoxItem;
}

export const ProductCollectionList = ({ onChange, selected }: ProductCollectionListProps) => {
  const collections = [
    { id: '1', content: '1, 1,5 кг' },
    { id: '2', content: '2,5 3 кг низ' },
    { id: '3', content: '3, 5 кг выс' },
    { id: '4', content: '4,5 кг кан' },
  ];
  const defaultValue = selected ?? collections[0];
  const handleChange = (value: string) => {
    const selectedCollection = collections.find(collection => collection.id === value);
    selectedCollection && onChange?.(selectedCollection);
  };

  return (
    <SelectListBox options={collections} onChange={handleChange} defaultValue={defaultValue.id} />
  );
};
