import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SearchNormal} from 'iconsax-react-native';

const SearchScreen = () => {
  const topGenres = [
    {name: 'Pop', color: '#8D67AB'},
    {name: 'Bollywood', color: '#BA5D07'},
  ];

  const browseAll = [
    {name: 'Podcasts', color: '#E13300'},
    {name: 'New Releases', color: '#E8115B'},
    {name: 'Charts', color: '#8D67AB'},
    {name: 'Concerts', color: '#1E3264'},
    {name: 'Made for You', color: '#1E3264'},
    {name: 'At Home', color: '#0D73EC'},
  ];

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <ScrollView
        style={{marginTop: 50}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.container}>
          <Text style={styles.title}>Search</Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <SearchNormal color="#666" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Artists, songs, or podcasts"
              placeholderTextColor="#666"
            />
          </View>

          {/* Your top genres */}
          <Text style={styles.sectionTitle}>Your top genres</Text>
          <View style={styles.genresContainer}>
            {topGenres.map((genre, index) => (
              <Pressable
                key={index}
                style={[styles.genreCard, {backgroundColor: genre.color}]}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Browse all */}
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.browseContainer}>
            {browseAll.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.browseCard, {backgroundColor: item.color}]}>
                <Text style={styles.browseText}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 30,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  genresContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  genreCard: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  browseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  browseCard: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
