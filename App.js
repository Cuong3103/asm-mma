import React from "react";
import "./global.css";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider/index.tsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavoritesProvider } from "./FavoritesContext";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"
                    options={{
                tabBarIcon: ({ color }) => (
                  <Entypo name="home" size={24} color={color} />
                ),
              }}
      component={HomeScreen} />
      <Tab.Screen name="Favorites" 
      options={{
                        tabBarIcon: ({ color }) => (
                          <MaterialIcons name="favorite" size={24} color={color} />
                        ),
                      }}
      component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider>
      <FavoritesProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
      </FavoritesProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}


