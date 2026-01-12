// import 'react-native-gesture-handler';
// import { StyleSheet, Text, View, ScrollView, Alert, TextInput, Image, ImageBackground, TouchableOpacity, Button} from 'react-native';
// // import React, { useState } from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack'; 


// function HomeScreen({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>
//       <View>
//         <Text>Welcome to the Home Screen!</Text>
//         <Button title='Go to Profile' style={styles.button} onPress={() => navigation.navigate('Profile')} />
//       </View>
//     </View>
//   );
// }

// function Profile ({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       <ScrollView>
//       <View>
//         <ScrollView horizontal={true}>
//         <Image style={styles.image} source={require('./assets/bird.jpg')} />
//         <Image style={styles.image} source={require('./assets/tree.jpg')} />
//         </ScrollView>
//       </View>
//       <View>
//         <Text>Welcome to the Profile Screen!</Text>
//         <Button title='Go to Home' style={styles.button} onPress={() => navigation.navigate('HomeScreen')} />
//       </View>
//       </ScrollView>
//     </View>
//   );
// }


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="Profile" component={Profile} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 50,
//     color: 'black',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   button: {
//     marginTop: 10,
//     marginBottom: 10,
//     height: 200,
//     width: 500,
//     backgroundColor: 'red',
//     color: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image:{
//     width: 300,
//     height: 200,
//     resizeMode: 'contain',
//   }
// });


import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ScrollView, Alert, TextInput, Image, ImageBackground, TouchableOpacity, Button} from 'react-native';
import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack'; 
import {db, auth} from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore'; 

export default function App() {
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async () => {
    if (!name || !rollno || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        FullName: name,
        RollNumber: rollno,
        Email: email,
        createdAt: new Date(),
      });
      Alert.alert("Sucess", "User registered successfully!");
    }catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const handleDelete = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
        await deleteDoc(doc(db, "users", user.uid));
        Alert.alert("Success", "User data deleted successfully!");
        }catch (error) {
          Alert.alert("Error","There was an error deleting the user data: " + error.message);
        }
      } else {
        Alert.alert("Error", "No user is currently signed in.");
      };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollno}
        onChangeText={text => setRollno(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Text></Text>
      <Button title="Sign Up" onPress={handleSignIn} />
      <Text></Text>
      <Button title="Delete User Data" onPress={handleDelete} style={{color: "red"}} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    height: 200,
    width: 500,
    backgroundColor: 'red',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyBnsiVt9hLYA4iB4k2DBqblPMTzjBNq0vQ",
//   authDomain: "testapp-51c3c.firebaseapp.com",
//   projectId: "testapp-51c3c",
//   storageBucket: "testapp-51c3c.firebasestorage.app",
//   messagingSenderId: "928002592446",
//   appId: "1:928002592446:web:4ee778e5f1e282c0f018ef",
//   measurementId: "G-H8PF2Q2CX2"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = initializeAuth(app, {
//     persistence:
//     getReactNativePersistence(ReactNativeAsyncStorage)
// });
// export const db = getFirestore(app);




// const { getDefaultConfig } = require('expo/metro-config');
// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);
// config.resolver.sourceExts.push('mjs');
// module.exports = config;



