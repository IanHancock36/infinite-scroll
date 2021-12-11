import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Text, View, FlatList, ActivityIndicator} from 'react-native';
// https://randomuser.me/api/?page=3&results=10
export default function App() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [loading , setLoading] = useState(false)
   const getPeople = () => {
     setLoading(true)
    axios.get(`https://randomuser.me/api/?page=${page}&results=10`)
    .then(response => {
      // setUsers(response.data.results)
      // now spread the new users and add to flatlist data
      setUsers([...users, response.data.results])
    setLoading(false)
    })
  }
  const loadMoreUsers = () => {
    console.log("more items loaded")
    setPage(page+1)

  }
  renderLoader = () => {
    return ( 
      loading ? 
      <View>
      <ActivityIndicator size ="large" color="green" />
      </View> : null 
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
  }, [page])
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

