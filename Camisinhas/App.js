// Importações básicas do React e React Native
import React, { useState } from "react"; // useState para estados
import {
  View, // Container de layout
  Text, // Para textos
  TextInput, // Campo de entrada
  Pressable, // Botão clicável
  StyleSheet, // Estilos
  Alert, // Alertas
  SafeAreaView, // Mantém conteúdo dentro da área segura
  StatusBar, // Barra de status
  ActivityIndicator, // Indicador de carregamento
  KeyboardAvoidingView, // Move campos quando teclado aparece
  Modal, // Janela modal
  TouchableOpacity, // Área clicável
  Dimensions, // Para pegar largura/altura da tela
} from "react-native";

// Importações de navegação
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas do app
import CatalogScreen from "./screens/CatalogoLoja";
import DetailsScreen from "./screens/DetalhesCamisa";
import ListaDesejos from "./screens/ListaDesejos";

// AsyncStorage para salvar dados localmente
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ========================= STACK DE NAVEGAÇÃO ========================= */

// Criação do stack navigator para navegação entre telas
const Stack = createNativeStackNavigator();

/* ========================= COMPONENTE PRINCIPAL ========================= */

export default function App() {
  // Estados para controlar os inputs e login
  const [usuario, setUsuario] = useState(""); // Input usuário
  const [senha, setSenha] = useState(""); // Input senha
  const [nome, setNome] = useState(""); // Nome do usuário
  const [logado, setLogado] = useState(false); // Se usuário está logado
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [erroModal, setErroModal] = useState(false); // Modal de erro

  /* ========================= FUNÇÃO DE LOGIN ========================= */
  const handleLogin = () => {
    // Se usuário estiver vazio, abre modal de erro
    if (!usuario.trim()) {
      setErroModal(true);
      return;
    }

    // Ativa indicador de carregamento
    setLoading(true);

    // Simula requisição ao servidor com delay
    setTimeout(() => {
      setLoading(false); // Remove loading

      // Verifica senha
      if (senha === "123") {
        Alert.alert("Sucesso 🎉", "Login realizado com sucesso!");
        AsyncStorage.setItem("nome", nome); // Salva nome localmente
        setLogado(true); // Atualiza estado de login
      } else {
        Alert.alert("Erro ❌", "Usuário ou senha incorretos.");
      }
    }, 1500);
  };

  /* ========================= LOGIN ========================= */
  if (!logado) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text style={styles.titulo}>Time de Craques ⚽</Text>

          {/* Input do usuário */}
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario} // Atualiza estado ao digitar
          />

          {/* Input da senha */}
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry // Oculta caracteres
            value={senha}
            onChangeText={setSenha}
          />

          {/* Input do nome */}
          <TextInput
            style={styles.input}
            placeholder="Nome😎"
            value={nome}
            onChangeText={setNome}
          />

          {/* Botão de login */}
          <Pressable style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </Pressable>

          {/* Indicador de carregamento */}
          {loading && <ActivityIndicator size="large" color="#6200ee" />}
        </KeyboardAvoidingView>

        {/* Modal de erro quando usuário não preenche o campo */}
        <Modal visible={erroModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 16, marginBottom: 12 }}>
                Por favor, preencha o usuário.
              </Text>
              <TouchableOpacity
                style={styles.fecharBotao}
                onPress={() => setErroModal(false)} // Fecha modal
              >
                <Text style={{ color: "#fff" }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  /* ========================= APP PRINCIPAL ========================= */
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tela de catálogo */}
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={({ navigation }) => ({
            title: "Catálogo de Camisas",
            // Botão no header que leva à wishlist
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ListaDesejos")}
              >
                <Text style={{ fontSize: 20 }}>❤</Text>
              </TouchableOpacity>
            ),
          })}
        />

        {/* Tela de detalhes da camisa */}
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalhes da Camisa" }}
        />

        {/* Tela de wishlist */}
        <Stack.Screen
          name="ListaDesejos"
          component={ListaDesejos}
          options={{ title: "Lista de Desejos 💖" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ========================= DIMENSÕES ========================= */

// Pega largura da tela do dispositivo para usar nos inputs
const largura = Dimensions.get("window").width;

/* ========================= ESTILOS ========================= */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda tela
    justifyContent: "center", // Centraliza vertical
    alignItems: "center", // Centraliza horizontal
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  form: {
    width: largura * 0.9, // Largura relativa à tela
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  botao: {
    backgroundColor: "#6200ee",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo semitransparente
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  fecharBotao: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 6,
  },
});
