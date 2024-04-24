import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";
import ProductsContainer from "../../components/products/ProductsContainer";

const Products: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const newDate = () => {
      return new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    };

    setCurrentDate(newDate());
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
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
        <ProductsContainer currentDate={currentDate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  headerProfile: {
    width: "100%",
    height: "28%",
  },
  profileImage: {
    height: "100%",
    width: "100%",
    padding: 16,
    paddingTop: "16%",
  },
  name: {
    fontSize: 20,
    paddingVertical: 16,
  },
  date: {
    fontSize: 16,
  },
});

export default Products;
