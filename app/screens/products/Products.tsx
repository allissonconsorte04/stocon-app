import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";

const Products = () => {
  const [name, setName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const newDate = () => {
      return new Date().toLocaleDateString('pt-BR', {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
  
    setCurrentDate(newDate())

}, [])

  return (
    <View>
      <View style={styles.headerProfile}>
        <View style={styles.profileImage}>
          <Avatar.Image
            size={60}
            source={require("../../../assets/avatar.png")}
          />
          <Text style={styles.name}>Olá, João!</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
      </View>
        <View style={styles.productsContainer}>
          <View style={styles.menuTitle}>
            <Text>Produtos</Text>
          </View>
          <Text> O CONTEUDO</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerProfile: {
    width: "100%",
    height: "28%",
  },
  profileImage: {
    height: "100%",
    width: "100%",
    padding: 16,
    paddingTop: '16%'
  },
  name: {
    fontSize: 20,
    paddingVertical: 16
  },
  date: {
    fontSize: 16,
  },
  productsContainer: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  menuTitle: {
    backgroundColor: 'blue'
  }
});

export default Products;
