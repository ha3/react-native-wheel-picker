import type { PickerProps, PickerItemProps } from '@react-native-picker/picker';

export interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

export interface WheelPickerProps {
  items: WheelPickerItem[];
  selectedIndex?: number;
  enabled?: boolean;
  onValueChange?: PickerProps['onValueChange'];
  style?: PickerProps['style'];
}
