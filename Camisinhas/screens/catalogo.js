// Importa bibliotecas necessárias do React e React Native
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

// Importa o componente que renderiza cada camisa individualmente
import CamisaItem from "./Camisa";

// Lista de camisas que serão exibidas no catálogo
const camisas = [
  {
    id: 1,
    name: "Barcelona",
    preco: "R$1499.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/FC_Barcelona_home_kit_2021.png",
    description: "Camisa oficial do Barcelona 2021/22.",
    descricao: "Camisa do Barcelona", // descrição curta
    estoque: 15,
    avaliacoes: 4.8,
  },
  {
    id: 2,
    name: "Real Madrid",
    preco: "R$1499.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Real_Madrid_CF_Home_Kit.png",
    description: "Camisa oficial do Real Madrid 2021/22.",
    descricao: "Camisa do Real Madrid",
    estoque: 15,
    avaliacoes: 4.8,
  },
  {
    id: 3,
    name: "PSG",
    preco: "R$1499.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Paris_Saint-Germain_FC_home_kit_2021.png",
    description: "Camisa do Paris Saint-Germain 2021/22.",
    descricao: "Camisa do PSG",
    estoque: 15,
    avaliacoes: 4.8,
  },
  {
    id: 4,
    name: "Manchester City",
    preco: "R$1499.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Manchester_City_home_kit_2021.png",
    description: "Camisa do Manchester City 2021/22.",
    estoque: 15,
    avaliacoes: 4.8,
  },
  {
    id: 5,
    name: "Liverpool",
    preco: "R$1499.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Liverpool_home_kit_2021.png",
    description: "Camisa oficial do Liverpool 2021/22.",
    estoque: 15,
    avaliacoes: 4.8,
  },
];

// Tela principal do catálogo
export default function CatalogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* FlatList é usado para renderizar listas grandes de forma otimizada */}
      <FlatList
        data={camisas} // lista de camisas
        keyExtractor={(item) => item.id.toString()} // transforma o id em string para ser usado como chave
        renderItem={({ item }) => (
          // Cada item da lista chama o componente CamisaItem
          <CamisaItem
            camisa={item}
            // Ao clicar, vai para a tela "Details" passando os dados da camisa
            onPress={() => navigation.navigate("Details", { camisa: item })}
          />
        )}
      />
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E3F2FD", // azul claro no fundo
  },
  // Estilo de um item genérico (não usado diretamente aqui, mas pode ser usado dentro do CamisaItem)
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // sombra no Android
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: "contain",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#1976D2", // azul escuro
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});