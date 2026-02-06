import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../utils/helpers';

const SquareCard = ({album, large = false, showSongFormat = false}) => {
  const navigation = useNavigation();
  const {SONGSINFO} = SCREENS;

  const cardSize = large ? 180 : 160;

  return (
    <Pressable
      style={[styles.container, {width: cardSize}]}
      onPress={() => navigation.navigate(SONGSINFO, {album})}>
      <Image source={{uri: album.coverArt}} style={[styles.image, {width: cardSize, height: cardSize}]} />
      <Text style={styles.name} numberOfLines={2}>
        {album.name}
      </Text>
      {showSongFormat ? (
        <Text style={styles.artist} numberOfLines={1}>
          Song • {album.artist}
        </Text>
      ) : (
        <Text style={styles.artist} numberOfLines={2}>
          {album.artist}
        </Text>
      )}
    </Pressable>
  );
};

export default SquareCard;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  image: {
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  name: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 12,
  },
});
