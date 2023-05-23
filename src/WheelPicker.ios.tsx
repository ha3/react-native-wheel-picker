import * as React from 'react';
import { View } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

interface Props {
  data: Array<string>;
  selectedItem?: number;
  onItemSelected?: Function;
  disabled?: boolean;
}

const WheelPicker: React.FC<Props> = props => {
  const [selectedItem, setSelectedItem] = React.useState(props.selectedItem || 0);
  const { data, onItemSelected, disabled } = props;

  const onValueChange = React.useCallback<NonNullable<PickerProps['onValueChange']>>(
    (_, index) => {
      onItemSelected && onItemSelected(index);
      setSelectedItem(index);
    },
    []
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Picker
        {...props}
        selectedValue={data[selectedItem]}
        onValueChange={onValueChange}
      >
        {data.map((i, index) => (
          <Picker.Item key={index} label={i} value={i} />
        ))}
      </Picker>
    </View>
  );
};

export default WheelPicker;
