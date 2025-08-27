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
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CatalogScreen from "./screens/CatalogoLoja";
import DetailsScreen from "./screens/DetalhesCamisa";

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroModal, setErroModal] = useState(false);

// Função chamada ao pressionar o botão "Entrar"
const handleLogin = () => {
  // 🔸 Verifica se o campo "usuario" está vazio ou só com espaços
  if (!usuario.trim()) {
    setErroModal(true); // mostra o modal de erro
    return;             // interrompe a execução da função
  }

  // Ativa o indicador de loading
  setLoading(true);

  // Simula uma requisição assíncrona (ex: API) usando setTimeout
  setTimeout(() => {
    setLoading(false); // desativa o loading

    // Verifica se usuário e senha estão corretos
    if (usuario === "aluno" && senha === "123") {
      Alert.alert("Sucesso 🎉", "Login realizado com sucesso!"); // alerta de sucesso
      setLogado(true); // atualiza estado para logado
    } else {
      Alert.alert("Erro ❌", "Usuário ou senha incorretos.");   // alerta de erro
    }
  }, 1500); // simula 1,5 segundos de espera
};

// Se o usuário ainda não estiver logado, renderiza o formulário de login
if (!logado) {
  return (
    <SafeAreaView style={styles.container}> // container principal da tela de login
  {/* Ajusta o conteúdo para não ficar atrás da barra de status */}
  <StatusBar barStyle="dark-content" />

  {/* Evita que o teclado cubra os campos de input */}
  <KeyboardAvoidingView behavior="padding" style={styles.form}>

    {/* Título do login */}
    <Text style={styles.titulo}>Time de Craques ⚽</Text>

    {/* Campo de usuário */}
    <TextInput
      style={styles.input}          // estilo do input
      placeholder="Usuário"         // texto placeholder
      value={usuario}               // valor do input (estado)
      onChangeText={setUsuario}     // atualiza o estado ao digitar
    />

    {/* Campo de senha */}
    <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry               // esconde os caracteres da senha
      value={senha}
      onChangeText={setSenha}
    />

    {/* Botão de login */}
    <Pressable style={styles.botao} onPress={handleLogin}>
      <Text style={styles.textoBotao}>Entrar</Text>
    </Pressable>

    {/* Spinner de loading enquanto verifica login */}
    {loading && <ActivityIndicator size="large" color="#6200ee" />}
  </KeyboardAvoidingView>

  {/* Modal que aparece quando o usuário não preenche o campo */}
  <Modal visible={erroModal} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>

        {/* Mensagem de erro */}
        <Text style={{ fontSize: 16, marginBottom: 12 }}>
          Por favor, preencha o usuário.
        </Text>

        {/* Botão para fechar o modal */}
        <TouchableOpacity
          style={styles.fecharBotao}
          onPress={() => setErroModal(false)} // fecha o modal
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
    padding: 20,
  },
  form: {
    width: largura * 0.9,
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
