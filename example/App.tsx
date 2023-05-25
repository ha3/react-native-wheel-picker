import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';

import { Picker, PickerProps } from '@hakanozdemir/react-native-picker';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white'
  };

  const [value, setValue] = React.useState(1);

  const onValueChange: PickerProps['onValueChange'] = (_value, index) => {
    console.log(_value, index);
    setValue(_value);
  };

  const renderPicker = () => {
    const items = [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 },
      { label: 'D', value: 4 },
      { label: 'E', value: 5 },
      { label: 'F', value: 6 },
      { label: 'G', value: 7 },
      { label: 'H', value: 8 },
      { label: 'I', value: 9 }
    ].map((item, idx) => ({
      ...item,
      key: item.value + idx.toString()
    }));

    return (
      <Picker
        items={items}
        onValueChange={onValueChange}
        selectedValue={value}
        style={styles.picker}
        itemStyle={{ color: "#CCC" }}
      />
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        {renderPicker()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  picker: {
    flex: 1,
    height: 400
  }
});

export default App;
