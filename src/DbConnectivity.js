import FileViewer from 'react-native-file-viewer';

import RNFetchBlob from 'rn-fetch-blob';
import SQLite, {openDatabase} from 'react-native-sqlite-storage';

import RNFS from 'react-native-fs';

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

connectionHandle();

export default dbmaster;
