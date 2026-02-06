import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AlbumContext} from '../context/AlbumContext';
import AlbumCard from '../components/AlbumCard';
import {
  Setting2,
  Logout,
  Heart,
  Music,
  Play,
  ArrowRight2,
} from 'iconsax-react-native';

const ProfileScreen = () => {
  const {albums} = useContext(AlbumContext);

  const stats = {
    playlists: 12,
    followers: 1250,
    following: 89,
  };

  const menuItems = [
    {icon: Setting2, label: 'Settings', color: 'white'},
    {icon: Heart, label: 'Liked Songs', color: '#1DB954'},
    {icon: Music, label: 'My Playlists', color: 'white'},
    {icon: Logout, label: 'Logout', color: '#FF4444'},
  ];

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <ScrollView
        style={{marginTop: 50}}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://i.scdn.co/image/ab6775700000ee85c9829a4e1e0a0b8cce0b0c0a',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>User</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.playlists}</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.quickActionButton}>
            <Play color="#1DB954" size={24} />
            <Text style={styles.quickActionText}>Play</Text>
          </Pressable>
          <Pressable style={styles.quickActionButton}>
            <Heart color="#1DB954" size={24} />
            <Text style={styles.quickActionText}>Like</Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Pressable key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <IconComponent color={item.color} size={24} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ArrowRight2 color="#B3B3B3" size={20} />
              </Pressable>
            );
          })}
        </View>

        {/* Favorite Albums */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your favorite albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {albums.slice(0, 6).map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </ScrollView>
        </View>

        {/* Recently Played */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently played</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {albums.slice(6, 10).map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#1DB954',
  },
  profileName: {
    color: 'white',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2A2A2A',
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  statLabel: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 20,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});