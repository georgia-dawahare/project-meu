import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet,
} from 'react-native';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchButton = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 15,
          padding: 10,
          marginBottom: 10,
          marginTop: 24,
          width: 250,
          marginLeft: 16,
        }}
        placeholder="Search a question."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearchButton} color="#E62B85" fontsize="0.8" />
      </View>

    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 24,
    marginRight: 24,

  },
  button: {
    marginRight: 16,

  },
  buttonContainer: {
    marginRight: 24,
    marginTop: 10,
    fontsize: 0.8,
  },
});
