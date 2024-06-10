import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface TopBarProps {
leftBtn?: boolean;
rightBtn?: boolean;
title?: string;
onLeftBtnPress?: () => void;
onRightBtnPress?: () => void;
}

type TopBarStyles = React.ComponentProps<typeof Appbar.Header>['style'];
type TopBarPropsWithStyles = TopBarProps & { styles?: TopBarStyles };
type TopBarPropsWithGeneric = TopBarProps & { [key: string]: any };


const TopBar = ({ leftBtn, rightBtn, title, onLeftBtnPress, onRightBtnPress, styles, ...rest }: TopBarPropsWithStyles | TopBarPropsWithGeneric) => (
  <Appbar.Header mode='center-aligned' style={styles} {...rest} accessibilityRole='header' >
    {leftBtn && <Appbar.Action icon="pencil" onPress={() => onLeftBtnPress} aria-label='Edit'/>}
    <Appbar.Content title={title} />
    {rightBtn && <Appbar.Action icon="flag" onPress={() => onRightBtnPress} />}
  </Appbar.Header>
);

export default TopBar;