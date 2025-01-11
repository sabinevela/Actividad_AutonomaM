import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import RestablecerScreen from "../Screens/RestablecerScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import GaleriaScreen from "../Screens/GaleriaScreen";
import CamaraScreen from "../Screens/CamaraScreen";


const Stack= createStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack(){
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Login" component={ LoginScreen} 
            options={()=> ({headerShown: false})}/>
            <Stack.Screen name="Registro" component={ RegisterScreen} />
            <Stack.Screen name="Welcome" component={ MyTab} />
            <Stack.Screen name='Restablecer' component={ RestablecerScreen}/>
        </Stack.Navigator>
    )
} 

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={ WelcomeScreen}/>
            <Tab.Screen name='Galeria' component={ GaleriaScreen}/>
            <Tab.Screen name= 'Camara' component={ CamaraScreen}/>
        </Tab.Navigator> )
        
    
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}