import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export default function CamisaItem({ camisa, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{ uri: camisa.image }} style={styles.imagem} />
      <Text style={styles.nome}>{camisa.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: "contain"
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
