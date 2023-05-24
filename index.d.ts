import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PickerItemProps } from '@react-native-picker/picker';

interface IStyle {
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  selectedItemTextFontFamily: string;
  itemTextColor?: string;
  itemTextSize?: number;
  itemTextFontFamily: string;
  indicatorColor?: string;
  hideIndicator?: boolean;
  indicatorWidth?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

export interface IPropsWheelPicker extends IStyle {
  data: WheelPickerItem[];
  isCyclic?: boolean;
  initPosition?: number;
  selectedItem?: number;
  onItemSelected?: (res: number) => void;
}

export class WheelPicker extends React.Component<IPropsWheelPicker> {}
