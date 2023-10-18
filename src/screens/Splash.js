import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';

const Splash = ({navigation}) => {
  global.user_code = '';
  useEffect(() => {
    console.log('insisisisisi');
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <View style={{alignSelf: 'center', flex: 0.9, justifyContent: 'center'}}>
        <Image
          style={styles.image}
          source={require('../assets/img/logo.png')}
        />
      </View>
      <View style={{alignSelf: 'center', flex: 0.1}}>
        <Image source={require('../assets/img/meta.png')} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },

  image: {
    height: 80,
    width: 80,
    marginBottom: 20,
  },
});
export default Splash;
