// Importa bibliotecas necessárias do React e React Native
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

// Componente de detalhes de uma camisa
export default function DetalhesCamisa({ route, navigation }) {
  // Recupera os dados da camisa enviados pela navegação
  const { camisa } = route.params;

  // Estado que controla a quantidade do produto selecionado
  const [quantidade, setQuantidade] = useState(1);

  return (
    // ScrollView permite rolar o conteúdo caso passe da tela
    <ScrollView style={estilos.container}>
      
      {/* Botão para voltar à tela anterior */}
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilos.textoVoltar}>{"< Voltar"}</Text>
      </TouchableOpacity>

      {/* Imagem grande da camisa */}
      <Image source={{ uri: camisa.imagem }} style={estilos.imagemGrande} />

      {/* Container com os detalhes do produto */}
      <View style={estilos.detalhesContainer}>
        <Text style={estilos.nomeProdutoGrande}>{camisa.nome}</Text>
        <Text style={estilos.categoriaProduto}>{camisa.categoria}</Text>
        <Text style={estilos.precoProdutoGrande}>{camisa.preco}</Text>

        {/* Descrição do produto */}
        <Text style={estilos.descricaoProduto}>{camisa.descricao}</Text>

        {/* Estoque e avaliação */}
        <View style={estilos.infoExtras}>
          <Text style={estilos.estoque}>Estoque: {camisa.estoque}</Text>
          <Text style={estilos.avaliacao}>⭐ {camisa.avaliacao} / 5</Text>
        </View>

        {/* Seletor de quantidade do produto */}
        <View style={estilos.seletorQuantidade}>
          <Text style={estilos.labelQuantidade}>Quantidade:</Text>

          <View style={estilos.controlesQuantidade}>
            {/* Botão para diminuir a quantidade (mínimo 1) */}
            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
            >
              <Text style={estilos.textoQuantidade}>-</Text>
            </TouchableOpacity>

            {/* Mostra a quantidade atual */}
            <Text style={estilos.numeroQuantidade}>{quantidade}</Text>

            {/* Botão para aumentar a quantidade */}
            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(quantidade + 1)}
            >
              <Text style={estilos.textoQuantidade}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de compra */}
        <TouchableOpacity style={estilos.botaoComprar}>
          <Text style={estilos.textoBotaoComprar}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilização da tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // fundo claro
  },
  botaoVoltar: {
    margin: 12,
    padding: 8,
    alignSelf: "flex-start", // botão fica no canto esquerdo
  },
  textoVoltar: {
    fontSize: 16,
    color: "#007BFF", // azul
  },
  imagemGrande: {
    width: "100%",
    height: 220,
    resizeMode: "contain", // ajusta imagem sem cortar
    backgroundColor: "#FFF",
  },
  detalhesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12, // sobrepõe um pouco na imagem
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  nomeProdutoGrande: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  categoriaProduto: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  precoProdutoGrande: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28A745", // verde para preço
    marginBottom: 12,
  },
  descricaoProduto: {
    fontSize: 16,
    color: "#444",
    marginBottom: 14,
    lineHeight: 22, // espaçamento entre linhas
  },
  infoExtras: {
    marginBottom: 18,
  },
  estoque: {
    fontSize: 15,
    color: "#555",
  },
  avaliacao: {
    fontSize: 15,
    color: "#f39c12", // amarelo para estrelas
  },
  seletorQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  labelQuantidade: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12,
  },
  controlesQuantidade: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoQuantidade: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
  },
  textoQuantidade: {
    fontSize: 20,
    fontWeight: "bold",
  },
  numeroQuantidade: {
    fontSize: 18,
    marginHorizontal: 14,
    fontWeight: "bold",
  },
  botaoComprar: {
    backgroundColor: "#2196F3", // azul para destacar
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBotaoComprar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});