import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, useWindowDimensions } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Input from '@/components/Input';
import ListAccordion from '@/components/ListAccordion';
import { Button, Chip, Divider, IconButton, List, Text, Title, useTheme } from 'react-native-paper';
import React, { useEffect, useReducer, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileService } from '../services/profile/ProfileService';
import { profileReducer, initialState } from '../services/profile/ProfileReducer';

/**
 * Renders a profile view component that displays user profile information and allows editing of certain fields.
 *
 * @return {JSX.Element} The rendered profile view component.
 */
export default function ProfileView() {


  /**
   * Retrieves the current window dimensions and creates styles based on the width.
   *
   * @return {void}
   */
  const { width } = useWindowDimensions();
  const styles = createStyles(width);

  const [isAllergyModified, setIsAllergyModified] = React.useState(false);
  const [isContactsModified, setIsContactsModified] = React.useState(false);
  const [newAllergy, setNewAllergy] = React.useState('');
  const [newContact, setNewContact] = React.useState({ name: '', firstName: '', phoneNumber: '' });
  const [profile, dispatch] = useReducer(profileReducer, initialState);
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

  /**
   * Adds a new allergy to the profile and updates the profile in the profile service.
   *
   * @return {Promise<void>} A promise that resolves when the allergy is added and the profile is updated.
   */
  const addAllergy = async () => {
    if (newAllergy) {
      profile.allergies.push(newAllergy);
      await profileService.setProfile(profile);
    }
    setNewAllergy('');
  };

  /**
   * Add a new contact to the profile if name, firstName, and phoneNumber are provided.
   */
  const addContact = async () => {
    if (newContact.name && newContact.firstName && newContact.phoneNumber) {
      profile.contact.push(newContact);
      await profileService.setProfile(profile);
      setNewContact({ name: '', firstName: '', phoneNumber: '' });
    }
  };

  /**
   * Updates the profile with the given property and value, and saves the updated profile to the profile service.
   *
   * @param {string} property - The property of the profile to update.
   * @param {any} value - The new value for the property.
   * @return {Promise<void>} A promise that resolves when the profile is updated and saved.
   */
  const handleInputChange = async (property: string, value: any) => {
    profile[property] = value;
    await profileService.setProfile(profile);
    dispatch({ type: 'updateProperty', payload: profile });
  };


  /**
   * Clears the profile data by calling the `clearProfile` function of the `profileService` and updating the state with the `initialState`.
   *
   * @return {Promise<void>} A promise that resolves when the profile data is cleared and the state is updated.
   * @throws {Error} If there is an error while clearing the profile data.
   */
  const clearProfile = async () => {
    try {
      await profileService.clearProfile();
      dispatch({ type: 'clearProfile', payload: initialState });
      console.log('Profile data cleared');
    } catch (error) {
      console.error('Error clearing profile data:', error);
    }
  };

  const { colors } = useTheme();

  return (

    <ParallaxScrollView>


      <Title>Profil</Title>
      <Divider style={styles.divider}></Divider>
      <View style={[styles.rowAdaptive]}>
        <Button mode="contained" icon={"delete"}
          onPress={clearProfile} children={"supprimer le profile"} buttonColor={colors.secondary} />
      </View>

      <View style={[styles.rowAdaptive, { gap: 16, justifyContent: 'center' }]}>
        <Input
          label="Nom"
          value={profile.name}
          id="name"
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
        <Input
          label="Prenom"
          value={profile.firstName}
          id="firstName"
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
        <Input
          label="Née le"
          value={profile.birthDate}
          id="birthDate"
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
      </View>
      <View style={[styles.rowAdaptive, { gap: 16, justifyContent: 'center' }]}>
        <Input
          label="Matricule Sécurité social"
          value={profile.socialSecurityNumber}
          id='socialSecurityNumber'
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
        <Input
          label="Email"
          value={profile.email}
          id='email'
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
        <Input
          label="Médecin"
          value={profile.doctor}
          id="doctor"
          handleChangeText={handleInputChange}
          style={styles.mobileInput}
        />
      </View>

      <View style={styles.row}>
        <Title>Allergies</Title>
        <IconButton icon="plus" onPress={() => setIsAllergyModified(true)} />
      </View>
      <Divider style={styles.divider} />
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
        {profile.allergies && profile.allergies.map((allergy, index) => (
          <Chip
            key={index}
            icon="information"
            onPress={() => console.log('Pressed')}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            {allergy}
          </Chip>
        ))}
      </View>



      <View style={[styles.row]}>
        <Title>Contacts</Title>
        <IconButton icon="plus" onPress={() => setIsContactsModified(true)} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.rowAdaptive}>

        {isContactsModified && (
          <>
            <View style={[styles.rowAdaptive, { width: width > 800 ? 'auto' : '100%', gap: 16 }]}>
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
    flexDirection: width < 800 ? 'column' : 'row',
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
    flexWrap: 'wrap',
    marginTop: '1%',
    marginBottom: '1%'
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },
  rowAdaptive: {
    flexDirection: width < 800 ? 'column' : 'row',
    alignItems: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },

  mobileInput: {
    width: width > 800 ? 'auto' : '90%',
  },
  divider: {
    marginBottom: '1%',
    color: '#e27c28'
  },
});

