// Importa pacotes essenciais do React e React Native
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

// Importa a navegação (React Navigation)
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa as telas do app
import CatalogScreen from "./screens/catalogo";
import DetailsScreen from "./screens/DetalhesCamisa";

// Cria a pilha de navegação
const Stack = createNativeStackNavigator();

export default function App() {
  // Estados do login
  const [usuario, setUsuario] = useState(""); // guarda usuário digitado
  const [senha, setSenha] = useState("");     // guarda senha digitada
  const [logado, setLogado] = useState(false); // controla se usuário fez login
  const [loading, setLoading] = useState(false); // mostra indicador de carregamento
  const [erroModal, setErroModal] = useState(false); // controla exibição do modal de erro

  // Função para validar login
  const handleLogin = () => {
    // Se o usuário não digitou nada
    if (!usuario.trim()) {
      setErroModal(true); // abre o modal pedindo preenchimento
      return;
    }

    setLoading(true); // ativa o "loading" (ActivityIndicator)
    // Simula um delay de login (1,5 segundos)
    setTimeout(() => {
      setLoading(false); // desliga o loading
      if (usuario === "aluno" && senha === "123") {
        // Login válido
        Alert.alert("Sucesso 🎉", "Login realizado com sucesso!");
        setLogado(true); // libera acesso ao app
      } else {
        // Login inválido
        Alert.alert("Erro ❌", "Usuário ou senha incorretos.");
      }
    }, 1500);
  };

  // Se o usuário ainda não está logado → exibe tela de login
  if (!logado) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Formulário de login */}
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text style={styles.titulo}>Time de Craques ⚽</Text>

          {/* Campo Usuário */}
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
          />

          {/* Campo Senha */}
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {/* Botão de login */}
          <Pressable style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </Pressable>

          {/* Indicador de carregamento (spinner) */}
          {loading && <ActivityIndicator size="large" color="#6200ee" />}
        </KeyboardAvoidingView>

        {/* Modal de erro para usuário em branco */}
        <Modal visible={erroModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 16, marginBottom: 12 }}>
                Por favor, preencha o usuário.
              </Text>
              <TouchableOpacity
                style={styles.fecharBotao}
                onPress={() => setErroModal(false)} // fecha modal
              >
                <Text style={{ color: "#fff" }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Se logado → mostra a navegação entre catálogo e detalhes
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

// Pega a largura da tela para ajustar o formulário
const largura = Dimensions.get("window").width;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center",     // centraliza horizontalmente
    backgroundColor: "#f4f4f4",
    padding: 20
  },
  form: {
    width: largura * 0.9, // 90% da largura da tela
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
    backgroundColor: "rgba(0,0,0,0.5)" // fundo transparente escuro
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