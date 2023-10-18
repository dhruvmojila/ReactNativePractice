import {View, Text, Image, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Like from '../screens/Like';
import Message from '../screens/Message';
import SearchPage from '../screens/SearchPage';
import Post from '../screens/Post';
import Carouselcard from '../screens/Carouselcard';
import Profile from '../screens/Profile';
import Forgot from '../screens/Forgot';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Login1() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen
          name="App"
          component={Apps}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home2() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Like" component={Like} options={{}} />
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
}
function Apps() {
  const res = useSelector(store => store.postData);
  let filterObject = res?.user.filter(
    item => item.user_code == global.user_code,
  );
  console.log(filterObject, 'oooooooasasasas>>>');

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home2}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={
                  focused
                    ? require('../assets/img/home.png')
                    : require('../assets/img/homee.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={
                  focused
                    ? require('../assets/img/search.png')
                    : require('../assets/img/searchh.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={
                  focused
                    ? require('../assets/img/addition.png')
                    : require('../assets/img/more.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Card"
        component={Carouselcard}
        options={{
          tabBarBadge: 6,
          tabBarShowLabel: false,
          tabBarIcon: ({size}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={require('../assets/img/popcorn.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerStyle: {
            // backgroundColor: '#f4511e',
          },
          headerLeft: ({}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: '2%',
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../assets/img/lockicon.png')}
              />
              <View style={{margin: '1%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    // textDecorationLine: 'underline',
                  }}>
                  {filterObject[0]?.username}
                </Text>
              </View>
              <Image
                style={{width: 15, height: 15}}
                source={require('../assets/img/downarrow.png')}
              />
            </View>
          ),
          headerRight: ({size}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  marginRight: '2%',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../assets/img/more.png')}
                />
              </View>
              <View style={{flex: 0.2, justifyContent: 'center'}}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../assets/img/menubaricon.png')}
                />
              </View>
            </View>
          ),
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={
                  !focused
                    ? require('../assets/img/user.png')
                    : require('../assets/img/profile-user.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Login1;
