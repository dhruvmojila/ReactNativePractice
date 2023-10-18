/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const RightImageComponants = ({data}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.map((item, index) => {
          if (index <= 3) {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  minHeight: 120,
                  minWidth: 120,
                  margin: '0.5%',
                }}>
                <Image source={{uri: item.image}} style={{flex: 1}} />
              </View>
            );
          }
        })}
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            minHeight: 120,
            minWidth: 120,
            margin: '0.5%',
            backgroundColor: '#EEEEEE',
          }}>
          {/* <Image
            source={{uri: data[data.length - 1].image}}
            style={{flex: 1}}
          /> */}
          {/* <Video
            source={require('../assets/test.mp4')}
            style={{flex: 1}}
            repeat={true}
            paused={false}
            // controls={true}
            posterResizeMode="cover"
            muted={true}
            resizeMode="cover"
            // audioOnly={true}
            poster="http://via.placeholder.com/640x360"
            // ref={ref => {
            //   this.player = ref;
            // }}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default RightImageComponants;

const styles = StyleSheet.create({
  rightcardContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
