import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./src/components/home";
import Reposito from "./src/components/reposito";

const Stack = createNativeStackNavigator();

export default function App() {
  return (


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="repositories" component={Reposito} />
      </Stack.Navigator>
    </NavigationContainer>


  )

}
