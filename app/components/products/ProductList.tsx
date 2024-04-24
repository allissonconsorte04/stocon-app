import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL, useAuth } from "../../context/AuthContext";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  measurement: string;
}

const ProductList: React.FC = () => {
  const { authState } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log('authState >> ', authState)
    if (!authState?.token) return;
    axios
      .get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((response) => {
        console.log('responsavel > > ', response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [authState?.token]);

  return (
    <View style={styles.productList}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfos}>
            <Text style={{ fontSize: 16 }}>{product.name}</Text>
            <Text>{parseFloat(product.price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
          </View>
          <View style={styles.productQuantity}>
            <Text>{product.quantity} {product.measurement}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productList: {
    marginVertical: "4%",
    marginBottom: 100
  },
  productCard: {
    backgroundColor: "#D1ECFF",
    marginVertical: "5%",
    height: 88,
    borderRadius: 16,
    padding: "3%",
    paddingHorizontal: "7%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productQuantity: {
    justifyContent: "center",
  },
  productInfos: {
    justifyContent: "space-around",
  },
});

export default ProductList;
