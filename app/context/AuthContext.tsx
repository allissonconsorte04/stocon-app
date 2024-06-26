import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://172.18.0.1:3000/v1";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log('gravando o token ? ', token)

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
  }, []);

  const register = async (email: string, password: string) => {
    console.log("registrandoooo");
    console.log(email);
    console.log(password);
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    console.log("testeeeee");

    try {
      const result = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("result login >> ", result);

      setAuthState({
        token: result.data.auth_token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.auth_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.auth_token);

      return result;
    } catch (e) {
      console.log("error login > ", e);
      return { error: true, msg: (e as any).response.data.error };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
