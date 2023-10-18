import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

export default function DemoKeyboard() {
  const [text, setText] = useState(`
  One
  Two
  Three
  Four
  Five`);

  const [textInputHeight, setTextInputHeight] = useState(40);

  const handleTextChange = newText => {
    setText(newText);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{
              backgroundColor: '#00ffff32',
              borderWidth: 1,
              borderColor: '#0000ff',
            }}>
            <Header />
            <View style={{}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  height: Math.max(40, text.split('\n').length * 20),
                }}
                onChangeText={handleTextChange}
                value={text}
                onContentSizeChange={event => {
                  const {height} = event.nativeEvent.contentSize;
                  setTextInputHeight(Math.max(40, height));
                }}
                multiline={true}
                scrollEnabled={false}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  height: Math.max(40, text.split('\n').length * 20),
                }}
                onChangeText={handleTextChange}
                value={text}
                onContentSizeChange={event => {
                  const {height} = event.nativeEvent.contentSize;
                  setTextInputHeight(Math.max(40, height));
                }}
                multiline={true}
                scrollEnabled={false}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  height: Math.max(40, text.split('\n').length * 20),
                }}
                onChangeText={handleTextChange}
                value={text}
                onContentSizeChange={event => {
                  const {height} = event.nativeEvent.contentSize;
                  setTextInputHeight(Math.max(40, height));
                }}
                multiline={true}
                scrollEnabled={false}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  height: Math.max(40, text.split('\n').length * 20),
                }}
                onChangeText={handleTextChange}
                value={text}
                onContentSizeChange={event => {
                  const {height} = event.nativeEvent.contentSize;
                  setTextInputHeight(Math.max(40, height));
                }}
                multiline={true}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
