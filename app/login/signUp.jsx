import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { setLocalStorage } from '../../service/Storage';
import { auth } from './../../config/FirebaseConfig';

export default function SignUp() {
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [userName, setUserName]=useState();

  const OnCreateAccount=()=>{

    if(!email||!password||!userName){
        ToastAndroid.show('Please fill all details', ToastAndroid.BOTTOM);
        Alert.alert('Please Enter email and Password')
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        // Signed up 
        const user = userCredential.user;
        await updateProfile(user,{
          displayName:userName
        })

        await setLocalStorage('userDetail',user);

        console.log(user);
        router.replace('(tabs)');
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        ToastAndroid.show(errorCode, ToastAndroid.BOTTOM);
        if(errorCode=='auth/email-already-in-use')
        {   
            ToastAndroid.show('Email already exist', ToastAndroid.BOTTOM);
            Alert.alert('Email already exist');
        }
        // ..
    });
  }

    return (
      <View style={{
        padding: 25
      }}>
        <Text style={style?.textHeader}>Create New Account</Text>

        <View style={{
          marginTop: 25
        }}>
          <Text>Full Name</Text>
          <TextInput placeholder='Full Name' style={style.textInput}
          onChangeText={(value)=>setUserName(value)}
          />
        </View>

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
            onPress={OnCreateAccount}
        >
          <Text style={{
            fontSize: 17,
            color: 'white',
            textAlign: 'center'
          }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonCreate}
          onPress={()=>router.push('login/signIn')}
        >
          <Text style={{
            fontSize: 17,
            color: Colors.PRIMARY,
            textAlign: 'center'
          }}>Already have an account? Sign In instead</Text>
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