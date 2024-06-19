import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, useWindowDimensions, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import BasicDocument from '@/components/BasicDocument';
import { useEffect, useState } from 'react';
import { ProfileService } from '../services/profile/ProfileService';
import { DrugPlanService } from '../services/drugPlan/DrugPlanService';


export default function DocumntView() {

  const profileService = new ProfileService();
  const drugPlanService = new DrugPlanService();
  const [profile, setProfile] = useState({});
  const [drugPlan, setDrugPlan] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getProfile().then(profile => {
      setProfile(profile);
    }).then(() => drugPlanService.getDrugPlan().then(drugPlan => {
      setDrugPlan(drugPlan);
    })).finally(() => setLoading(false));
  }, []);

  return (
    /*  <ParallaxScrollView
       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
       <ThemedView style={styles.titleContainer}>
         <ThemedText type="title">QRCODE</ThemedText>
 
         </ThemedView>
     </ParallaxScrollView> */
    // Create Document Component
    <View>
      {loading ? <ThemedText>Loading...</ThemedText> : <BasicDocument profile={profile} drugPlan={drugPlan} />}
    </View>
  );
}



const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
