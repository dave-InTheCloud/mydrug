import { DrugPlan } from '@/app/model/DrugPlan';
import { Medication } from '@/app/model/Medication';
import { drugPlanReducer } from '@/app/services/drugPlan/DrugPlanReducer';
import { DrugPlanService } from '@/app/services/drugPlan/DrugPlanService';
import * as React from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Button, IconButton, List, SegmentedButtons, Text } from 'react-native-paper';
import Input from '@/components/Input';

interface DailyTabProps {
    style?: object;
}

const DailyTab: React.FC<DailyTabProps> = ({ style }) => {

    const { width } = useWindowDimensions();
    const styles = createStyles(width);

    const [buttonsState, setButtonsState] = React.useState<{ [key: string]: boolean }>({});
    const drugPlanService = new DrugPlanService();
    const [drugPlan, dispatch] = React.useReducer(drugPlanReducer, new DrugPlan() as DrugPlan);
    const [isPlanModified, setIsPlanModified] = React.useState(false);
    const [newMedication, setnewMedication] = React.useState(new Medication('', '', ''));
    const [selectedTimeOfDay, setSelectedTimeOfDay] = React.useState('');

    const buttons = [
        { value: 'morning', label: 'Matin', icon: 'weather-sunset-up' },
        { value: 'afternoon', label: 'Midi', icon: 'weather-sunny' },
        { value: 'evening', label: 'Après-midi', icon: 'coffee' },
        { value: 'night', label: 'Soir', icon: 'weather-sunset-down' },
        { value: 'bedtime', label: 'Coucher', icon: 'bed' },
    ];

    React.useEffect(() => {
        drugPlanService.getDrugPlan().then(drugplan => {
            if (drugplan) {
                Object.keys(drugplan).forEach(key => {
                    dispatch({ type: 'updateProperty', payload: { property: key, value: drugplan[key] } });
                });
            }
        });
    }, []);

    const toggleButton = async (value: string) => {
        /**
         * multiple selection 
         * setButtonsState((prevState) => {
             return { ...prevState, [value]: !prevState[value] };
         });
          */
        setButtonsState((prevState) => ({ ...{}, [value]: !prevState[value] }));
        setIsPlanModified(false);
        setSelectedTimeOfDay(value);
        setnewMedication(new Medication('', '', ''));
    };

    const addContact = async () => {
        if (newMedication.name && newMedication.dose && newMedication.remark) {
            drugPlan[selectedTimeOfDay].push(newMedication);
            await drugPlanService.addMedication(selectedTimeOfDay, newMedication);
            setnewMedication(new Medication('', '', ''));
        }
    };


    return (
        <>
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
            {buttonsState && Object.keys(buttonsState).length > 0 && <View style={styles.row}>
                <Text>Medicaments</Text>
                <IconButton icon="plus" onPress={() => setIsPlanModified(true)} />
            </View>
            }

            {isPlanModified && (
                <View style={styles.rowAdaptive}>
                    <View style={[styles.rowAdaptive, /** width: width > 700 ? 'auto' : '100%', */ { gap: 16 }]}>
                        <Input
                            label="Nom"
                            value={newMedication.name}
                            onChangeText={text => setnewMedication({ ...newMedication, name: text })}
                            style={styles.mobileInput}
                        />
                        <Input
                            label="Dose"
                            value={newMedication.dose}
                            onChangeText={text => setnewMedication({ ...newMedication, dose: text })}
                            style={styles.mobileInput}
                        />
                        <Input
                            label="Remarque"
                            value={newMedication.remark}
                            onChangeText={text => setnewMedication({ ...newMedication, remark: text })}
                            style={styles.mobileInput}
                        />

                    </View>

                    <View style={[styles.rowCentered]} >
                        <IconButton icon="cancel" onPress={() => setIsPlanModified(false)} iconColor='red' />
                        <IconButton icon="check" onPress={addContact} iconColor='green' />
                    </View>
                </View>
            )}

            <SafeAreaView>
                <List.AccordionGroup>
                    {drugPlan && Object.keys(drugPlan).map((timeOfDay) => (
                        <React.Fragment key={timeOfDay}>
                            {buttonsState[timeOfDay] && drugPlan[timeOfDay] && drugPlan[timeOfDay].map((medication) => (
                                <List.Accordion id={medication.name} title={`${medication.name} - ${medication.dose}`} key={medication.name}>
                                    <List.Item title={medication.remark} />
                                </List.Accordion>
                            ))}
                        </React.Fragment>
                    ))}
                </List.AccordionGroup>

            </SafeAreaView>
        </>
    );
};

export const createStyles = (width) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    rowCentered: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    rowAdaptive: {
        flexDirection: width < 800 ? 'column' : 'row',
        alignItems: 'center'
    },

    mobileInput: {
        width: width > 800 ? 'auto' : '100%',
    },
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