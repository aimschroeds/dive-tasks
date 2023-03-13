import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import Styles from '../styles/Styles';

const SearchUsers = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      console.log("userList: ", users);
      return;
    }
  
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('searchable', '==', true));
    const querySnapshot = await getDocs(q);
    const userList = [];
  
    querySnapshot.forEach((doc) => {
      if (doc.data().display_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        userList.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
  
    setUsers(userList);
    
  };

  useEffect(() => {
    searchUsers();
  }, [searchTerm]);

  const renderItem = ({ item }) => {
    console.log('item.id:', item.id);
    return (
    <TouchableOpacity
      style={Styles.searchUserItem}
      onPress={() => navigation.navigate('Other Profile', { viewingUserId: item.id })}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={Styles.searchUserImage} />
      ) : (
        <MaterialCommunityIcons name="account-circle" size={48} color="gray" />
      )}
      <Text style={Styles.searchUserDisplayName}>{item.display_name}</Text>
    </TouchableOpacity>
  )};

  return (
    <View style={[Styles.container, { flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}]}>
      <TextInput
        style={[Styles.input, { alignSelf: 'stretch', marginHorizontal: 10 }]}
        placeholder="Search users"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      {searchTerm.trim() !== '' && (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={users}
        />
      )}
    </View>
  );
};

export default SearchUsers;
