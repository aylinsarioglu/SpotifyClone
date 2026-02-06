import {ScrollView, StyleSheet, View, Text} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AlbumContext} from '../context/AlbumContext';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SquareCard from '../components/SquareCard';
import {Notification, Clock, Setting2} from 'iconsax-react-native';

const HomeScreen = () => {
  const {albums, loading, error} = useContext(AlbumContext);

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          {/* Made for you Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Made for you</Text>
            <View style={styles.headerIcons}>
              <Notification color="white" size={22} />
              <Clock color="white" size={22} style={{marginLeft: 15}} />
              <Setting2 color="white" size={22} style={{marginLeft: 15}} />
            </View>
          </View>

          {/* Made for you Section */}
          <View style={styles.section}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums.slice(0, 2).map((album, index) => (
                <SquareCard key={index} album={album} large />
              ))}
            </ScrollView>
          </View>

          {/* Trending now Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending now</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums.slice(2, 5).map((album, index) => (
                <SquareCard key={index} album={album} showSongFormat />
              ))}
            </ScrollView>
          </View>

          {/* Top picks for you Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top picks for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums.slice(5, 10).map((album, index) => (
                <SquareCard key={index} album={album} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 15,
  },
});
