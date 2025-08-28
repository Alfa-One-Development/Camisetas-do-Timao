//----- IMPORTAÇÕES -----
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//----- COMPONENTE PRINCIPAL -----
export default function TelaListaDesejos({ navigation }) {
  // Estado que armazena a lista de desejos
  const [listaDesejos, setListaDesejos] = useState([]);

  //----- CARREGAR LISTA DESEJOS -----
  const carregarListaDesejos = async () => {
    const salvo = await AsyncStorage.getItem("wishlist"); // Busca dados salvos
    if (salvo) setListaDesejos(JSON.parse(salvo)); // Converte JSON e atualiza estado
  };

  // useEffect para rodar quando o componente é montado e quando a tela ganha foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarListaDesejos);
    carregarListaDesejos(); // Carrega na primeira vez
    return unsubscribe; // Remove listener ao desmontar
  }, [navigation]);

  //----- REMOVER ITEM -----
  const removerDaListaDesejos = async (id) => {
    const atualizado = listaDesejos.filter((item) => item.id !== id); // Remove item pelo ID
    setListaDesejos(atualizado); // Atualiza estado
    await AsyncStorage.setItem("wishlist", JSON.stringify(atualizado)); // Salva atualização
  };

  //----- CONFIRMAR REMOÇÃO -----
  const confirmarRemocao = (id, nome) => {
    Alert.alert(
      "Remover",
      `Remover "${nome}" da sua lista de desejos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removerDaListaDesejos(id),
        },
      ],
      { cancelable: true }
    );
  };

  //----- RENDER -----
  return (
    <View style={styles.container}>
      {listaDesejos.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.vazio}>Sua lista está vazia 😢</Text>
        </View>
      ) : (
        <FlatList
          data={listaDesejos} // Usa a lista de desejos
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Details", { camisa: item })}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.imagem} />
              ) : (
                <View style={[styles.imagem, styles.imagemPlaceholder]}>
                  <Text>📷</Text>
                </View>
              )}

              <View style={styles.info}>
                <Text style={styles.nome}>{item.name}</Text>
                <Text style={styles.preco}>{item.preco}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => confirmarRemocao(item.id, item.name)}
                >
                  <Text style={styles.textoRemover}>Remover</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

//----- ESTILOS -----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  vazio: { fontSize: 16, color: "#666" },
  list: { padding: 12 },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  imagem: { width: 70, height: 70, borderRadius: 8, backgroundColor: "#eee" },
  imagemPlaceholder: { justifyContent: "center", alignItems: "center" },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  preco: { fontSize: 14, color: "#28A745" },
  actions: { marginLeft: 8 },
  botaoRemover: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
  },
  textoRemover: { color: "#fff", fontWeight: "600" },
});
