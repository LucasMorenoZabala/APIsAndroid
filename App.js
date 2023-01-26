import { useState,useEffect } from 'react';
import {
  Text,FlatList,StyleSheet, ScrollView,View, TouchableOpacity, TextInput, Image,NativeModules
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

console.log(item);

   
   
    return(
      
      <ScrollView style={styles.container}>
          <Text style={styles.textApi}>El id es: {item.id}</Text>
          <Text style={styles.textApi}>El nombre es: {item.name}</Text>
          <Text style={styles.textApi}>El precio es: {item.price} euros</Text>
          <Image source={{uri:item.name=='manzana'?'https://comotecuidaunamanzana.eu/wp-content/uploads/elementor/thumbs/VERDE-prstxcbeo0akdr4roylsk3dmmomxbno8bgx0qdrdsw.png':item.name=='piña'?'https://www.gastronomiavasca.net/uploads/image/file/3415/w700_pi_a.jpg':item.name=='melocoton'?'https://i.blogs.es/daaeef/foto-apertura/450_1000.jpg':item.name=='uvas'?'https://efeagro.com/wp-content/uploads/2013/10/uvas.jpg':item.name=='naranjas'?'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201811/26/00118105700068____2__600x600.jpg':item.name=='kiwi'?'https://www.5aldia.es/es/wp-content/uploads/2017/09/kiwi.jpeg':item.name=='platano'?'https://www.despensa.es/documents/10180/10736/950435_G.jpg':item.name=='pera'?'https://www.efectofruta.com/images/thumbs/Pera-Limonera-0007378.jpeg':'https://www.efectofruta.com/images/thumbs/Pera-Limonera-0007378.jpeg'}}
        style={{width: 300, height: 300}}
      />
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


function SubirFrutaScreen() {
  const [TextoFruta, onChangeTextoFruta] = useState('');
  const [TextoPrecio, onChangeTextoPrecio] = useState(null);
  return(
    <View>
      <TextInput style={{height: 40, width: 250,borderWidth: 3,padding: 10, marginRight: 30,marginLeft:70, borderColor: 'gray'}}   
                onChangeText={onChangeTextoFruta}
                value={TextoFruta}
                placeholder={"Inserte la fruta que quiera añadir"}
      
      />   

      <TextInput style={{height: 40, width: 250,borderWidth: 3,padding: 10, marginRight: 30,marginLeft:70,marginTop: 16,marginBottom: 16, borderColor: 'gray'}}   
                onChangeText={onChangeTextoPrecio}
                value={TextoPrecio}
                placeholder={"Inserte el precio que quiera añadirle"}
      
      />  

      <TouchableOpacity style={styles.button} onPress = {() => AnyadirFrutas(TextoFruta,TextoPrecio)}>
        <Text>Subir la fruta</Text>
      </TouchableOpacity>
    </View>
  )
}



function AnyadirFrutas(TextoFruta,TextoPrecio) {
  let data = {
    method: 'POST',
    body: JSON.stringify({
      name:TextoFruta,
      price: TextoPrecio
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  }
  return (fetch('http://10.88.9.82:8080/fruits', data)
          .then(response => response.json())  // promise
          .catch(error => console.log(error)),
          NativeModules.DevSettings.reload());
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
        <Tab.Screen name="Listado Frutas" component={SubirFrutaScreen}/>

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

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 6,
    margin:16

    
  },
})




export default App;
