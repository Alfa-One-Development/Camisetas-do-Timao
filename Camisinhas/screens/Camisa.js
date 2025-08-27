// Importa componentes do React Native
import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

// Componente que representa uma "camisa" individual na lista
// Recebe como props: os dados da camisa e a função onPress (quando clicar no item)
export default function CamisaItem({ camisa, onPress }) {
  return (
    // TouchableOpacity: botão que pode ser clicado (com efeito de opacidade)
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {/* Exibe a imagem da camisa */}
      <Image source={{ uri: camisa.image }} style={styles.imagem} />
      {/* Exibe o nome da camisa */}
      <Text style={styles.nome}>{camisa.name}</Text>
    </TouchableOpacity>
  );
}

// Estilos do item
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",   // fundo branco
    padding: 10,               // espaçamento interno
    marginVertical: 8,         // margem entre os itens
    borderRadius: 8,           // bordas arredondadas
    alignItems: "center",      // centraliza conteúdo no eixo horizontal
    shadowColor: "#000",       // sombra (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2               // sombra (Android)
  },
  imagem: {
    width: 100,                // largura da imagem
    height: 100,               // altura da imagem
    marginBottom: 8,           // espaço abaixo da imagem
    resizeMode: "contain"      // mantém a proporção da imagem sem cortar
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold"         // deixa o texto em negrito
  }
});
