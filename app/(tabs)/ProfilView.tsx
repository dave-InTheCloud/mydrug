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
import React, { useEffect, useReducer, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileService } from '../services/profile/ProfileService';
import { profileReducer, initialState } from '../services/profile/ProfileReducer';

export default function ProfileView() {

  const { width } = useWindowDimensions();
  const styles = createStyles(width);

  const [isAllergyModified, setIsAllergyModified] = React.useState(false);
  const [isContactsModified, setIsContactsModified] = React.useState(false);
  const [newAllergy, setNewAllergy] = React.useState('');
  const [newContact, setNewContact] = React.useState({ name: '', firstName: '', phoneNumber: '' });
  const [newInfo, setInfo] = React.useState({ name: '', firstName: '', phoneNumber: '' });

  const [profile, dispatch] = useReducer(profileReducer, initialState);

  const [text, setText] = React.useState("");

  /*   const [profile, setProfile] = useState({
      name: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      address: '',
      doctor: '',
      allergies: [''],
      contact: [],
    }); */

  const profileService = new ProfileService();

  useEffect(() => {
    profileService.getProfile().then(profile => {
      if (profile) {
        Object.keys(profile).forEach(key => {
          dispatch({ type: 'updateProperty', payload: { property: key, value: profile[key] } });
        });
        dispatch({ type: 'updateProperty', payload: { property: 'allergies', value: profile.allergies } });
        dispatch({ type: 'updateProperty', payload: { property: 'contact', value: profile.contact } });
      }
    });
  }, []);

  const addAllergy = async () => {
    if (newAllergy) {
      profile.allergies.push(newAllergy);
      await profileService.setProfile(profile);
    }
    setNewAllergy('');
  };

  const addContact = async () => {
    if (newContact.name && newContact.firstName && newContact.phoneNumber) {
      profile.contact.push(newContact);
      await profileService.setProfile(profile);
      setNewContact({ name: '', firstName: '', phoneNumber: '' });
    }
  };

  const handleInputChange = async (property: string, value: any) => {
    profile[property] = value;
    await profileService.setProfile(profile);
    dispatch({ type: 'updateProperty', payload: profile });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <Input
        label="Nom"
        value={profile.name}
        id="name"
        handleChangeText={handleInputChange}
      />
      <Input
        label="Prenom"
        value={profile.firstName}
        id="firstName"
        handleChangeText={handleInputChange}
      />
      <Input
        label="Née le"
        value={profile.birthDate}
        id="birthDate"
        handleChangeText={handleInputChange}
      />
      <Input
        label="Matricule Sécurité social"
        value={profile.socialSecurityNumber}
        id='socialSecurityNumber'
        handleChangeText={handleInputChange}
      />
      <Input
        label="Email"
        value={profile.email}
        id='email'
        handleChangeText={handleInputChange}
      />
      <Input
        label="Médecin"
        value={profile.doctor}
        id="doctor"
        handleChangeText={handleInputChange}
      />

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
              onChangeText={setNewAllergy}
              style={styles.mobileInput}
            />
          </>
        )}

        {isAllergyModified && (<>
          <View style={[styles.rowCentered]} >
            <IconButton icon="cancel" onPress={() => setIsAllergyModified(false)} iconColor='red' />
            <IconButton icon="check" onPress={addAllergy} iconColor='green' />
          </View>
        </>)}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {profile.allergies.map((allergy, index) => (
          <Chip
            key={index}
            icon="information"
            onPress={() => console.log('Pressed')}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            {console.log('allergy:', allergy)}
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
            <View style={[styles.rowAdaptive, { width: width > 500 ? 'auto' : '100%' }]}>
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

        {isContactsModified && (<>
          <View style={[styles.rowCentered]} >
            <IconButton icon="cancel" onPress={() => setIsContactsModified(false)} iconColor='red' />
            <IconButton icon="check" onPress={addContact} iconColor='green' />
          </View>
        </>)}
      </View>

      <View style={styles.row}>
        {profile.contact && profile.contact.map((contact, index) => (
          <Chip key={index} icon="phone"
            onPress={() => console.log('Pressed')}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            {contact.name}, {contact.firstName}, {contact.phoneNumber}
          </Chip>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

export const createStyles = (width) => StyleSheet.create({
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
    width: width > 768 ? 'auto' : '100%',
  }
});

