import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Text, View, FlatList, ActivityIndicator} from 'react-native';
// https://randomuser.me/api/?page=3&results=10
export default function App() {
  const [users, setUsers] = useState([])
  const getPeople = () => {
    axios.get('https://randomuser.me/api/?page=3&results=10')
    .then(response => {
      setUsers(response.data.results)

    })
  }
  const loadMoreUsers = () => {
    console.log("more items loaded")
  }
  renderLoader = () => {
    return ( 
      <View>
      <ActivityIndicator size ="large" color="green" />
      </View>
    )

  }
renderItem = ({item}) => {
<View style ={{flexDirection:'row'}}>
  <Image style={{heigh:50 , width:50}} source ={{uri: item.picture.large}}/> 
  <Text>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
</View>
}
  useEffect(() => {
   getPeople()
  }, [])
  return (
   <FlatList 
   data = {users}
   renderItem = {renderItem}
   keyExtractor = {item => item.email}
   ListFooterComponent={renderLoader}
   onEndReached = {loadMoreUsers}
   onEndReachedThreshold={0.5}
   />
  );
}

