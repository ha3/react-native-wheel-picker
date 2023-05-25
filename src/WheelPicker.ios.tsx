import * as React from 'react';
import { View } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

import { WheelPickerProps } from './types';

const WheelPicker: React.FC<WheelPickerProps> = ({ items, ...props }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Picker {...props}>
      {items.map((item, index) => (
        <Picker.Item key={item.key || index} {...item} />
      ))}
    </Picker>
  );
};

export default WheelPicker;
