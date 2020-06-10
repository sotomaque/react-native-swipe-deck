import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements'

import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'name 1', uri: 'https://source.unsplash.com/featured?bikini' },
  { id: 2, text: 'name 2', uri: 'https://source.unsplash.com/featured?woman' },
  { id: 3, text: 'name 3', uri: 'https://source.unsplash.com/featured?lingerie' },
  { id: 4, text: 'name 4', uri: 'https://source.unsplash.com/featured?sexy' },
  { id: 5, text: 'name 5', uri: 'https://source.unsplash.com/featured?bra' },
  { id: 6, text: 'name 6', uri: 'https://source.unsplash.com/featured?model' },
  { id: 7, text: 'name 7', uri: 'https://source.unsplash.com/featured?dating' },
  { id: 8, text: 'name 8', uri: 'https://source.unsplash.com/featured?woman' },
];


export default function App() {

  /**
   * callback function provided via props to Deck
   *  - used to output each individual object 
   * 
   * @param {OBJECT} item 
   */
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

  /**
   * callback function provided via props to Deck
   *  - called when a user swipes right > SWIPE_THRESHOLD
   * 
   * @param {OBJECT} item 
   */
  const onSwipeRight = (item) => {
    console.log('SWIPES RIGHT', item)
  }

  /**
   * callback function provided via props to Deck
   *  - called when a user swipes left > SWIPE_THRESHOLD
   * 
   * @param {OBJECT} item 
   */
  const onSwipeLeft = (item) => {
    console.log('SWIPES LEFT', item)
  }

  /**
   * callback function provided via props to Deck
   *  - called when a user has swiped through all elments in data
   */
  const renderNoMoreCards = () => {
    console.log('SWIPED TOO MUCH')
    return (
      <Card
        title="SLOW DOWN 🤣"
        image={{ uri: 'https://source.unsplash.com/featured?sad' }}
        >
        <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 30 }}>👀</Text>
        <Button backgroundColor="#03A9F4" title="See More Singles" />
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
});
