import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RenderTextField } from '../components/RenderField';
import Actions from '../constants/actions/Actions';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

export default function SearchPage({}) {
  const dispatch = useDispatch();

  const search = text => dispatch({ type: Actions.SEARCH, search: text });

  return (
    <>
      <View style={styles.searchContainer}>
        <Icon name="search" color={theme.COLOR.secondary} size={32} />
        <RenderTextField
          keyboardType="default"
          label={null}
          input={{
            onChange: search,
            inputStyle: {
              borderWidth: 1,
              borderRadius: 5,
            },
            // onFocus: () => setIsFocused(!isFocused), TODO: this one must be finished
          }}
          containerStyles={{ width: width * 0.8 }}
        />
      </View>
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
});
