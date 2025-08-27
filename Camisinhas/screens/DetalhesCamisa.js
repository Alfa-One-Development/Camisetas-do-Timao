import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function DetalhesCamisa({ route, navigation }) {
  // recebe o objeto "camisa" passado pela rota
  const { camisa } = route.params;

  // estado que controla a quantidade escolhida
  const [quantidade, setQuantidade] = useState(1);

  // alert que daquando clica em comprar
  function Alertar() {
    // se o usuario tentar comprar mais que o disponivel no estoque
    if (quantidade > camisa.estoque) {
      Alert.alert(
        "Estoque Insuficiente",
        "A quantidade solicitada excede o estoque disponível."
      );
      return;
    }

    // se nao, confirma a compra
    Alert.alert(
      "Compra Realizada",
      `Você comprou ${quantidade} unidade(s) da camisa ${
        camisa.name
      } \nValor total: R$${(
        parseFloat(camisa.preco.replace("R$", "")) * quantidade
      ).toFixed(2)}` //para arredondar o numero
    );
  }

  return (
    <View style={estilos.container}>
      {/* Foto da Camisa */}
      <Image source={{ uri: camisa.image }} style={estilos.imagemGrande} />

      {/* Caixa com os detalhes da camisa */}
      <ScrollView style={estilos.detalhesContainer}>
        {/* Nome e preço */}
        <Text style={estilos.nomeProdutoGrande}>{camisa.name}</Text>
        <Text style={estilos.precoProdutoGrande}>{camisa.preco}</Text>
        <Text style={estilos.descricaoProduto}>{camisa.description}</Text>
        <View style={estilos.infoExtras}>
          <Text style={estilos.estoque}>Estoque: {camisa.estoque}</Text>
          <Text style={estilos.avaliacao}>⭐ {camisa.avaliacoes} / 5</Text>
        </View>

        {/* seletor de quantidade */}
        <View style={estilos.seletorQuantidade}>
          <Text style={estilos.labelQuantidade}>Quantidade:</Text>

          {/* botoes que alteram a quantidade */}
          <View style={estilos.controlesQuantidade}>
            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(Math.max(1, quantidade - 1))} // garante que a menor quantidade seja 1 "maior valor entre 1 e quantidade-1"
            >
              <Text style={estilos.textoQuantidade}>-</Text>
            </TouchableOpacity>

            {/* número da quantidade atual */}
            <Text style={estilos.numeroQuantidade}>{quantidade}</Text>

            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(quantidade + 1)} //verificação de estoque ta la em cima
            >
              <Text style={estilos.textoQuantidade}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* botão de compra */}
        <TouchableOpacity style={estilos.botaoComprar} onPress={Alertar}>
          <Text style={estilos.textoBotaoComprar}>Comprar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", 
  },
  imagemGrande: {
    width: "100%",
    height: 320,
    padding: 250,
    resizeMode: "contain",
    backgroundColor: "#FFF",
    objectFit: "cover", // preenche a área da imagem
  },
  detalhesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12,
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  nomeProdutoGrande: {
    fontSize: 28,
    padding: 10,
    fontWeight: "bold",
    color: "#454343ff",
    textAlign: "center",
    marginBottom: 15,
  },
  precoProdutoGrande: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28A745", 
    marginBottom: 12,
  },
  descricaoProduto: {
    fontSize: 16,
    color: "#444",
    marginBottom: 14,
    lineHeight: 22, // melhora a leitura
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
    backgroundColor: "#2196F3", 
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
