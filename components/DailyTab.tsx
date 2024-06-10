import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const DailyTab = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {value: 'Matin', label: 'Matin',icon: 'weather-sunset-up'},
          { value: 'midi', label: 'midi', icon: 'weather-sunny'},
          { value: 'Après-midi', label: 'Après-midi', icon: 'coffee' },
          { value: 'Soir', label: 'Soir', icon : 'weather-sunset-down' },
          { value: 'Coucher', label: 'Coucher', icon:'bed' },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
});

export default DailyTab;