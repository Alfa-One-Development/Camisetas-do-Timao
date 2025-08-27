// Importa as bibliotecas necessárias do React e React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

// Componente principal da tela de login
export default function LoginScreen({ onLoginSucesso }) {
  // Estados para armazenar o usuário e a senha digitados
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // Função que valida os dados do login
  const validarLogin = () => {
    // Verifica se o campo usuário está vazio
    if (!usuario.trim()) {
      Alert.alert('Erro', 'Digite o usuário');
      return;
    }
    // Verifica se usuário e senha estão corretos (simulação de login)
    if (usuario === 'aluno' && senha === '123') {
      // Exibe mensagem de sucesso e chama a função recebida via props (onLoginSucesso)
      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        { text: 'Ok', onPress: () => onLoginSucesso() }
      ]);
    } else {
      // Caso os dados estejam incorretos, mostra alerta de erro
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  // Renderização da interface
  return (
    <KeyboardAvoidingView
      style={styles.container}
      // Em iOS, sobe a tela quando o teclado aparece
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Título da tela */}
      <Text style={styles.titulo}>Time de Craques</Text>

      {/* Campo de entrada para usuário */}
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />

      {/* Campo de entrada para senha */}
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry // deixa a senha oculta
        style={styles.input}
      />

      {/* Botão que chama a função de validação */}
      <Button title="Entrar" onPress={validarLogin} color="#1976D2" />
    </KeyboardAvoidingView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela
    justifyContent: 'center', // centraliza verticalmente
    padding: 20,
    backgroundColor: '#f0f2f5', // cor de fundo clara
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#27ae60', // verde
  },
  input: {
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff', // fundo branco para os inputs
  },
});