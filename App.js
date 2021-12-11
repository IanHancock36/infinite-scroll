import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios'
import { Text, View } from 'react-native';
// https://randomuser.me/api/?page=3&results=10
export default function App() {
  const [users, setUsers] = useState([])
  const getPeople = () => {
    axios.get('https://randomuser.me/api/?page=3&results=10')
    .then(response => {
      setUsers(response.data.results)

    })
  }
renderItem = ({item}) => {
<View>
  <Image source ={{uri: item.picture.large}}/> 
  <Text>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
</View>
}
  useEffect(() => {
   getUsers()
  }, [])
  return (
   <Flatlist 
   data = {users}
   renderItem = {renderItem}
   />
  );
}

