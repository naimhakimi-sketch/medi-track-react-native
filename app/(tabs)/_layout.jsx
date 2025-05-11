import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {

    const router=useRouter();

    useEffect(()=>{
        GetUserDetails();
    },[])
    
    const GetUserDetails=async()=>{
        const userInfo= await getLocalStorage('userDetail');
        if(!userInfo){
            router.replace('/login');
        }
    }
  


  return (
    <Tabs screenOptions={{
        headerShown:false
    }}>
        <Tabs.Screen name='index'
            options={{
                tabBarLabel:'Home',
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="home" size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen name='AddNew'
            options={{
                tabBarLabel:'Add New',
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="plus-square" size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen name='Profile'
            options={{
                tabBarLabel:'Profile',
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="user" size={size} color={color} />
                )
            }}
        />
    </Tabs>
  )
}