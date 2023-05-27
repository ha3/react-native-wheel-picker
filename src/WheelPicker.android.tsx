import React, { isValidElement, useCallback, useMemo, Children } from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';

console.log("KEReact", React)

import type { PickerComponent } from './types';
import { notEmpty } from './utils';

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
  backgroundColor?: string;
  selectedValue?: number | string;
  onChange?: (event: any) => void;
  disabled?: boolean;
};

const WheelPickerView = requireNativeComponent<NativeComponentProps>('WheelPicker');

const WheelPicker: PickerComponent = props => {
  const {
    children,
    enabled = true,
    itemStyle,
    selectedValue,
    onValueChange,
    style,
    ...rest
  } = props;
  const _itemStyle = StyleSheet.flatten(itemStyle);
  const _style = style || {
    width: 'auto',
    height: 150
  };

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

        return label as string;
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
    <View pointerEvents={enabled ? 'auto' : 'none'} style={style}>
      <WheelPickerView
        {...rest}
        // @ts-expect-error
        style={_style}
        disabled={!enabled}
        data={items}
        isCyclic={items.length > 2}
        onChange={onSelect}
        itemTextColor={_itemStyle.color?.toString()}
        itemTextSize={_itemStyle.fontSize}
      />
    </View>
  );
};

WheelPicker.Item = () => null;

export default WheelPicker;
