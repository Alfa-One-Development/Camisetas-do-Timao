//----- IMPORTAÇÕES -----
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

//----- COMPONENTE PRINCIPAL -----
export default function DetalhesCamisa({ route }) {
  //----- PROPS -----
  const { camisa } = route.params; // Camisa enviada do catálogo

  //----- ESTADOS -----
  const [quantidade, setQuantidade] = useState(1); // Quantidade selecionada
  const [nome, setNome] = useState(""); // Nome do usuário

  //----- CARREGAR NOME DO USUÁRIO -----
  // estado do tamanho selecionado
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const tamanhos = ["P", "M", "G", "GG", "G1"];

  useEffect(() => {
    const carregarNomeUsuario = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem("nome");
        if (nomeSalvo) {
          setNome(nomeSalvo);
        }
      } catch (error) {
        console.error("Erro ao carregar nome:", error);
      }
    };
    carregarNomeUsuario();
  }, []);

  //----- FUNÇÃO DE COMPRA -----
  const realizarCompra = () => {
    if (!tamanhoSelecionado) {
      Alert.alert("Selecione um tamanho", "Você precisa escolher um tamanho antes de comprar.");
      return;
    }

    if (quantidade > camisa.estoque) {
      Alert.alert(
        "Estoque Insuficiente",
        "A quantidade solicitada excede o estoque disponível."
      );
      return;
    }

    const valorTotal =
      parseFloat(camisa.preco.replace("R$", "").replace(",", ".")) * quantidade;

    Alert.alert(
      "Compra Realizada",
      `Parabéns ${nome}, você comprou ${quantidade} unidade(s) da camisa ${
        camisa.name
      } - Tamanho ${tamanhoSelecionado}\nValor total: R$${(
        parseFloat(camisa.preco.replace("R$", "").replace(",", ".")) * quantidade
      ).toFixed(2)}`
    );
  };

  //----- ADICIONAR À LISTA DE DESEJOS -----
  const adicionarListaDesejos = async () => {
    const salvo = await AsyncStorage.getItem("wishlist");
    let listaDesejos = salvo ? JSON.parse(salvo) : [];

    const existe = listaDesejos.find((c) => c.id === camisa.id);

    if (!existe) {
      listaDesejos.push(camisa);
      await AsyncStorage.setItem("wishlist", JSON.stringify(listaDesejos));
      Alert.alert(
        "Adicionado 💖",
        `${camisa.name} foi adicionado à sua lista de desejos!`
      );
    } else {
      Alert.alert("Já está na lista", "Essa camisa já foi adicionada antes.");
    }
  };

  //----- REMOVER DA LISTA DE DESEJOS -----
  const removerListaDesejos = async () => {
    const salvo = await AsyncStorage.getItem("wishlist");
    let listaDesejos = salvo ? JSON.parse(salvo) : [];

    const atualizado = listaDesejos.filter((c) => c.id !== camisa.id);
    await AsyncStorage.setItem("wishlist", JSON.stringify(atualizado));

    Alert.alert(
      "Removido 💔",
      `${camisa.name} foi removido da sua lista de desejos.`
    );
  };

  //----- RENDER -----
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>
        Essa camisa do {camisa.name} ficaria muito boa em você, {nome}!
      </Text>
      <Image source={{ uri: camisa.image }} style={estilos.imagemGrande} />

      <ScrollView style={estilos.detalhesContainer}>
        {/* Informações do produto */}
        <Text style={estilos.nomeProdutoGrande}>{camisa.name}</Text>
        <Text style={estilos.precoProdutoGrande}>{camisa.preco}</Text>
        <Text style={estilos.descricaoProduto}>{camisa.description}</Text>

        <View style={estilos.infoExtras}>
          <Text style={estilos.estoque}>Estoque: {camisa.estoque}</Text>
          <Text style={estilos.avaliacao}>⭐ {camisa.avaliacoes} / 5</Text>
        </View>

        {/* Seletor de quantidade */}
        {/* seletor de tamanhos */}
        <View style={estilos.seletorTamanho}>
          <Text style={estilos.labelTamanho}>Selecione o tamanho:</Text>
          <View style={estilos.opcoes}>
            {tamanhos.map((tamanho) => (
              <TouchableOpacity
                key={tamanho}
                style={[
                  estilos.botaoTamanho,
                  tamanhoSelecionado === tamanho && estilos.tamanhoSelecionado,
                ]}
                onPress={() => setTamanhoSelecionado(tamanho)}
              >
                <Text
                  style={[
                    estilos.textoTamanho,
                    tamanhoSelecionado === tamanho && estilos.textoSelecionado,
                  ]}
                >
                  {tamanho}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* seletor de quantidade */}
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

        {/* Linha de botões de wishlist */}
        <View style={estilos.linhaBotoes}>
          <TouchableOpacity
            style={[estilos.botaoWishlist, { backgroundColor: "#E91E63" }]}
            onPress={adicionarListaDesejos}
          >
            <Text style={estilos.textoWishlist}>Adicionar 💖</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botaoWishlist, { backgroundColor: "#9E9E9E" }]}
            onPress={removerListaDesejos}
          >
            <Text style={estilos.textoWishlist}>Remover 💔</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de compra */}
        <TouchableOpacity style={estilos.botaoComprar} onPress={realizarCompra}>
          <Text style={estilos.textoBotaoComprar}>Comprar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

//----- ESTILOS -----
const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
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
  },
  nomeProdutoGrande: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#454343",
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

  // seletor de tamanho
  seletorTamanho: {
    marginBottom: 20,
  },
  labelTamanho: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  opcoes: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  botaoTamanho: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  tamanhoSelecionado: {
    backgroundColor: "#4169E1",
    borderColor: "#4169E1",
  },
  textoTamanho: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  textoSelecionado: {
    color: "#fff",
  },

  // seletor de quantidade
  seletorQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  labelQuantidade: { fontSize: 16, fontWeight: "600", marginRight: 12 },
  controlesQuantidade: { flexDirection: "row", alignItems: "center" },
  botaoQuantidade: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
  },
  textoQuantidade: { fontSize: 20, fontWeight: "bold" },
  numeroQuantidade: { fontSize: 18, marginHorizontal: 14, fontWeight: "bold" },
  botaoComprar: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 60,
  },
  textoBotaoComprar: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  botaoWishlist: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  textoWishlist: { color: "#fff", fontSize: 16, fontWeight: "bold" },
}),
  titulo: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    color: "#1E3A8A",
  },
});
