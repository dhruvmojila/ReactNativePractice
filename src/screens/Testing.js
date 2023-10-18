import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSanityDataAction} from '../redux/actions/actions';
import {GET_DATA_QUERY} from '../redux/utils/Url';
import {urlFor} from '../client';

const Testing = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector(store => store.postData.sanityUsers);

  useEffect(() => {
    if (data) {
      setUsers(data);
      setIsLoading(false);
    }
  }, [data]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSanityDataAction(GET_DATA_QUERY));
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <>
          {users.map((item, id) => {
            return (
              <View key={id}>
                <Image
                  source={{uri: urlFor(item.profile).url()}}
                  style={{height: 120, width: 120}}
                />
                <Text>{item.username}</Text>
                <Text>{item.user_code}</Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
