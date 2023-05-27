import type { FC, ComponentType } from 'react';
import type { PickerProps, PickerItemProps } from '@react-native-picker/picker';

export interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

export interface WheelPickerProps extends PickerProps {
  selectedItemStyle?: PickerProps['itemStyle'];
  indicatorWidth?: number;
  hideIndicator?: boolean;
}

export interface PickerComponent extends FC<WheelPickerProps> {
  Item: ComponentType<PickerItemProps>;
}
