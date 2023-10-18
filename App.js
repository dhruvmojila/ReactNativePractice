import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import Reel from './src/screens/Reel';
// import Testing from './src/screens/Testing';
// import AndroidDemo from './src/screens/AndroidDemo';
// import DragDropDemo from './src/screens/DragDropDemo';
// import {DragableView} from './src/componants/DragableView';
// import DargScreen from './src/screens/DargScreen';
// import CreateQuestions from './src/screens/CreateQuestions';
// import DemoKeyboard from './src/screens/DemoKeyboard';
// import DraggableGrid from './src/componants';
import SentimentAnalysis from './src/screens/SentimentAnalysis';
import LiquidSwipe from './src/screens/LiquidSwipe';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OnboardingScreen from './src/screens/OnboardingScreen';
import NewDragAndDrop from './src/screens/NewDragAndDrop';

const App = () => {
  const [isDraggable, setisDraggable] = useState(true);
  const [isDraggable1, setisDraggable1] = useState(true);
  const [keyBoardData, setKeyBoardData] = useState([
    [
      {label: '7', value: 7},
      {label: '8', value: 8},
      {label: '9', value: 9},
      {label: 'C', value: 'C', color: '#ffcece'},
    ],
    [
      {label: '4', value: 4},
      {label: '5', value: 5},
      {label: '6', value: 6},
      {label: 'B', value: 'backspace', color: '#ffcece'},
    ],
    [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: 'E', value: 'enter', color: '#d3ebfb'},
    ],
    [
      {label: '.', value: '.'},
      {label: '0', value: 0},
    ],
  ]);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* <CreateQuestions /> */}
        {/* <DemoKeyboard /> */}
        {/* <Navigation /> */}
        {/* <Reel /> */}
        {/* <Testing /> */}
        {/* </SafeAreaView> */}
        {/* <AndroidDemo /> */}
        {/* <DragDropDemo /> */}
        {/* <DargScreen /> */}
        {/* <DraggableGrid
        numColumns={4}
        data={['1', '2', '3', '4']}
        renderItem={({item}) => <Text>item</Text>}
      /> */}
        {/* <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}> */}
        {/* <DragableView isDrag={isDraggable} setIsDrag={setisDraggable}>
              <View style={{height: 300}}>
                <FlatList
                  // scrollEnabled={!isDraggable}
                  data={['test1', 'test2', 'test3']}
                  ListHeaderComponent={() => {
                    return (
                      <View
                        style={{
                          height: 45,
                          width: 200,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'darkblue',
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          Header
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={({item}) => (
                    <View
                      style={{
                        height: 45,
                        width: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>{item}</Text>
                    </View>
                  )}
                  style={{backgroundColor: '#EEEEEE'}}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </DragableView> */}
        {/* <DragableView isDrag={isDraggable1} setIsDrag={setisDraggable1}>
              <View style={[styles.keyboard]}>
                <View
                  style={{
                    backgroundColor: '#f2f2f2',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      margin: 12,
                      fontSize: 32,
                      color: '#1b2082',
                    }}>
                    asdasd
                  </Text>
                </View>
                {keyBoardData.map((item, index) => {
                  return (
                    <View style={{flexDirection: 'row'}} key={index}>
                      {item.map((item2, index) => {
                        return (
                          <TouchableOpacity key={index}>
                            <View
                              style={{
                                width: 65,
                                height: 65,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 14,
                                borderWidth: item2?.color ? 0 : 2,
                                borderColor: '#f2f2f2',
                                margin: 12,
                                backgroundColor: item2?.color
                                  ? item2?.color
                                  : 'white',
                                shadowOffset: {width: 0, height: 0},
                                shadowColor: '#c2c2c2',
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                              }}>
                              <Text style={{fontSize: 28, color: '#1b2082'}}>
                                {item2.label}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </DragableView> */}
        {/* <LiquidSwipe /> */}
        {/* </View>
        </SafeAreaView> */}
        {/* <SentimentAnalysis /> */}
        {/* <OnboardingScreen /> */}
        <View style={{flex: 1}}>
          <NewDragAndDrop />
        </View>
      </SafeAreaView>
    </Provider>
  );
  // return (
  //   <GestureHandlerRootView style={{flex: 1}}>
  //     <LiquidSwipe />
  //   </GestureHandlerRootView>
  // );
};
export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboard: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#171717',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
