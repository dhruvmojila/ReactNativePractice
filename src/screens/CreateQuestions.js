import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const CreateQuestions = () => {
  const data = [
    // {label: 'Single Choice', value: '1'},
    // {label: 'Multiple Choice', value: '2'},
    {label: 'Rating', value: '3'},
    {label: 'Rating With Review', value: '4'},
    {label: 'Review', value: '5'},
  ];
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [question, setQuestion] = useState('');
  const [ratingMax, setRatingMax] = useState('1');

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Select Question Type
        </Text>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Question Type' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              {value !== '' ? (
                <View>
                  <TextInput
                    style={[styles.input, {textAlignVertical: 'center'}]}
                    onChangeText={setQuestion}
                    value={question}
                    placeholder="Enter your question here"
                    multiline={true}
                    scrollEnabled={false}
                  />
                  <View
                    style={[
                      styles.input,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 0,
                        paddingTop: 0,
                        width: '40%',
                      },
                    ]}>
                    <TouchableOpacity
                      style={{flex: 1.5}}
                      onPress={() => {
                        if (parseInt(ratingMax) - 1 > 0) {
                          setRatingMax(`${parseInt(ratingMax) - 1}`);
                        } else {
                          setRatingMax(`${parseInt(ratingMax)}`);
                        }
                      }}>
                      <View
                        style={{
                          backgroundColor: '#EEEEEE',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopLeftRadius: 8,
                          flex: 1,
                          borderBottomLeftRadius: 8,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                          —
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TextInput
                      style={[
                        {
                          textAlignVertical: 'center',
                          flex: 1.5,
                          padding: 16,
                          textAlign: 'center',
                        },
                      ]}
                      onChangeText={text => setRatingMax(text)}
                      value={ratingMax}
                      placeholder="Maximum rating number"
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={{flex: 1.5}}
                      onPress={() =>
                        setRatingMax(`${parseInt(ratingMax) + 1}`)
                      }>
                      <View
                        style={{
                          backgroundColor: '#EEEEEE',
                          justifyContent: 'center',
                          alignItems: 'center',

                          flex: 1,
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateQuestions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#AAAAAA',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#AAAAAA',
    padding: 16,
    paddingTop: 16,
    marginTop: 18,
  },
});
