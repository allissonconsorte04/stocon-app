import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLabel}>
        <Text style={styles.label}>{"Entrar"}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, isEmailFocused && styles.inputFocused]}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          value={email}
        />
        <TextInput
          style={[styles.input, isPasswordFocused && styles.inputFocused]}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          value={password}
        />
        <TouchableOpacity
          onPress={login}
          style={styles.loginButton} // Aplica o estilo do botão
        >
          <Text style={styles.loginButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  form: {
    gap: 10,
    width: "80%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#ffff",
    borderColor: '#DEE0E2'
  },
  container: {
    alignItems: "center",
    justifyContent: 'center',
    height: '80%',
    width: "100%",
  },
  label: {
    fontSize: 24,
    alignContent: "flex-start",
    display: "flex",
  },
  containerLabel: {
    gap: 24,
    alignItems: 'flex-start',
    width: '80%',
    paddingVertical: 24
  },
  inputFocused: {
    borderColor: '#01746F'
  },
  loginButton: {
    backgroundColor: '#01746F',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
