import { PopupWithFocusTrap } from '@shared/ui/popup';
import { EditProductForm, type EditProductFormProps } from '../editProductForm/editProductForm';

interface PopupEditProductFormProps extends EditProductFormProps {
  className?: string;
  activePopup?: boolean;
  setActivePopup?: (value: boolean) => void;
}
export const PopupEditProductForm = ({
  activePopup,
  setActivePopup,
  ...formProps
}: PopupEditProductFormProps) => {
  return (
    <PopupWithFocusTrap isOpened={activePopup ?? false} onClose={() => setActivePopup?.(false)}>
      <EditProductForm {...formProps} />
    </PopupWithFocusTrap>
  );
};
