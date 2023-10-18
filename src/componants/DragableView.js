import React from 'react';
import {TextStyle} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const DragableView = ({children, style, isDrag, setIsDrag}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
      console.log('start', 'x : ', x.value, 'y : ', y.value);
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
      console.log('active', 'x : ', x.value, 'y : ', x.value);
    },
    onEnd: (event, context) => {
      x.value = withSpring(event.translationX + context.x + 10);
      y.value = withSpring(event.translationY + context.y + 10);
      console.log('end', 'x : ', x.value, 'y : ', y.value);
    },
  });
  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  }, [x, y]);

  return (
    <GestureHandlerRootView>
      {console.log(isDrag, 'asdasdas')}
      <PanGestureHandler onGestureEvent={isDrag ? panGestureEvent : () => null}>
        <Animated.View
          style={[
            {display: 'flex', justifyContent: 'center', alignItems: 'center'},
            panStyle,
            {...style},
          ]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export {DragableView};
