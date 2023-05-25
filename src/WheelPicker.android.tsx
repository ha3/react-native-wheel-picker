import React from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';

import type { WheelPickerItem, WheelPickerProps } from './types';

type NativeComponentProps = {
  data: WheelPickerItem[];
  isCyclic?: boolean;
  selectedItemTextColor?: string;
  selectedItemTextSize?: number;
  indicatorWidth?: number;
  hideIndicator?: boolean;
  indicatorColor?: string;
  itemTextColor?: string;
  itemTextSize?: number;
  backgroundColor?: string;
  selectedValue?: number | string;
  onChange?: (event: any) => void;
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
    if (this.props.onValueChange) {
      this.props.onValueChange(event.nativeEvent.value, event.nativeEvent.position);
    }
  };

  render() {
    const { items, enabled = true, itemStyle, selectedValue, ...props } = this.props;

    const _itemStyle = StyleSheet.flatten(itemStyle);

    return (
      <View pointerEvents={enabled ? 'auto' : 'none'} style={this.props.style}>
        <WheelPickerView
          {...props}
          disabled={!enabled}
          data={items}
          isCyclic={items.length > 2}
          onChange={this.onItemSelected}
          itemTextColor={_itemStyle.color?.toString()}
          itemTextSize={_itemStyle.fontSize}
        />
      </View>
    );
  }
}
