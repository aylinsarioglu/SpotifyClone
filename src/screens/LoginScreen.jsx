import {StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Facebook, Google, Mobile, Spotify} from 'iconsax-react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Spotify size={100} color="#1DB954" />
          </View>

          <Text style={styles.loginTitle}>
            Millions of songs Free on Spotify
          </Text>

          <View style={{height: 30}} />

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.signUpText}>Sign up free</Text>
          </TouchableOpacity>

          <View style={{height: 15}} />

          <TouchableOpacity style={styles.button}>
            <Mobile size="24" color="white" />
            <Text style={styles.buttonText}>Continue with phone number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Google size="24" color="white" />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Facebook size="24" color="white" />
            <Text style={styles.buttonText}>Continue with facebook</Text>
          </TouchableOpacity>

          <View style={{height: 30}} />

          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signUpText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#121212',
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
  },
  loginLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});