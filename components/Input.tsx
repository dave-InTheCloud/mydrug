import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

type InputProps = {
  label: string;
  value: string;
  id: string;
  type: string;
  required?: boolean;
  handleChangeText: (id: string, text: string) => void;
};

const Input: React.FC<InputProps & Omit<TextInputProps, 'onChangeText'>> = ({
  label,
  value,
  id,
  type,
  required = false,
  handleChangeText,
  ...otherProps
}) => {
  const { width } = useWindowDimensions();
  const styles = createStyles(width);

  const handleChange = (text: string) => {
    handleChangeText(id, text);
  };

  const hasErrors = () => {
    if (type === 'email' && value && value.length > 0) {
      return !value.includes('@');
    }
  }

  const isRequired = () => {
      return !value || value.length === 0 ||  value === '';
  }

  return (
    <View style={styles.mobileInput}>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleChange}
        {...otherProps}
      />

      {type && hasErrors() && <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
      }
   {/*    {required && isRequired() && <HelperText type="error" visible={isRequired()}>
        This input is required!
      </HelperText>
      } */}
    </View>

  );
};

const createStyles = (width) => StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mobileInput: {
    width: width > 800 ? 'auto' : '90%',
  }
});

export default Input;
