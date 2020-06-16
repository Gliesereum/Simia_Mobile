import Actions from '../constants/actions/Actions';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const rtcCall = ({
  room,
  status,
  other,
  video,
  audio,
  dispatch,
}) => {
  if (room.isGroup) {
    return dispatch({ type: Actions.RTC_ROOM_CREATE, group: room, users: [...room.people], video, audio });
  } else if (status.online.includes(other._id) || status.away.includes(other._id)) {
    return dispatch({ type: Actions.RTC_ROOM_CREATE, users: [other], video, audio });
  } else if (status.busy.includes(other._id)) {
    console.log('User is busy.')
    return 'User is busy.';
  } else if (!status.busy.includes(other._id) && !status.away.includes(other._id) && !status.online.includes(other._id)) {
    console.log('User is offline.')
    return 'User is offline.';
  } else {
    console.log('User can not receive calls.');
    return 'User can not receive calls.';
  }
};

const prepareDeviceToken = async (username) => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    await getToken(username);
  } else {
    await requestPermission(username);
  }
};

const getToken = async (username) => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  let isTokenExistInCollectionOfUsers = false;
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      await firestore()
        .collection('users')
        .where('deviceToken', '==', fcmToken)
        .where('username', '==', username)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) =>
            isTokenExistInCollectionOfUsers = true
          );
        })
        .catch(error => consol.log('Document error', error));
    }
  } else {
    await firestore()
      .collection('users')
      .where('deviceToken', '==', fcmToken)
      .where('username', '==', username)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) =>
          isTokenExistInCollectionOfUsers = true
        );
      })
      .catch(error => consol.log('Document error', error));
  }

  if (fcmToken && !isTokenExistInCollectionOfUsers) {
    await firestore()
      .collection('users')
      .add({
        username: username,
        deviceToken: fcmToken,
      });
  }
};

const requestPermission = async (username) => {
  try {
    await messaging().requestPermission();
    await getToken(username);
  } catch (e) {
    console.log('permission rejected');
  }
};

const findUserToken = async (username) => {
  let otherDeviceToken = null;
  await firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) =>
        otherDeviceToken = doc.data().deviceToken
      );
    })
    .catch(error => consol.log('User with this username not exist', error));
  return otherDeviceToken;
};

const sendPush = async (toToken, data = {}) => {
  if (!toToken) return;

  const FIREBASE_API_KEY = "AAAAJ2t4iEY:APA91bFXItLjAs7RWMqOiecF96Crr0Bq-Y6MCz1fWPV9ZVOc4aXoTmAfi1MvhJLxddMmOn3Niqoj_J_LfZkhjKePBUEm0Q7gQzW09tZKs_tgQ2s6BVlauTlIRb_b4di9vgj-J8eSdtgl";

  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": `key=${FIREBASE_API_KEY}`,
  });
  const message = {
    to: toToken,
    data: {
      fromUser: data.username,
    },
    contentAvailable: true,
    priority: 'high',
  };

  let response = await fetch("https://fcm.googleapis.com/fcm/send",{
    method: "POST",
    headers,
    body: JSON.stringify(message),
  });

  if (response.status === 400) {
    response = await response.text();
    console.log('send FCM message (error)', response)
  } else {
    response = await response.json();
    console.log('send FCM message (error)', response)
  }
};

const subscribeOnMessage = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  return unsubscribe;
};

export {
  rtcCall,
  prepareDeviceToken,
  findUserToken,
  sendPush,
  subscribeOnMessage,
};
