import React from "react";
import { Button } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Products from "./app/screens/products/Products";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Importe o pacote de ícones que você está usando

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string | undefined;

            if (route.name === "Home") {
              iconName = "home"; // Nome do ícone para a guia "Home"
            } else if (route.name === "Produto") {
              iconName = "list"; // Nome do ícone para a guia "Produto"
            } else if (route.name === "Login") {
              iconName = "log-in"; // Nome do ícone para a guia "Login"
            }

            if (iconName) {
              return <Ionicons name={iconName} size={size} color={color} />;
            } else {
              // Caso contrário, retorne null ou um ícone de fallback
              return null;
            }
          },
        })}
      >
        {authState?.authenticated ? (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
              }}
            />
            <Tab.Screen name="Produto" component={Products} />
          </>
        ) : (
          <Tab.Screen name="Login" component={Login} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
