import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AnySizeDragSortableView,
  AutoDragSortableView,
  DragSortableView,
} from 'react-native-drag-sort';
import DraggableGrid from '../componants';
// import {DraggableGrid} from 'react-native-draggable-grid';
const DargScreen = () => {
  const [data, setData] = useState([
    {name: '1', key: 'one'},
    {name: '2', key: 'two'},
    {name: '3', key: 'three'},
    {name: '4', key: 'four'},
    {name: '5', key: 'five'},
    {name: '6', key: 'six'},
    {name: '7', key: 'seven'},
    {name: '8', key: 'eight'},
    {name: '9', key: 'night'},
    {name: '0', key: 'zero'},
  ]);
  const renderItem = item => {
    return (
      <View
        style={{
          backgroundColor: 'red',
          height: Platform.isPad ? 200 : 50,
          width: Platform.isPad ? 200 : 50,
        }}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: 100,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}>
      <DraggableGrid
        numColumns={4}
        renderItem={renderItem}
        data={data}
        onDragRelease={data => {
          setData(data); // need reset the props data sort after drag release
        }}
      />
    </SafeAreaView>
  );
};

export default DargScreen;

const styles = StyleSheet.create({});
