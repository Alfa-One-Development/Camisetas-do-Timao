import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

//  Componente que representa UM item de camisa no catálogo
export default function CamisaItem({ camisa, onPress }) {
  return (
    //  Botão que envolve o item (permite clicar para ver detalhes)
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {/*  Imagem da camisa */}
      <Image source={{ uri: camisa.image }} style={styles.imagem} />

      {/*  Nome da camisa */}
      <Text style={styles.nome}>{camisa.name}</Text>
    </TouchableOpacity>
  );
}

// 🎨 Estilos para o layout do item
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff", // fundo branco
    padding: 10,             // espaçamento interno
    marginVertical: 8,       // espaçamento entre os itens
    borderRadius: 8,         // cantos arredondados
    alignItems: "center",    // centraliza conteúdo
    shadowColor: "#000",     // sombra (iOS)
    shadowOpacity: 0.1,      // transparência da sombra
    shadowRadius: 5,         // tamanho da sombra
    elevation: 2,            // sombra (Android)
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: "contain", // mantém a proporção da imagem
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold", // deixa o texto mais forte
  }
});
