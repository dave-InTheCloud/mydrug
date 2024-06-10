import * as React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';

const ListAccordion  = () => (
  <List.AccordionGroup>
    <List.Accordion title="Amoxiciline - 2 fois par jour" id="1">
      <List.Item title="Prend après le repas" />
    </List.Accordion>
    <List.Accordion title="Aspirine - 3 fois par jour" id="2">
      <List.Item title="Toutes les huit heures" />
    </List.Accordion>
   {/*  <View>
      <Text>
        List.Accordion can be wrapped because implementation uses React.Context.
      </Text>
      <List.Accordion title="Accordion 3" id="3">
        <List.Item title="Item 3" />
      </List.Accordion>
    </View> */}
  </List.AccordionGroup>
);

export default ListAccordion;