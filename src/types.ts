import type { PickerProps, PickerItemProps } from '@react-native-picker/picker';

export interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

export interface WheelPickerProps extends PickerProps {
  items: WheelPickerItem[];
}
