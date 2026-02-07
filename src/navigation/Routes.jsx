import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../utils/helpers';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SongsInfoScreen from '../screens/SongsInfoScreen';
import SongsScreen from '../screens/SongsScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PremiumScreen from '../screens/PremiumScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, SearchNormal, Book1, Spotify} from 'iconsax-react-native';

const {HOME, SONGSINFO, SONGS, PROFILE, LOGIN} = SCREENS;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          borderWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#B3B3B3',
      }}>
      <Tab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
          tabBarIcon: ({focused, color}) => (
            <Home
              size={focused ? 24 : 22}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
          tabBarIcon: ({focused, color}) => (
            <SearchNormal
              size={focused ? 24 : 22}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Your Library',
          tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
          tabBarIcon: ({focused, color}) => (
            <Book1
              size={focused ? 24 : 22}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Premium',
          tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
          tabBarIcon: ({focused, color}) => (
            <Spotify
              size={focused ? 24 : 22}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name={SONGS} component={SongsScreen} />
        <Stack.Screen name={SONGSINFO} component={SongsInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
