import { PickerItemProps } from '@react-native-picker/picker';

export interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

export interface WheelPickerProps {
  items: WheelPickerItem[];
  selectedIndex?: number;
  onItemSelected?: Function;
  disabled?: boolean;
}
