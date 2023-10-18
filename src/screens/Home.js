import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';

import Like from './Like';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          // padding: '3%',
        }}>
        <View style={{flex: 0.8, alignItems: 'flex-start'}}>
          <Image
            style={{width: 150, height: 40}}
            source={require('../assets/img/instagram-new.webp')}
          />
          {/* <Text style={{fontSize: 20}}>Instagram</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginRight: '1%',
            flex: 0.2,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Like')}>
            <Image
              style={styles.image}
              source={require('../assets/img/heart.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Image
              style={styles.image}
              source={require('../assets/img/chat.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
});
export default Home;
