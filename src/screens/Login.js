import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDataAction} from '../redux/actions/actions';
import {User} from '../redux/utils/Url';

const Login = ({navigation}) => {
  const res = useSelector(store => store.postData);
  console.log('res', res);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDataAction(User));
  }, []);

  const [visible, setvisible] = useState(true);
  const [password, setpassword] = useState([]);
  const [username, setusername] = useState([]);
  const [users, setusers] = useState([]);
  const [passvalid, setpassvalid] = useState(false);
  const [uservalid, setuservalid] = useState(false);

  // console.log(username, 'username');
  useEffect(() => {
    const temp = [];
    if (res?.user) {
      res.user.map((item, index) => {
        temp.push(item);
      });
      setusers(temp);
    }
  }, [res]);
  console.log(users, 'users');

  useEffect(() => {
    setuservalid(false);
    setpassvalid(false);
  }, [password, username]);

  function validation(user, pass) {
    users.map((item, index) => {
      console.log(item, 'item');

      if (item.username === user && item.password === pass) {
        global.user_code = item.user_code;
        navigation.replace('App');
      } else {
        if (item.username !== user) {
          setuservalid(true);
          console.log(uservalid, 'valid user');
          // console.log(passvalid, 'valid password');
        } else {
          setpassvalid(true);
        }
      }
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: '3%',
          justifyContent: 'center',
        }}>
        <Image
          style={{alignSelf: 'center', width: 250, height: 80}}
          source={require('../assets/img/instagram-new.webp')}
        />
        <TextInput
          onChangeText={username => setusername(username)}
          placeholder="Phone Number, username, or Email"
          style={[
            styles.input,
            {
              marginTop: '10%',
              backgroundColor: '#F1F6F9',
              borderColor: uservalid ? 'red' : '#AAAAAA',
            },
          ]}
        />
        {uservalid ? (
          <View>
            <View>
              <Text style={{color: 'red'}}>Invalid Username</Text>
            </View>
          </View>
        ) : null}

        <View
          style={[
            styles.input,
            {
              flexDirection: 'row',
              backgroundColor: '#F1F6F9',
              borderColor: passvalid ? 'red' : '#AAAAAA',
            },
          ]}>
          <View style={{flex: 0.9, justifyContent: 'center'}}>
            <TextInput
              secureTextEntry={visible}
              placeholder="Password"
              onChangeText={password => setpassword(password)}
            />
          </View>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => setvisible(!visible)}>
              <Image
                style={{height: 23, width: 23}}
                source={
                  visible
                    ? require('../assets/img/hidden.png')
                    : require('../assets/img/view.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {passvalid ? (
          <View>
            <View>
              <Text style={{color: 'red'}}>Invalid password</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginBottom: '7%'}}
          onPress={() => navigation.navigate('Forgot')}>
          <Text style={{fontWeight: 'bold', color: '#0079FF'}}>
            Forgotten Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => validation(username, password)}
          style={{
            borderWidth: 0.5,
            borderColor: '#AAAAAA',
            borderRadius: 6,
            minWidth: '100%',

            backgroundColor: '#30A2FF',
            justifyContent: 'center',
            marginBottom: '10%',
            padding: '2%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Log In
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '1%',
            paddingRight: '1%',
            marginBottom: '10%',
          }}>
          <View
            style={{
              borderTopWidth: 0.5,
              flex: 0.5,
              flexDirection: 'row',
              borderColor: '#AAAAAA',
            }}></View>

          <View style={{flex: 0.1}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#AAAAAA',
                fontWeight: 'bold',
              }}>
              OR
            </Text>
          </View>

          <View
            style={{
              borderTopWidth: 0.5,
              flex: 0.5,
              flexDirection: 'row',
              borderColor: '#AAAAAA',
            }}></View>
        </View>

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/img/facebook.png')}
            />
            <Text
              style={{
                color: '#0079FF',
                fontWeight: 'bold',
                marginLeft: '5%',
                alignSelf: 'center',
              }}>
              Log in with Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',

          paddingBottom: '2%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#AAAAAA'}}>Don't Have an account? </Text>
          <TouchableOpacity>
            <Text style={{color: '#0079FF', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderWidth: 0.5,
    minWidth: '100%',
    margin: '2%',
    borderRadius: 6,

    padding: Platform.OS === 'ios' ? '2%' : null,

    // borderColor: '#AAAAAA',

    minHeight: 40,
  },
});
export default Login;
