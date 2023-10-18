import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
  Alert,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';

import RNFetchBlob from 'rn-fetch-blob';
import SQLite, {openDatabase} from 'react-native-sqlite-storage';

import RNFS from 'react-native-fs';

const AndroidDemo = () => {
  const REMOTE_IMAGE_PATH = 'http://uat.srkaycg.com/rapcsv/rapdata.db';
  // const REMOTE_IMAGE_PATH = 'https://reactjs.org/logo-og.png';

  useEffect(() => {
    // RNFS.moveFile(
    //   `${RNFetchBlob.fs.dirs.LibraryDir}/LocalDatabase/RNFetchBlobTmp_gcexw9pwlhthd894w0i0naxx`,
    //   `${RNFetchBlob.fs.dirs.LibraryDir}/LocalDatabase/rapData.db`,
    // ).then(res => console.log(res));
    // console.log(RNFS.LibraryDirectoryPath);
    RNFS.readDir(`${RNFetchBlob.fs.dirs.LibraryDir}/LocalDatabase/`).then(
      res => {
        // console.log(
        //   RNFetchBlob.fs.dirs.LibraryDir,
        //   'AE4F85AD-3A84-4E73-96F4-4F19BF87C0F8',
        // );
        res.map(x => {
          // console.log(x.isFile(), x.name, x.size, res.length);
          // RNFS.readFile(
          //   `${RNFetchBlob.fs.dirs.DocumentDir}/RNFetchBlob_tmp/${x.name}`,
          // ).then(res => {
          //   // console.log(res);
          // });
        });
      },
    );

    // console.log(RNFS.DocumentDirectoryPath, 'asdkaghsjdhkajhs');
  }, []);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (Platform.constants['Release'] >= 13) {
          downloadImage();
        } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    console.log('extttt', ext);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.DownloadDir;

    console.log('PictureDir==>', PictureDir, PictureDir + '/rapDatabase' + ext);
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        title: 'rapdata',
        path: PictureDir + '/rapDatabase' + ext,
        description: 'Database',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .progress({count: 250}, (received, total) => {
        // setSpinnerVisible(true);

        // setIsDownloading(true);
        // setPercentage(((received / total) * 100).toFixed(1));
        console.log('=============================>', (received / total) * 100);
      })
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Database Downloaded Successfully.');
        if (Platform.OS === 'ios') {
          // setPercentage(100);
          // setIsDownloading(false);
          console.log('res.path()', res.path());
          // completeDownload(downloadurl, broadcastId);
          // ReactNativeBlobUtil.ios.previewDocument(configOptions.path);
          Alert.alert('Sucess', 'File Downloaded Successfully..', [
            {text: 'OK', onPress: () => {}},

            {
              text: 'View',
              onPress: () => {
                FileViewer.open(res.path(), {
                  showOpenWithDialog: true,
                }) // absolute-path-to-my-local-file.
                  .then(() => {
                    // success
                    console.log('sucess');
                  })
                  .catch(error => {
                    // error
                    console.log('error', error);
                  });
              },
            },
            {
              text: 'Share',
              onPress: () => {
                let url = `${dirToSave}/${broadcastId}${'.db'}`;
                Share.open({url})
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    err && console.log(err);
                  });
              },
            },
          ]);
        }
      });
  };
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  var dbmaster;

  //for android
  const connectionHandle = async path => {
    console.log('connection handle');

    let exists = await RNFetchBlob.fs.exists(
      `${RNFetchBlob.fs.dirs.LibraryDir}/LocalDatabase`,
    );
    console.log('extisss==>', exists);

    dbmaster = SQLite.openDatabase(
      {
        // name: "file:///storage/emulated/0/Download/rapDatabase.db",
        name: `rapData.db`,
        location: `default`,
        createFromLocation: 1,
      },
      res => {
        console.log('Database connected!', JSON.stringify(res));
        // dbmaster = res;
      }, //on success
      error => console.log('Database error', error), //on error
    );
    console.log('dbdb==>', dbmaster);
  };

  //for ios
  // const connectionHandle = async () => {
  //   const { fs } = RNFetchBlob;
  //   let Download = fs.dirs.DownloadDir;
  //   // let temppath = `${Download}/${"Rough Dev"}/${"RNFetchBlobTmp_0rjh0134zidocpuhrxe4khd.db"}`;
  //   let temppath = `/var/mobile/Containers/Data/Application/B374D02B-F4A5-4E55-ACF1-3AFE876ACEBC/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_ytpqmu18f8hlc8df3ktq29`;

  //   console.log("temppath==>", Download + "/rapDatabase.db");

  //   let exists = await RNFetchBlob.fs.exists(
  //     "/var/mobile/Containers/Data/Application/B374D02B-F4A5-4E55-ACF1-3AFE876ACEBC/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_ytpqmu18f8hlc8df3ktq29"
  //   );
  //   console.log("extisss==>", exists);

  //   console.log("connection handle");
  //   // var dbmaster = await SQLite.openDatabase(
  //   //   {
  //   //     name: "RNFetchBlobTmp_ytpqmu18f8hlc8df3ktq29",
  //   //     location: fs.dirs.DocumentDir,
  //   //   },
  //   //   (res) => {
  //   //     console.log("Database connected!", res);
  //   //   }, //on success
  //   //   (error) => console.log("Database error", error) //on error
  //   // );

  //   dbmaster = SQLite.openDatabase({
  //     name: "RNFetchBlobTmp_ytpqmu18f8hlc8df3ktq29",
  //     location: "Library",
  //   });

  //   // RNFetchBlob.fs.ls(fs.dirs.DownloadDir).then((files) => {
  //   //   console.log("hellloooo",files,fs.dirs.DownloadDir);
  //   // });

  //   console.log("dbdb==>", dbmaster);
  // };

  const getData = () => {
    console.log('database ', dbmaster);
    try {
      dbmaster.transaction(txn => {
        console.log('txxxnnn===>', txn);
        txn.executeSql(
          'SELECT * FROM DATA_BINCMAST',
          [],
          (tex, res) => {
            for (let i = 0; i < res.rows.length; i++) {
              let resxx = res.rows.item(i);
              console.log('Updated  Data..', resxx);
            }
            // let resxx = res.rows.item(0);
            // console.log('Updated  Data..', resxx);
            // updateAllStates(res.user_name, res.user_contact, res.user_address);

            if (res.rowsAffected > 0) {
              alert('Upadted Successfully..');
            }
          },
          error => {
            console.log('errorerrorerror', error);
          },
        );
      });
      // dbmaster.executeSql(
      //   'CREATE TABLE IF NOT EXISTS Test(value TEXT NOT NULL);',
      //   [],
      //   (tex, res) => {
      //     console.log('Updated Data..', res);
      //     if (res.rowsAffected > 0) {
      //       alert('Upadted Successfully..');
      //     }
      //   },
      //   error => {
      //     console.log('errorerrorerror', error);
      //   },
      // );
    } catch (error) {
      console.log('error==>', error);
    }
  };

  const closeConnection = () => {
    dbmaster.close();

    // dbmaster.transaction(
    //   (tx) => {
    //     tx.executeSql("COMMIT", [], () => {
    //       console.log("Transaction committed.");
    //     });
    //   },
    //   (error) => {
    //     console.error("Error during transaction:", error);
    //   },
    //   () => {
    //     // After the transaction is completed or if there's an error, close the connection
    //   }
    // );
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>
          React Native Database Download
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={checkPermission}>
        <Text style={styles.text}>Download Database</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          connectionHandle();
        }}>
        <Text>connection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          getData();
        }}>
        <Text>getData</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          closeConnection();
        }}>
        <Text>Close connection</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AndroidDemo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'orange',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
});
