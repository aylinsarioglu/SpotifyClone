import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PlayerContext} from '../context/PlayerContext';
import {
  ArrowDown2,
  More,
  Heart,
  Shuffle,
  Pause,
  Play,
  Repeat,
  Cast,
  Share,
  ArrowUp2,
  ArrowLeft2,
  ArrowRight2,
  TickCircle,
  Export,
  Maximize,
} from 'iconsax-react-native';

const SongsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {song, album, songs = []} = route.params || {};
  const {
    currentTrack,
    isPlaying: playerIsPlaying,
    position,
    duration,
    playTrack,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
  } = useContext(PlayerContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Player state'i senkronize et
  useEffect(() => {
    setIsPlaying(playerIsPlaying);
    setCurrentTime(position);
    setTotalTime(duration || song?.duration || 216);
  }, [playerIsPlaying, position, duration, song]);

  // Şarkı yüklendiğinde çal
  useEffect(() => {
    if (song && song.audioUrl) {
      const track = {
        id: song.id || song.title,
        url: song.audioUrl,
        title: song.title,
        artist: song.artist || album?.artist,
        artwork: song.thumbnail || album?.coverArt,
      };

      const trackList = songs.length > 0
        ? songs.map(s => ({
            id: s.id || s.title,
            url: s.audioUrl || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`,
            title: s.title,
            artist: s.artist || album?.artist,
            artwork: s.thumbnail || album?.coverArt,
          }))
        : [track];

      playTrack(track, trackList);
    }
  }, [song]);

  // Default song data if not provided
  const songData = song || {
    title: album?.name || 'Unknown Song',
    artist: album?.artist || 'Unknown Artist',
    artist1: album?.artist?.split(',')[0]?.toUpperCase() || 'UNKNOWN',
    artist2: album?.artist?.split(',')[1]?.toUpperCase() || '',
    overlayTitle: album?.name?.split(' ')[0]?.toUpperCase() || 'SONG',
    lyrics: [
      'No lyrics available',
      'for this song',
    ],
  };

  const lyrics = songData.lyrics || [
    'Lyrics not available',
    'for this song',
  ];

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalTime) * 100;

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.container}>
          {/* Top Song Info */}
          <View style={styles.topSongInfo}>
            <View style={styles.topSongLeft}>
              <Text style={styles.timeTextTop}>{formatTime(currentTime)}</Text>
              <View style={styles.songTitleContainer}>
                <Text style={styles.songTitleTop}>{songData.title}</Text>
                <Text style={styles.artistNameTop}>{songData.artist}</Text>
              </View>
            </View>
            <View style={styles.topSongRight}>
              <TickCircle color="#1DB954" size={24} />
              <TouchableOpacity onPress={togglePlayPause}>
                {isPlaying ? (
                  <Pause color="white" size={24} style={{marginLeft: 15}} />
                ) : (
                  <Play color="white" size={24} style={{marginLeft: 15}} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Lyrics Section */}
          <View style={styles.lyricsSection}>
            <View style={styles.lyricsHeader}>
              <Text style={styles.lyricsTitle}>Şarkı sözleri</Text>
              <View style={styles.lyricsIcons}>
                <Export color="white" size={20} />
                <Maximize color="white" size={20} style={{marginLeft: 15}} />
              </View>
            </View>
            <View style={styles.lyricsContent}>
              {lyrics.map((line, index) => (
                <Text
                  key={index}
                  style={[
                    styles.lyricsLine,
                    index === 0 && styles.lyricsLineActive,
                  ]}>
                  {line}
                </Text>
              ))}
            </View>
          </View>

          {/* Artist About Section */}
          <View style={styles.artistSection}>
            <Text style={styles.artistSectionTitle}>Sanatçı hakkında</Text>
            <Image
              source={{
                uri:
                  album?.coverArt ||
                  song?.thumbnail ||
                  'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
              }}
              style={styles.artistImage}
            />
            <View style={styles.artistInfo}>
              <View style={styles.artistInfoLeft}>
                <Text style={styles.artistName}>
                  {songData.artist?.split(',')[0] || songData.artist || 'Unknown Artist'}
                </Text>
                <Text style={styles.artistListeners}>
                  Aylık {Math.floor(Math.random() * 10 + 1)} Mn dinleyici
                </Text>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Takip Ediliyor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topSongInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  topSongLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeTextTop: {
    color: '#B3B3B3',
    fontSize: 14,
    marginRight: 15,
    minWidth: 45,
  },
  songTitleContainer: {
    flex: 1,
  },
  songTitleTop: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  artistNameTop: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  topSongRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lyricsSection: {
    backgroundColor: '#E2211C',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  lyricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  lyricsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  lyricsIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lyricsContent: {
    gap: 12,
  },
  lyricsLine: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  lyricsLineActive: {
    opacity: 0.6,
  },
  artistSection: {
    marginBottom: 20,
  },
  artistSectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  artistImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  artistInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artistInfoLeft: {
    flex: 1,
  },
  artistName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  artistListeners: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  followButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});