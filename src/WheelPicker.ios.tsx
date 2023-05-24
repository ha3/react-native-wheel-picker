import * as React from 'react';
import { View } from 'react-native';
import { Picker, PickerProps, PickerItemProps } from '@react-native-picker/picker';

interface WheelPickerItem extends PickerItemProps {
  key?: string;
}

interface Props {
  items: WheelPickerItem[];
  selectedIndex?: number;
  onItemSelected?: Function;
  disabled?: boolean;
}

const WheelPicker: React.FC<Props> = props => {
  const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex || 0);
  const { items, onItemSelected, disabled } = props;

  const onValueChange = React.useCallback<NonNullable<PickerProps['onValueChange']>>(
    (_, index) => {
      onItemSelected && onItemSelected(index);
      setSelectedIndex(index);
    },
    []
  );

  if (!items || items.length === 0) {
    return null;
  }

  console.log('Picker', Picker);

  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Picker
        {...props}
        selectedValue={items[selectedIndex].value}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={item.key || index} {...item} />
        ))}
      </Picker>
    </View>
  );
};

export default WheelPicker;
