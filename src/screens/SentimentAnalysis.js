import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native-animatable';

import {PieChart} from 'react-native-gifted-charts';

const SentimentAnalysis = () => {
  var Sentiment = require('sentiment');
  const [text, setText] = useState('');
  const [data, setData] = useState('');
  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(false);
  const [neutral, setNeutral] = useState(false);
  const [ans, setAns] = useState();
  const [piData, setPiData] = useState([
    {value: 0, text: 0, color: 'yellow'},
    {value: 0, text: 0, color: '#177AD5'},
    {value: 0, text: 0, color: '#ED6665'},
  ]);
  const [img, setImg] = useState(
    'https://img.icons8.com/color/96/000000/happy.png',
  );
  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const submitReview = text => {
    const review = text;
    const options = {
      method: 'POST',
      body: JSON.stringify({review}),
      headers: new Headers({'Content-Type': 'application/json'}),
    };

    fetch('http://localhost:3000/api/nlp/s-analyzer', options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.overallScore > 0) {
          setAns('Positive');
        } else if (res.overallScore < 0) {
          setAns('Negative');
        } else {
          setAns('Neutral');
        }
        setPiData([
          {
            value: res.positiveTokens.length,
            text: res.positiveTokens.length,
            color: 'yellow',
          },
          {
            value: res.negativeTokens.length,
            text: res.negativeTokens.length,
            color: '#177AD5',
          },
          {
            value: res.neutralTokens.length,
            text: res.neutralTokens.length,
            color: '#ED6665',
          },
        ]);

        setData(res);
        if (res.overallScore < 0) {
          setImg('https://img.icons8.com/angry');

          //   title.style.color = 'red';
          //   outline.style.borderColor = 'red';
        }
        if (res.overallScore === 0) {
          setImg(
            'https://img.icons8.com/officel/80/000000/neutral-emoticon.png',
          );

          //   title.style.color = '#00367c';
          //   outline.style.borderColor = '#00367c';
        }
        if (res.overallScore > 0) {
          setImg('https://img.icons8.com/color/96/000000/happy.png');

          //   title.style.color = 'green';
          //   outline.style.borderColor = 'green';
        }
      })
      .catch(err => {
        console.log(err);
        // emojiSection.innerHTML = 'There was an error processing your request!';
      });
  };

  const onSentimentAnalysis = text => {
    console.log(text);
    var myHeaders = new Headers();
    myHeaders.append('apikey', 'vU4l2VFGLJt4sDwyZbu7LXH6J8Rsh1Zc');

    var raw = text;

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://api.apilayer.com/sentiment/analysis', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log(JSON.parse(result).sentiment);
        setAns(JSON.parse(result).sentiment);
        if (JSON.parse(result).sentiment === 'neutral') {
          setImg(
            'https://img.icons8.com/officel/80/000000/neutral-emoticon.png',
          );
        }
        if (JSON.parse(result).sentiment === 'positive') {
          setImg('https://img.icons8.com/color/96/000000/happy.png');
        }
        if (JSON.parse(result).sentiment === 'negative') {
          setImg('https://img.icons8.com/angry');
        }
      })

      .catch(error => console.log('error', error));
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{}}>
        <Image
          source={{uri: img}}
          style={{height: 70, width: 70, marginBottom: 28, alignSelf: 'center'}}
        />
        <TextInput
          placeholder="Enter text here"
          value={text}
          onChangeText={text => {
            setText(text);
            submitReview(text);
          }}
          style={{
            fontSize: 18,
            padding: 12,
            width: 350,
            borderColor: 'grey',
            borderWidth: 0.5,
            borderRadius: 12,
            alignSelf: 'center',
          }}
        />
        {/* <Text style={{marginTop: 12, fontSize: 24}}>{ans}</Text> */}
        {/* <Button title="Find emotion" onPress={() => onSentimentAnalysis(text)} /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: Dimensions.get('screen').width,
            marginTop: 28,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 28,
              }}>
              Sentiment
            </Text>
            <Text
              style={{
                fontWeight: '300',
                fontSize: 18,
              }}>
              {ans}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 28,
              }}>
              Confidence
            </Text>
            <Text
              style={{
                fontWeight: '300',
                fontSize: 18,
              }}>
              {data?.confidenceScore ? data?.confidenceScore : ''}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingHorizontal: 18,
          marginTop: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            setPositive(true);
            setNegative(false);
            setNeutral(false);
          }}>
          <Text
            style={{
              padding: 12,
              borderColor: 'grey',
              borderWidth: 0.7,
              borderRadius: 12,
              marginRight: 12,
            }}>
            Positive
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPositive(false);
            setNegative(true);
            setNeutral(false);
          }}>
          <Text
            style={{
              padding: 12,
              borderColor: 'grey',
              borderWidth: 0.7,
              borderRadius: 12,
              marginRight: 12,
            }}>
            Negative
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPositive(false);
            setNegative(false);
            setNeutral(true);
          }}>
          <Text
            style={{
              padding: 12,
              borderColor: 'grey',
              borderWidth: 0.7,
              borderRadius: 12,
              marginRight: 12,
            }}>
            Neutral
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 28}}>
        {data.positiveTokens && positive && (
          <FlatList
            data={data.positiveTokens}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Word
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Score
                </Text>
              </View>
            )}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {
                      data.realWords.find(res => res.corrected === item.word)[
                        'raw'
                      ]
                    }
                  </Text>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {item.score}
                  </Text>
                </View>
              );
            }}
          />
        )}
        {data.negativeTokens && negative && (
          <FlatList
            data={data.negativeTokens}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Word
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Score
                </Text>
              </View>
            )}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {
                      data.realWords.find(res => res.corrected === item.word)[
                        'raw'
                      ]
                    }
                  </Text>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {item.score}
                  </Text>
                </View>
              );
            }}
          />
        )}
        {data.neutralTokens && neutral && (
          <FlatList
            data={data.neutralTokens}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Word
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200,
                    textAlign: 'center',
                  }}>
                  Score
                </Text>
              </View>
            )}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {
                      data.realWords.find(res => res.corrected === item.word)[
                        'raw'
                      ]
                    }
                  </Text>
                  <Text style={{fontSize: 18, width: 200, textAlign: 'center'}}>
                    {item.score}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <PieChart
          data={piData}
          showText
          textColor="black"
          radius={100}
          textSize={18}
          // focusOnPress
          showValuesAsLabels
          labelsPosition="mid"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('yellow')}
            <Text style={{color: 'black'}}>Positive</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#177AD5')}
            <Text style={{color: 'black'}}>Negative</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: '#ED6665'}}>Neutral</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SentimentAnalysis;

const styles = StyleSheet.create({});
