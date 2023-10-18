import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Profile = () => {
  const res = useSelector(store => store.postData);
  let filterObject = res?.user.filter(
    item => item.user_code == global.user_code,
  );

  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flexDirection: 'row', marginTop: '2%', flex: 1}}>
        <View style={{flex: 0.35}}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              margin: '4%',
              borderColor: 'black',
              borderWidth: 2,
            }}
            source={{
              uri: filterObject[0]?.profile_img,
            }}
          />
          <Text style={{margin: '4%', fontSize: 15, fontWeight: '600'}}>
            {filterObject[0]?.username}
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '800'}}>21</Text>
            <Text>Posts</Text>
          </View>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '800'}}>757</Text>
            <Text>Followers</Text>
          </View>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '800'}}>957</Text>
            <Text>Following</Text>
          </View>
        </View>

        {/* <Text>asasas</Text> */}
      </View>
      {/* <View style={{backgroundColor: 'pink'}}>
        <Text style={{fontSize: 25}}>
          The most common way to interact with a header is by tapping on a
          button either to the left or the right of the title. Let's add a
          button to the right side of the header (one of the most difficult
          places to touch on your entire screen, depending on finger and phone
          size, but also a normal place to put buttons).
        </Text>
      </View> */}
    </ScrollView>
  );
};

export default Profile;
