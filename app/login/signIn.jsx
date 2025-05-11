import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { setLocalStorage } from '../../service/Storage';
import { auth } from './../../config/FirebaseConfig';
export default function SignIn() {

    const router=useRouter();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const OnSignInClick=()=>{

      if(!email||!password){
        ToastAndroid.show('Please enter email and Password', ToastAndroid.BOTTOM);
        console.log('Please enter email and password');
      }
      signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        await setLocalStorage('userDetail',user);
        console.log(user);

        router.replace('/(tabs)');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if(errorCode=='auth/invalid-credential'){
          ToastAndroid.show('Invalid email and password', ToastAndroid.BOTTOM);
        }
      });
    }
  return (
    <View style={{
      padding: 25
    }}>
      <Text style={style?.textHeader}>Let's Sign You In</Text>
      <Text style={style?.subText}>Welcome Back</Text>
      <Text style={style?.subText}>You've been missed</Text>

      <View style={{
        marginTop: 25
      }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={style.textInput}
          onChangeText={(value)=>setEmail(value)}
        />
      </View>
      <View style={{
        marginTop: 25
      }}>
        <Text>Password</Text>
        <TextInput placeholder='Password' 
        secureTextEntry={true}
        style={style.textInput}
        onChangeText={(value)=>setPassword(value)}
        />
      </View>

      <TouchableOpacity style={style.button}
      onPress={OnSignInClick}
      >
        <Text style={{
          fontSize: 17,
          color: 'white',
          textAlign: 'center'
        }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.buttonCreate}
        onPress={()=>router.push('login/signUp')}
      >
        <Text style={{
          fontSize: 17,
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  textHeader:{
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15
  },
  subText:{
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.GRAY
  },
  textInput:{
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white'
  },
  button:{
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 35
  },
  buttonCreate:{
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.PRIMARY
  }
})