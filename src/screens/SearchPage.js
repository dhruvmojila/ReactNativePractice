/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getFeedDataAction} from '../redux/actions/actions';
import RightImageComponants from '../componants/RightImageComponants';
import LeftImageComponants from '../componants/LeftImageComponants';

const SearchPage = () => {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = useSelector(store => store.postData.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) {
      setFeedData(data[0]);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getFeedDataAction());
  }, []);
  let tempArr = [];
  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <Text>loading....</Text>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Image
                source={require('../assets/img/search.png')}
                style={styles.icon}
              />
              <TextInput placeholder="Search" style={styles.searchInput} />
            </View>
          </View>
          <ScrollView style={styles.gridContainer}>
            {feedData.map((item, index) => {
              if ((index + 1) % 5 === 0) {
                tempArr.push(item);
                let arr = tempArr;
                tempArr = [];
                return (
                  <View key={index}>
                    {(index + 1) % 2 === 0 ? (
                      <LeftImageComponants data={arr} key={index} />
                    ) : (
                      <RightImageComponants data={arr} key={index} />
                    )}
                  </View>
                );
              } else {
                tempArr.push(item);
              }
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
  },
  searchBarContainer: {
    padding: '4%',
    flex: 0.05,
  },
  icon: {
    height: 22,
    width: 22,
    margin: '2%',
  },
  searchInput: {
    flex: 1,
    margin: '2%',
  },
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  gridContainer: {
    flex: 0.95,
  },
  grid: {
    flex: 1,
    // minWidth: 120,
    // maxHeight: 120,
    // margin: '0.3%',
  },
});
