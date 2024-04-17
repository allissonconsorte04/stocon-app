import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home";
import Products from "../screens/products/Products";

const Tab = createBottomTabNavigator();

function TabGroup () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Produto" component={Products} />
    </Tab.Navigator>
  )
}

export default function BottomNavbar() {
  return (
      <TabGroup />
  );
}