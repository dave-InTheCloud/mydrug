import * as React from 'react';
import { TextInput } from 'react-native-paper';

type InputProps = {
  label: string;
};

const Input = ({ label, mode = 'outlined', style, ...otherProps }: InputProps ) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label={label}
      mode={mode}
      style={style}
      value={text}
      onChangeText={text => setText(text)}
      {...otherProps}
    />
  );
};

export default Input;