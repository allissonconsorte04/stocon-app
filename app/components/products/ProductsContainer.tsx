import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";

interface ProductsContainerProps {
  currentDate: string;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({ currentDate }) => {
  return (
    <View style={styles.productsContainer}>
      <View style={styles.menuTitle}>
        <View>
          <Text>Produtos</Text>
        </View>
        <View>
          <Ionicons name="search-outline" size={25} />
        </View>
      </View>
      <View style={styles.divider}></View>
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    width: "100%",
    height: "100%",
    padding: 16,
    display: "flex",
  },
  menuTitle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    height: "0.5%",
    width: "15%",
    borderRadius: 16,
    backgroundColor: "#FFAE54",
  },
});

export default ProductsContainer;
