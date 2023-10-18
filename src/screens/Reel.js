/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reel = () => {
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <View style={styles.userInfo}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Image
                source={require('../assets/img/movie1.jpg')}
                style={[
                  {
                    width: 34,
                    height: 34,
                    borderRadius: 50,
                    marginRight: 8,
                  },
                ]}
              />
              <Text style={[{fontSize: 18, marginRight: 8, color: 'white'}]}>
                username
              </Text>
              <View style={[styles.followBtn, {marginRight: 8}]}>
                <Text
                  style={[
                    styles.subtext,
                    {fontSize: 18, marginHorizontal: 12, marginVertical: 8},
                  ]}>
                  Follow
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: '5%'}}>
            <Text style={styles.caption}>Cricket had some magic in it ...</Text>
          </View>
          <View>
            <Image />
          </View>
        </View>
        <View style={styles.operations}>
          <View>
            <View style={styles.operationsContainer}>
              <Image
                source={require('../assets/img/heart.png')}
                style={styles.icon}
              />
              <Text style={styles.subtext}>500K</Text>
            </View>
            <View style={styles.operationsContainer}>
              <Image
                source={require('../assets/img/send.png')}
                style={styles.icon}
              />
              <Text style={styles.subtext}>96.5K</Text>
            </View>
            <View style={styles.operationsContainer}>
              <Image
                source={require('../assets/img/comment.png')}
                style={styles.icon}
              />
              <Text style={styles.subtext}>512</Text>
            </View>
            <View style={styles.operationsContainer}>
              <Image
                source={require('../assets/img/threedot.png')}
                style={[styles.icon, {width: 18, height: 18}]}
              />
            </View>
            <View style={[styles.operationsContainer]}>
              <View
                style={{borderWidth: 3, borderColor: 'white', borderRadius: 5}}>
                <Image
                  source={require('../assets/img/movie1.jpg')}
                  style={[{width: 24, height: 24}]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  operations: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    margin: '5%',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
  operationsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '28%',
  },
  subtext: {
    color: 'white',
    marginTop: 8,
  },
  userInfo: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
    margin: '5%',

    // flexDirection: 'row',
  },
  followBtn: {
    borderColor: 'white',
    borderWidth: 0.7,
    borderRadius: 8,
  },
  caption: {
    color: 'white',
    fontSize: 16,
  },
});
