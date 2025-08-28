import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const camisas = [
  {
    id: 1,
    name: "Barcelona",
    preco: "R$ 179,99",
    image: "https://img.olx.com.br/images/53/531457208936112.jpg",
    description: "Camisa oficial do Barcelona 2021/22.",
    estoque: 150,
    avaliacoes: 4.7,
  },
  {
    id: 2,
    name: "Real Madrid",
    preco: "R$ 219,99",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/255/556/products/img_1462-b6856d0301c75011f217494158329265-1024-1024.jpeg",
    description: "Camisa oficial do Real Madrid 2021/22.",
    estoque: 25,
    avaliacoes: 4.3,
  },
  {
    id: 3,
    name: "PSG",
    preco: "R$ 129,99",
    image:
      "https://images.tcdn.com.br/img/img_prod/1052037/camisa_psg_home_2024_25_torcedor_5087_1_4fe5a6ea4ccfce97f9c70d30205c1d1f.jpg",
    description: "Camisa do Paris Saint-Germain 2021/22.",
    estoque: 75,
    avaliacoes: 4.0,
  },
  {
    id: 4,
    name: "Manchester City",
    preco: "R$ 499,99",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-manchester-city-home1-07f3d715f6c1cc502417428529708354-1024-1024.jpeg",
    description: "Camisa do Manchester City 2021/22.",
    estoque: 33,
    avaliacoes: 4.4,
  },
  {
    id: 5,
    name: "Bayern de Munich",
    preco: "R$ 649,99",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.rCgps10zFxYNMJHV6yybqAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Camisa oficial do Bayern de Munich 2021/22.",
    estoque: 47,
    avaliacoes: 4.8,
  },
  {
    id: 6,
    name: "Flamengo",
    preco: "R$ 4090,99",
    image:
      "https://acdn-us.mitiendanube.com/stores/004/285/036/products/camisa-flamengo-2425-torcedor-masculina-adidas-vermelho-preto-1-00575796ccf034808517098434512579-1024-1024.png",
    description: "Camisa oficial do Flamengo 2021/22.",
    estoque: 470,
    avaliacoes: 4.9,
  },
  {
    id: 7,
    name: "Corinthians",
    preco: "R$ 49,99",
    image:
      "https://www.futebolreligiao.com.br/image/cache/catalog/Corinthians/Camisa%20I%20Corinthians%202024%20Home-900x900.png",
    description: "Camisa oficial do Corinthians 2024/25.",
    estoque: 10,
    avaliacoes: 3.6,
  },
  {
    id: 8,
    name: "Santos",
    preco: "R$ 249,99",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/009/124/products/camisa-iii-santos-retro-12-13-masculina-azul-d60296c5182c2323e817060349841057-1024-1024.jpg",
    description: "Camisa oficial do Corinthians 2024/25.",
    estoque: 64,
    avaliacoes: 2.9,
  },
  {
    id: 9,
    name: "Palmeiras",
    preco: "R$ 19,99",
    image:
      "https://lojapalmeiras.vtexassets.com/arquivos/ids/187676/_0067_777230_01.jpg?v=638657305118100000",
    description: "Camisa oficial do Palmeiras 2024/25.",
    estoque: 1951,
    avaliacoes: 1.2,
  },
  {
    id: 10,
    name: "Vasco",
    preco: "R$ 1149,99",
    image:
      "https://acdn-us.mitiendanube.com/stores/001/669/796/products/vasco-preta-4-3843cfad27dd1e3c7017207040780994-1024-1024.jpg",
    description: "Camisa oficial do Palmeiras 2024/25.",
    estoque: 2,
    avaliacoes: 5.0,
  },
  {
    id: 11,
    name: "Seleção Brasileira",
    preco: "R$ 449,99",
    image:
      "https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-brasil-1994-1f3be22482504b472a17195143453217-640-0.webp",
    description: "Camisa oficial da Seleção Brasileira 2024/25.",
    estoque: 27,
    avaliacoes: 4.6,
  },
];

const CamisaItem = ({ camisa, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={itemStyles.card}>
      <Image source={{ uri: camisa.image }} style={itemStyles.image} />
      <Text style={itemStyles.name}>{camisa.name}</Text>
      <Text style={itemStyles.preco}>{camisa.preco}</Text>
    </TouchableOpacity>
  );
};

export default function CatalogScreen({ navigation }) {
// Criei um estado pro nome aqui dentro do componente
  const [nome, setNome] = useState("");

  // Usei o useEffect pra carregar o nome quando a tela abrir
  useEffect(() => {
    // Fiz uma função async pra buscar o nome do AsyncStorage
    const carregarNome = async () => {
      try {
        // Busquei o nome salvo
        const nomeSalvo = AsyncStorage.getItem("nome");
        if (nomeSalvo) {
          // Se tiver nome, atualizo o estado
          setNome(nomeSalvo);
        }
      } catch (error) {
        // Se der erro, mostro no console
        console.error("Erro ao carregar nome:", error);
      }
    };

    // Chamo a função pra carregar o nome
    carregarNome();
  }, []); // O array vazio [] faz isso rodar só uma vez quando a tela abre

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo, {nome}! Boas Compras!</Text>
      <FlatList
        data={camisas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <CamisaItem
            camisa={item}
            onPress={() => navigation.navigate("Details", { camisa: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0F4F8",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
    color: "#1E3A8A",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

const itemStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});