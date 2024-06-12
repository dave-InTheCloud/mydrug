import React from 'react';
import { TextInput } from 'react-native-paper';

type InputProps = {
  label: string;
  value: string;
  id: string;
  handleChangeText: (id: string, text: string) => void;
};

const Input: React.FC<InputProps & Omit<TextInputProps, 'onChangeText'>> = ({
  label,
  value,
  id,
  handleChangeText,
  ...otherProps
}) => {
  const handleChange = (text: string) => {
    handleChangeText(id, text);
  };

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleChange}
      {...otherProps}
    />
  );
};

export default Input;
