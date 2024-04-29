import { PopupWithFocusTrap } from '@shared/ui/popup';
import { EditProductForm, type EditProductFormProps } from '../editProductForm/editProductForm';
import { type IFormProps } from '../../lib/hooks/useEditProductForm/useEditProductForm';

interface PopupEditProductFormProps
  extends Pick<EditProductFormProps, 'buttonClick' | 'error' | 'isActive'> {
  classname?: string;
  formProps?: IFormProps;
  activePopup?: boolean;
  setActivePopup?: (value: boolean) => void;
}
export const PopupEditProductForm = ({
  activePopup,
  setActivePopup,
  formProps,
  buttonClick,
  error,
  isActive,
}: PopupEditProductFormProps) => {
  return (
    <PopupWithFocusTrap isOpened={activePopup ?? false} onClose={() => setActivePopup?.(false)}>
      {formProps && (
        <EditProductForm
          {...formProps}
          buttonClick={buttonClick}
          error={error}
          isActive={isActive}
        />
      )}
    </PopupWithFocusTrap>
  );
};
