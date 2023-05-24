import React from 'react';
import { requireNativeComponent, View } from 'react-native';

import type { WheelPickerItem, WheelPickerProps } from './types';

type NativeComponentProps = {
  data: string[];
  isCyclic?: boolean;
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  indicatorWidth?: number;
  hideIndicator?: boolean;
  indicatorColor?: string;
  itemTextColor?: string;
  itemTextSize?: number;
  selectedItem?: number;
  backgroundColor?: string;
  onChange?: (arg: number) => void;
  disabled?: boolean;
};

const WheelPickerView = requireNativeComponent<NativeComponentProps>('WheelPicker');

export default class WheelPicker extends React.Component<WheelPickerProps> {
  static defaultProps = {
    style: {
      width: 'auto',
      height: 150
    }
  };

  onItemSelected = (event: any) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(event.nativeEvent.position);
    }
  };

  render() {
    const { items } = this.props;
    const data = items.map(i => i.value?.toString()).filter(Boolean) as string[];

    return (
      <View pointerEvents={this.props.disabled ? 'none' : 'auto'}>
        <WheelPickerView
          {...this.props}
          data={data}
          isCyclic={data.length > 2}
          onChange={this.onItemSelected}
        />
      </View>
    );
  }
}
