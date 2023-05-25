import * as React from 'react';
import { View } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

import { WheelPickerProps } from './types';

const WheelPicker: React.FC<WheelPickerProps> = props => {
  const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex || 0);
  const { items, onValueChange } = props;

  const _onValueChange = React.useCallback<NonNullable<PickerProps['onValueChange']>>(
    (value, index) => {
      onValueChange && onValueChange(value, index);
      setSelectedIndex(index);
    },
    []
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Picker
      {...props}
      selectedValue={items[selectedIndex].value}
      onValueChange={_onValueChange}
    >
      {items.map((item, index) => (
        <Picker.Item key={item.key || index} {...item} />
      ))}
    </Picker>
  );
};

export default WheelPicker;
