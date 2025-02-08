import { memo } from 'react';

import { useGetPackages } from '../../api/packagesApi';
interface PackageSelectProps {
  classname?: string;
  id?: string;
  onChange?: (id: string) => void;
  content?: 'category' | 'name';
}

export const PackageSelect = memo((props: PackageSelectProps) => {
  useGetPackages();

  // const { id, onChange, content = 'name' } = props;

  // const packages = useSelector(selectAllPackages);

  // const options = useMemo(
  //   () => packages?.map(pack => ({ ...pack, content: pack[content] })),
  //   [content, packages],
  // );

  // const onChangeHandler = useCallback(
  //   (id: string) => {
  //     onChange?.(id);
  //   },
  //   [onChange],
  // );

  return null;
  // return (
  //   <>
  //     {packages && (
  //       <SelectListBox
  //         value={id ?? ''}
  //         options={options}
  //         defaultValue='Выберите упаковку'
  //         onChange={onChangeHandler}
  //       />
  //     )}
  //   </>
  // );
});

PackageSelect.displayName = 'PackageSelect';
