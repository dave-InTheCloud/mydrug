import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider, IconButton } from 'react-native-paper';

type DropDownProps = {
  colors: {
    topBarDividerColor: string;
  };
};

const DropDown = ({ colors }: DropDownProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="flag" onPress={openMenu} iconColor={colors.topBarDividerColor} />}>
      <Menu.Item onPress={() => { }} title="LU" />
      <Divider />
      <Menu.Item onPress={() => { }} title="FR" />
      <Divider />
      <Menu.Item onPress={() => { }} title="EN" />
    </Menu>
  );
};

export default DropDown;