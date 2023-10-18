import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Svg, {RadialGradient, Defs, Rect, Stop} from 'react-native-svg';

const {width, height} = Dimensions.get('screen');
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    // fontFamily: 'SFProDisplay-Bold',
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    // fontFamily: 'SFProDisplay-Regular',
  },
});

const Slide = ({slide}) => {
  // const lighterColor = Color(color).lighten(0.8).toString();

  return (
    <View style={{flex: 1}}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} stopOpacity={0.8} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <Image source={slide.picture} style={styles.image} />
        <View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => console.log('Neeeer aato chale 6')}
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 15,
          right: 15,
          padding: 20,
          zIndex: 9999,
        }}>
        <Text>Hiiii</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slide;
