import {View, Text, Image} from 'react-native';
import React from 'react';

const Card = props => {
  return (
    <View>
      <View
        style={{
          minHeight: 200,
          minWidth: 150,
          maxHeight: 200,
          maxWidth: 200,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 6,
        }}>
        <Image
          style={{
            // resizeMode: 'cover',
            minHeight: '90%',
            minWidth: '90%',
            maxHeight: '100%',
            maxWidth: '100%',
          }}
          source={props.item.poster}
        />
      </View>
      <View>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {props.item.title}
        </Text>
      </View>
    </View>
  );
};

export default Card;
