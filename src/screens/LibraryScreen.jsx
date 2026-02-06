import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LibraryScreen = () => {
  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>Your Library</Text>
      </View>
    </LinearGradient>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
});
