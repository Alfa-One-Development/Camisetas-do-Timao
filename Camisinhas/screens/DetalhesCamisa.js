import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetalhesCamisa({ route, navigation }) {
  const { camisa } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const carregarNome = async () => {
      try {
        // Busquei o nome do AsyncStorage
        const nomeSalvo = await AsyncStorage.getItem("nome");
        if (nomeSalvo) {
          // Se tiver, atualizei o estado
          setNome(nomeSalvo);
        }
      } catch (error) {
        // Tratei possíveis erros
        console.error("Erro ao carregar nome:", error);
      }
    };

    carregarNome();
  }, []);
  function Alertar() {
    if (quantidade > camisa.estoque) {
      Alert.alert(
        "Estoque Insuficiente",
        "A quantidade solicitada excede o estoque disponível."
      );
      return;
    }

    Alert.alert(
      "Compra Realizada",
      `Parabéns ${nome}, você comprou ${quantidade} unidade(s) da camisa ${
        camisa.name
      } \nValor total: R$${(
        parseFloat(camisa.preco.replace("R$", "").replace(",", ".")) * quantidade
      ).toFixed(2)}`
    );
  }

  return (
    <View style={estilos.container}>
      <Image source={{ uri: camisa.image }} style={estilos.imagemGrande} />

      <ScrollView style={estilos.detalhesContainer}>
        <Text style={estilos.nomeProdutoGrande}>{camisa.name}</Text>
        <Text style={estilos.precoProdutoGrande}>{camisa.preco}</Text>
        <Text style={estilos.descricaoProduto}>{camisa.description}</Text>
        <View style={estilos.infoExtras}>
          <Text style={estilos.estoque}>Estoque: {camisa.estoque}</Text>
          <Text style={estilos.avaliacao}>⭐ {camisa.avaliacoes} / 5</Text>
        </View>

        <View style={estilos.seletorQuantidade}>
          <Text style={estilos.labelQuantidade}>Quantidade:</Text>

          <View style={estilos.controlesQuantidade}>
            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
            >
              <Text style={estilos.textoQuantidade}>-</Text>
            </TouchableOpacity>

            <Text style={estilos.numeroQuantidade}>{quantidade}</Text>

            <TouchableOpacity
              style={estilos.botaoQuantidade}
              onPress={() => setQuantidade(quantidade + 1)}
            >
              <Text style={estilos.textoQuantidade}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    height: "60%",
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  detalhesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -12,
    elevation: 4,
    shadowColor: "#000",
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
    lineHeight: 22,
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
    color: "#f39c12",
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
    marginBottom: 25,
  },
  textoBotaoComprar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});