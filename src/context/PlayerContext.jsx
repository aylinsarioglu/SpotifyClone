import React, {createContext, useState, useRef} from 'react';
import TrackPlayer, {
  Capability,
  State,
  Event,
} from 'react-native-track-player';

export const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // TrackPlayer setup
  React.useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
          ],
        });

        // Event listeners
        TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {
          const state = data.state;
          setIsPlaying(state === State.Playing);
        });

        TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (data) => {
          setPosition(data.position);
          setDuration(data.duration);
        });
      } catch (error) {
        console.log('TrackPlayer setup error:', error);
      }
    };

    setupPlayer();
  }, []);

  const playTrack = async (track, tracks = []) => {
    try {
      if (tracks.length > 0) {
        await TrackPlayer.reset();
        await TrackPlayer.add(tracks);
        setPlaylist(tracks);
        const index = tracks.findIndex(t => t.id === track.id);
        setCurrentIndex(index >= 0 ? index : 0);
        await TrackPlayer.skip(index >= 0 ? index : 0);
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add([track]);
        setPlaylist([track]);
        setCurrentIndex(0);
      }
      
      setCurrentTrack(track);
      await TrackPlayer.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Play error:', error);
    }
  };

  const togglePlayPause = async () => {
    try {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Toggle error:', error);
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      const track = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());
      setCurrentTrack(track);
    } catch (error) {
      console.log('Skip next error:', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      const track = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());
      setCurrentTrack(track);
    } catch (error) {
      console.log('Skip previous error:', error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        position,
        duration,
        playlist,
        playTrack,
        togglePlayPause,
        skipToNext,
        skipToPrevious,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
