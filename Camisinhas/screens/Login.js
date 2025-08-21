import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function LoginScreen({ onLoginSucesso }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const validarLogin = () => {
    if (!usuario.trim()) {
      Alert.alert('Erro', 'Digite o usuário');
      return;
    }
    if (usuario === 'aluno' && senha === '123') {
      Alert.alert('Sucesso', 'Login realizado com sucesso!', [
        { text: 'Ok', onPress: () => onLoginSucesso() }
      ]);
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Time de Craques</Text>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={validarLogin} color="#1976D2" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#27ae60',
  },
  input: {
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
