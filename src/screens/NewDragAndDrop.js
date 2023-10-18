import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {DraxProvider, DraxList} from 'react-native-drax';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getBackgroundColor = alphaIndex => {
  switch (alphaIndex % 6) {
    case 0:
      return '#ffaaaa';
    case 1:
      return '#aaffaa';
    case 2:
      return '#aaaaff';
    case 3:
      return '#ffffaa';
    case 4:
      return '#ffaaff';
    case 5:
      return '#aaffff';
    default:
      return '#aaaaaa';
  }
};

const getHeight = alphaIndex => {
  let height = 50;
  if (alphaIndex % 2 === 0) {
    height += 10;
  }
  if (alphaIndex % 3 === 0) {
    height += 20;
  }
  return height;
};

const getItemStyleTweaks = alphaItem => {
  const alphaIndex = alphabet.indexOf(alphaItem);
  return {
    backgroundColor: getBackgroundColor(alphaIndex),
    height: getHeight(alphaIndex),
  };
};

const NewDragAndDrop = () => {
  const [alphaData, setAlphaData] = React.useState(alphabet);
  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <View style={styles.container}>
          <DraxList
            data={alphaData}
            onItemDragStart={() => console.log('hiii')}
            renderItemContent={({item}) => (
              <View style={[styles.alphaItem, getItemStyleTweaks(item)]}>
                <Text style={styles.alphaText}>{item}</Text>
              </View>
            )}
            onItemReorder={({fromIndex, toIndex}) => {
              const newData = alphaData.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              setAlphaData(newData);
            }}
            keyExtractor={item => item}
          />
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

export default NewDragAndDrop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
  alphaItem: {
    backgroundColor: '#aaaaff',
    borderRadius: 8,
    margin: 4,
    padding: 4,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphaText: {
    fontSize: 28,
  },
});
