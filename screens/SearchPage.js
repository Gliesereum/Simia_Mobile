import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RenderTextField } from '../components/RenderField';
import SearchCard from '../components/SearchCard';
import Actions from '../constants/actions/Actions';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

export default function RoomsPage({ navigation }) {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);

  let list;
  if (typeof search.users === 'object') {
    list = search.users.map(user => user);
  } else {
    list = [];
  }

  const searchHandler = text => dispatch({ type: Actions.SEARCH, search: text });

  const createRoom = (userID) => {
    dispatch({ type: Actions.CREATE_ROOM, counterpart: userID });
    navigation.navigate('AppModal');
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <Icon name="search" color={theme.COLOR.secondary} size={32} />
        <RenderTextField
          keyboardType="default"
          label={null}
          input={{
            onChange: searchHandler,
            inputStyle: {
              borderWidth: 1,
              borderRadius: 5,
            },
          }}
          containerStyles={{ width: width * 0.8 }}
        />
      </View>
      <FlatList
        style={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <SearchCard
              user={item}
              createRoom={createRoom}
            />
          )
        }}
        keyExtractor={user => user._id}
        data={list}
      />
    </>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: theme.COLOR.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listContainer: {
    width: width,
    paddingVertical: 8,
  },
});
