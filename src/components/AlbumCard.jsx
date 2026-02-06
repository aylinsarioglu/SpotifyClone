import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../utils/helpers';

const AlbumCard = ({album}) => {
  const navigation = useNavigation();
  const {SONGSINFO} = SCREENS;

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(SONGSINFO, {album})}>
      <Image source={{uri: album.coverArt}} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {album.name}
      </Text>
      <Text style={styles.artist} numberOfLines={1}>
        {album.artist}
      </Text>
    </Pressable>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
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