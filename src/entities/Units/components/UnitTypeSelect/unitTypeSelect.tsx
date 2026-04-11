import { UnitTypes } from '../../model/unitTypes';
import { SelectListBox } from '@shared/ui/SelectListBox';

interface UnitTypeSelectProps {
  className?: string;
  type?: UnitTypes;
  onChange?: (type: UnitTypes) => void;
}
export const UnitTypeSelect = (props: UnitTypeSelectProps) => {
  const { onChange, type } = props;

  const options = [
    { id: '1', content: 'штучный', value: UnitTypes.COUNTABLE },
    { id: '2', content: 'мерный', value: UnitTypes.SCALABLE },
    { id: '3', content: 'весовой', value: UnitTypes.WEIGHTABLE },
  ];

  const currentType = options.find(option => option.value === type);

  const handleChange = (id: string) => {
    const selected = options.find(option => option.id === id);
    if (selected) {
      onChange?.(selected?.value);
    }
  };

  return (
    <SelectListBox
      options={options}
      value={currentType?.id ?? ''}
      onChange={handleChange}
      defaultValue='Выберите тип товара'
    />
  );
};
