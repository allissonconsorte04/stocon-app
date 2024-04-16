import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

function TabGroup () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}

export default function BottomNavbar() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}