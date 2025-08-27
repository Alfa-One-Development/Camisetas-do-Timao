import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CatalogScreen from "./screens/catalogo";
import DetailsScreen from "./screens/DetalhesCamisa";

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroModal, setErroModal] = useState(false);

  const handleLogin = () => {
    if (!usuario.trim()) {//verifica se o usuario digitou algo
      setErroModal(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (usuario === "aluno" && senha === "123") {
        Alert.alert("Sucesso 🎉", "Login realizado com sucesso!");
        setLogado(true);
      } else {
        Alert.alert("Erro ❌", "Usuário ou senha incorretos.");//se nao for aluno e 123, ta errado
      }
    }, 1500);//tempo de carregamento do loading
  };

  if (!logado) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text style={styles.titulo}>Time de Craques ⚽</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <Pressable style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </Pressable>
          {loading && <ActivityIndicator size="large" color="#6200ee" />}
        </KeyboardAvoidingView>

        {/* Modal de erro */}
        <Modal visible={erroModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 16, marginBottom: 12 }}>
                Por favor, preencha o usuário.
              </Text>
              <TouchableOpacity
                style={styles.fecharBotao}
                onPress={() => setErroModal(false)}
              >
                <Text style={{ color: "#fff" }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ title: "Catálogo de Camisas" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalhes da Camisa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const largura = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20
  },
  form: {
    width: largura * 0.9,
    alignItems: "center"
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff"
  },
  botao: {
    backgroundColor: "#6200ee",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center"
  },
  fecharBotao: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 6
  }
});
