import { useState,useEffect } from 'react';
import {
  Text,FlatList,StyleSheet, ScrollView,View, TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();



function HomeScreen() {
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    fetch("http://10.88.9.82:8080/fruits")
    .then(Response => Response.json())
    .then((reponseJson) => {
      console.log('getting data from fetch',reponseJson);
      setFruits(reponseJson);
    })
    .catch(error => console.log(error));
  }, [])



  const printElement = ({item}) => {
    return(
      <ScrollView style={styles.container}>
          <Text style={styles.textApi}>El id es: {item.id}</Text>
          <Text style={styles.textApi}>El nombre es: {item.name}</Text>
          <Text style={styles.textApi}>El precio es: {item.price} euros</Text>
      </ScrollView>
    )
  }

return(
      <FlatList
        data={fruits}
        renderItem = {printElement}
      
      />
  )
}


function subirFrutaScreen() {
  return(
    <View>
      <TouchableOpacity style={styles.button} onPress = {() => AnyadirFrutas()}>
        <Text>Subir la fruta</Text>
      </TouchableOpacity>
    </View>
  )
}



function AnyadirFrutas() {
  let data = {
    method: 'POST',
    body: JSON.stringify({
      name: "manzana",
      price: 2
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  }
  return fetch('http://10.88.9.82:8080/fruits', data)
          .then(response => response.json())  // promise
          .catch(error => console.log(error));
  } 




function App(){
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Mercado') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'subirFrutaScreen') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        
        <Tab.Screen name="Mercado" component={HomeScreen} />
        <Tab.Screen name="Listado Frutas" component={subirFrutaScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  )



}


const styles = StyleSheet.create({
  container:{
   textAlign: 'center',
    margin: 16,
    backgroundColor: 'yellow',
    
  },
  textApi: {
    fontFamily: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'lowercase'

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})




export default App;
