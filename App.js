import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements'

import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Puppy', uri: 'https://source.unsplash.com/featured?puppy' },
  { id: 2, text: 'Woman', uri: 'https://source.unsplash.com/featured?woman' },
  { id: 3, text: 'Dog', uri: 'https://source.unsplash.com/featured?dog' },
  { id: 4, text: 'Woman1.5', uri: 'https://source.unsplash.com/featured?woman' },
  { id: 5, text: 'Pup', uri: 'https://source.unsplash.com/featured?pup' },
  { id: 6, text: 'Woman2', uri: 'https://source.unsplash.com/featured?woman' },
  { id: 7, text: 'Dating', uri: 'https://source.unsplash.com/featured?dating' },
  { id: 8, text: 'Woman3', uri: 'https://source.unsplash.com/featured?woman' },
];


export default function App() {

  const renderCard = (item) => {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
        >
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>DEMO</Text>
        <Button icon={{ name: 'code' }} backgroundColor="#03A9F4" title="View Details" />
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
