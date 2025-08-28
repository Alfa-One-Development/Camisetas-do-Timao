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

export default function WishlistScreen({ navigation }) {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const saved = await AsyncStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadWishlist);
    loadWishlist(); // também carrega na primeira vez
    return unsubscribe;
  }, [navigation]);

  const removeFromWishlist = async (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    await AsyncStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const confirmRemove = (id, name) => {
    Alert.alert(
      "Remover",
      `Remover "${name}" da sua lista de desejos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removeFromWishlist(id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.vazio}>Sua lista está vazia 😢</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
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
                  onPress={() => confirmRemove(item.id, item.name)}
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
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
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
