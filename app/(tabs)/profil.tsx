import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, useWindowDimensions } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import ListAccordion from '@/components/ListAccordion';
import { Chip, Divider, IconButton, List, Text } from 'react-native-paper';
import React from 'react';

export default function Profile() {

  const { width } = useWindowDimensions();

  const [contacts, setContacts] = React.useState([]);
  const [allergies, setAllergies] = React.useState([]);
  const [isAllergyModified, setIsAllergyModified] = React.useState(false);
  const [isContactsModified, setIsContactsModified] = React.useState(false);
  const [newAllergy, setNewAllergy] = React.useState('');
  const [newContact, setNewContact] = React.useState({ name: '', firstName: '', phoneNumber: '' });
  const styles = createStyles(width);

  const addAllergy = () => {
    setAllergies(prevAllergies => [...prevAllergies, newAllergy]);
    setNewAllergy('');
  };

  const addContact = () => {
    setContacts(prevContacts => [...prevContacts, newContact]);
    setNewContact({ name: '', firstName: '', phoneNumber: '' });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>

      <Input label="Nom" />
      <Input label="Prenom" />
      <Input label="Email" />
      <Input label="Matricule Sécurité social" />
      <Input label="Medecin" />

      <Divider />
      <View style={styles.row}>
        <Text>Allergies</Text>
        <IconButton icon="plus" onPress={() => setIsAllergyModified(true)} />
      </View>
      <View style={styles.rowAdaptive}>
        {isAllergyModified && (
          <>
            <Input
              label="Nouvelle allergie"
              value={newAllergy}
              onChangeText={text => setNewAllergy(text)}
            />
          </>
        )}
      </View>

      {isAllergyModified && (<>
        <View style={[styles.rowCentered]} >
          <IconButton icon="cancel" onPress={() => setIsAllergyModified(false)} iconColor='red' />
          <IconButton icon="check" onPress={addAllergy} iconColor='green' />
        </View>
      </>)}

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {allergies.map((allergy, index) => (
          <Chip key={index} icon="information" onPress={() => console.log('Pressed')} style={{ marginRight: 10, marginBottom: 10 }}>
            {allergy}
          </Chip>
        ))}
      </View>

      <Divider />
      <View style={styles.row}>
        <Text>Contacts</Text>
        <IconButton icon="plus" onPress={() => setIsContactsModified(true)} />
      </View>
      <View style={styles.rowAdaptive}>

        {isContactsModified && (
          <>
            <View style={styles.rowAdaptive}>
              <Input
                label="Nom"
                value={newContact.name}
                onChangeText={text => setNewContact({ ...newContact, name: text })}
                style={styles.mobileInput}
              />
              <Input
                label="Prénom"
                value={newContact.firstName}
                onChangeText={text => setNewContact({ ...newContact, firstName: text })}
                style={styles.mobileInput}
              />
              <Input
                label="Numéro de téléphone"
                value={newContact.phoneNumber}
                onChangeText={text => setNewContact({ ...newContact, phoneNumber: text })}
                style={styles.mobileInput}
              />

            </View>
          </>
        )}
      </View>

      {isContactsModified && (<>
        <View style={[styles.rowCentered]} >
          <IconButton icon="cancel" onPress={() => setIsContactsModified(false)} iconColor='red' />
          <IconButton icon="check" onPress={addContact} iconColor='green' />
        </View>
      </>)}

      <View style={styles.row}>
        {contacts.map((contact, index) => (
          <Chip key={index} icon="phone" onPress={() => console.log('Pressed')} style={{ marginRight: 10, marginBottom: 10 }}>
            {contact.name}, {contact.firstName}, {contact.phoneNumber}
          </Chip>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

export const createStyles = (width)  => StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: 8,
    ...Platform.select({
      ios: {
        flexDirection: 'column',
      },
      android: {

        flexDirection: 'column',
      },
      default: {
        // other platforms, web for example
      },
    }),

  },
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
    flexDirection: width < 768 ? 'column' : 'row',
    alignItems: 'center'
  },

  mobileInput: {
    marginRight: width > 768 ? 10 : 0,
    width: width > 768 ? 200 : '100%'
  }
});

