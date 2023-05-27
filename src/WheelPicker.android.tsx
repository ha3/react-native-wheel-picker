import React, { isValidElement, useCallback, useMemo, Children } from 'react';
import {
  processColor,
  ProcessedColorValue,
  requireNativeComponent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View
} from 'react-native';

import type { PickerComponent } from './types';
import { notEmpty, removeKeys } from './utils';

type NativeComponentProps = {
  data: string[];
  isCyclic?: boolean;
  indicatorWidth?: number;
  hideIndicator?: boolean;
  selectedItemTextSize?: number;
  selectedItemTextColor?: ProcessedColorValue | null;
  indicatorColor?: ProcessedColorValue | null;
  backgroundColor?: ProcessedColorValue | null;
  itemTextColor?: ProcessedColorValue | null;
  itemTextSize?: number;
  selectedItem: number;
  onChange?: (event: any) => void;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const WheelPickerView = requireNativeComponent<NativeComponentProps>('WheelPicker');

const WheelPicker: PickerComponent = props => {
  const {
    children,
    enabled = true,
    selectionColor,
    selectedValue,
    onValueChange
  } = props;
  const itemStyle = StyleSheet.flatten(props.itemStyle) || {};
  const style = StyleSheet.flatten(props.style) || {};
  const selectedItemStyle = StyleSheet.flatten(props.selectedItemStyle) || {};

  const [items, selected] = useMemo(() => {
    let selected = 0;

    const _items = Children.toArray(props.children)
      .map((child, index) => {
        if (!isValidElement(child)) {
          return;
        }

        if (child.props.value === selectedValue) {
          selected = index;
        }

        const { label } = child.props;

        if (typeof label !== 'string') {
          return;
        }

        return label;
      })
      .filter(notEmpty);

    return [_items, selected];
  }, [children, selectedValue]);

  const onSelect = useCallback(
    ({ nativeEvent }) => {
      const { position }: { position: number } = nativeEvent;

      if (onValueChange !== undefined) {
        if (position >= 0) {
          const child = Children.toArray(children).filter(item => item != null)[
            position
          ];

          if (!isValidElement(child)) {
            // @ts-expect-error
            onValueChange(null, position);
          } else {
            const value = child.props.value;

            if (props.selectedValue !== value) {
              onValueChange(value, position);
            }
          }
        } else {
          // @ts-expect-error
          onValueChange(null, position);
        }
      }
    },
    [children, onValueChange, selectedValue, selected]
  );

  return (
    <View
      pointerEvents={enabled ? 'auto' : 'none'}
      style={removeKeys(style, ['backgroundColor', 'color'])}
    >
      <WheelPickerView
        style={removeKeys(style, ['backgroundColor', 'color'])}
        selectedItem={selected}
        disabled={!enabled}
        data={items}
        isCyclic={items.length > 2}
        onChange={onSelect}
        itemTextColor={processColor(itemStyle.color || style.color)}
        itemTextSize={itemStyle.fontSize}
        selectedItemTextColor={processColor(
          selectedItemStyle.color || itemStyle.color || style.color
        )}
        selectedItemTextSize={
          selectedItemStyle.fontSize || itemStyle.fontSize || style.fontSize
        }
        backgroundColor={processColor(style.backgroundColor)}
        indicatorColor={processColor(selectionColor)}
      />
    </View>
  );
};

WheelPicker.Item = () => null;

export default WheelPicker;
