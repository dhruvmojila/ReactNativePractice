import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useRef} from 'react';
import Card from './Card';

const Carouselcard = () => {
  const OFFSET = 40;
  const offset = 10;
  const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;
  const ITEM_HEIGHT = 200;

  const onscroll = useRef(new Animated.Value(0)).current;

  const card = [
    {title: 'Movie', Image: require('../assets/img/st.jpg')},
    {title: 'Movie2', Image: require('../assets/img/im2.jpg')},
    {title: 'Movie2', Image: require('../assets/img/im3.jpg')},
    {title: 'Movie2', Image: require('../assets/img/im3.jpg')},
  ];
  const movies = [
    {title: 'Jaws', poster: require('../assets/img/movie1.jpg')},
    {
      title: 'The Jocker',
      poster: require('../assets/img/movie2.jpg'),
    },
    {title: 'Fateh', poster: require('../assets/img/movie3.jpg')},
  ];
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView style={{flex: 1, paddingVertical: 20}}>
        <View style={{margin: '3%'}}>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 30,
              color: 'white',
              textAlign: 'center',
            }}>
            CARD
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            decelerationRate={'normal'}
            snapToInterval={ITEM_WIDTH}
            style={{paddingHorizontal: 0}}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            disableIntervalMomentum
            scrollEventThrottle={12}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: onscroll}}}],
              {useNativeDriver: false},
            )}>
            {card.map((item, index) => {
              const inputRange = [
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
              ];

              const translate = onscroll.interpolate({
                inputRange,
                outputRange: [0.85, 1, 0.85],
              });

              const opacity = onscroll.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
              });

              return (
                <Animated.View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    marginLeft: index === 0 ? OFFSET : undefined,
                    marginRight: card.length - 1 ? OFFSET : undefined,
                    opacity: opacity,
                    transform: [{scale: translate}],
                  }}>
                  <ImageBackground
                    resizeMode="cover"
                    source={item.Image}
                    style={{
                      flex: 1,

                      justifyContent: 'center',
                    }}
                    imageStyle={{borderRadius: 10}}
                  />
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: '8%', marginBottom: '2%'}}>
          <Text style={{color: 'white'}}>MOVIES</Text>
        </View>

        <View style={{marginVertical: '1%'}}>
          <ScrollView horizontal={true}>
            {movies.map((item, index) => (
              <View
                key={index}
                style={{
                  marginLeft: index === 0 ? offset : undefined,
                  marginRight: card.length - 1 ? offset : undefined,
                }}>
                {console.log(item, 'items........')}
                <Card item={item} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={{marginHorizontal: '2%', marginTop: '8%', marginBottom: '2%'}}>
          <Text style={{color: 'white'}}>SERIES</Text>
        </View>

        <View style={{marginVertical: '1%'}}>
          <ScrollView horizontal={true}>
            {movies.map((item, index) => (
              <View
                key={index}
                style={{
                  marginLeft: index === 0 ? offset : undefined,
                  marginRight: card.length - 1 ? offset : undefined,
                }}>
                {console.log(item, 'items........')}
                <Card item={item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Carouselcard;
