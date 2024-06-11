import * as React from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';

interface DailyTabProps {
    style?: object;
}

const DailyTab: React.FC<DailyTabProps> = ({ style }) => {
    const [buttonsState, setButtonsState] = React.useState<{ [key: string]: boolean }>({});

    const buttons = [
        { value: 'Matin', label: 'Matin', icon: 'weather-sunset-up' },
        { value: 'midi', label: 'midi', icon: 'weather-sunny' },
        { value: 'Après-midi', label: 'Après-midi', icon: 'coffee' },
        { value: 'Soir', label: 'Soir', icon: 'weather-sunset-down' },
        { value: 'Coucher', label: 'Coucher', icon: 'bed' },
    ];

    const toggleButton = (value: string) => {
        setButtonsState((prevState) => {
            return { ...prevState, [value]: !prevState[value] };
        });
    };

    return (
        <SafeAreaView style={[styles.container, style]}>
            {buttons.map((button) => (
                <Button
                    compact={true}
                    style={styles.button}
                    mode={buttonsState[button.value] ? 'contained' : 'outlined'}
                    icon={button.icon}
                    key={button.value} 
                    onPress={() => toggleButton(button.value)}
                >{button.label}</Button>
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        ...Platform.select({
            ios: {
            },
            android: {
            },
            default: {
                // other platforms, web for example
                //width: '100%',
            },
        }),
    },
    button: {
        margin: '1%',
    },
});

export default DailyTab;