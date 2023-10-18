import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';

import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const NUM_ITEMS = 5;
function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const DragDropDemo = () => {
  const [data, setData] = useState(initialData);
  const [startTime, setStartTime] = useState();

  let shakeAnimation = new Animated.Value(0);
  let startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItem2 = ({item, drag, isActive, index}) => {
    const AnimationRef = useRef([]);

    const bounce = i => {
      if (AnimationRef) {
        // console.log('animation', AnimationRef.current[i].tada());
        AnimationRef.current[i].shake().then(rest => console.log(rest));
      }
    };

    return (
      <ScaleDecorator>
        {/* <Animated.View
                      style={[
                        {
                          transform: [{translateX: shakeAnimation}],
                          height: '100%',
                        },
                      ]}> */}
        <Animatable.View ref={ref => (AnimationRef.current[index] = ref)}>
          <TouchableOpacity
            onLongPress={() => {
              bounce(index);
              drag();
            }}
            disabled={isActive}
            style={[
              {
                backgroundColor: isActive ? '#87CEEB' : 'white',
                width: 200,
                marginHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#AAAAAA',
                borderWidth: 0.5,
                opacity: isActive ? 0.5 : 1,
                height: '100%',
              },
            ]}>
            <Text>{item}</Text>
          </TouchableOpacity>
        </Animatable.View>
        {/* </Animated.View> */}
      </ScaleDecorator>
    );
  };

  const renderItem = ({item, drag, isActive}) => {
    const [data1, setData1] = useState([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ]);

    return (
      <ScaleDecorator key={item.key}>
        {/* <Animated.View style={{transform: [{translateX: shakeAnimation}]}}> */}
        {/* <Animatable.View
          ref={ref => (AnimationRef.current[index] = ref)}
          style={{
            height: 50,
            width: 50,
            backgroundColor: 'red',
          }}></Animatable.View> */}
        <TouchableOpacity
          // onPressIn={() => setStartTime(Date.now())}
          // onPressOut={() => {
          //   let endTime = Date.now();
          //   let duration = endTime - startTime;
          //   if (duration === 2000) {
          //   }
          // }}
          onLongPress={() => {
            // startShake();
            drag();
          }}
          // delayLongPress={500}
          disabled={isActive}
          style={[
            styles.rowItem,
            {
              backgroundColor: isActive ? '#87CEEB' : 'white',
              marginVertical: 12,
              width: '100%',
              padding: 12,
              opacity: isActive ? 0.5 : 1,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>{item.key.split('-')[1]}</Text>
              <Image
                source={require('../assets/img/drag.png')}
                style={{height: '100%', width: '100%', tintColor: '#BBBBBB'}}
              />
            </View>
            <View
              style={{
                // borderWidth: 0.3,
                // width: '100%',
                // height: '100%',
                flex: 1,
                // borderColor: '#AAAAAA',
              }}>
              <DraggableFlatList
                showsHorizontalScrollIndicator={false}
                data={data1}
                onDragEnd={({data}) => setData1(data)}
                keyExtractor={item => item}
                renderItem={renderItem2}
                horizontal
                style={{height: '100%'}}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* </Animated.View> */}
      </ScaleDecorator>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{backgroundColor: '#EFEFEF', flex: 1}}>
          <DraggableFlatList
            data={data}
            onDragEnd={({data}) => setData(data)}
            keyExtractor={item => item.key}
            renderItem={renderItem}
            style={{padding: 12, height: '100%'}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default DragDropDemo;

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 300,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
