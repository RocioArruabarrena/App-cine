
import { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Autenticacion } from '../context/Autenticacion';

export default function Login() {
  const { login } = useContext(Autenticacion);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handle = async () => {
    if (!username || !password) return Alert.alert('Completa usuario y contraseña');
    const user = await login(username.trim(), password);
    if (!user) Alert.alert('Credenciales invalidas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesion</Text>
      <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Ingresar" onPress={handle} />
      <Text style={styles.hint}>Admin por defecto: admin / admin1234</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#833232ff', padding: 10, marginBottom: 12, borderRadius: 6 },
  hint: { marginTop: 12, color: '#3d3b3bff', fontSize: 12 }
});
