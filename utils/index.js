import Actions from '../constants/actions/Actions';

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

export { rtcCall };
