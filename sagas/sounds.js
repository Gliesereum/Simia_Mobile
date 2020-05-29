import { call } from 'redux-saga/effects';
import Sound from 'react-native-sound';

let ring;

const stopRinging = () => {
  if (ring) {
    ring.stop();
    ring = null;
  }
};

const startRinging = () => {
  stopRinging();
  const audio = new Sound('ring.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound ring', error);
      return;
    }
    audio.setNumberOfLoops(-1);
    ring = audio;

    ring.play();
  });
};

export function* ringSaga() {
  yield call(startRinging);
}

export function* stopSaga() {
  yield call(stopRinging);
}
