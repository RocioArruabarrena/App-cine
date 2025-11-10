
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { addUser, getAllUsers, updateUser } from '../database/db';

export default function FormularioUsuario({ route, navigation }) {
  const editingId = route.params?.id || null;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('user');

  useEffect(() => {
    if (editingId) {
      (async () => {
        const all = await getAllUsers();
        const u = all.find(x => x.id === editingId);
        if (u) {
          setUsername(u.username);
          setNombre(u.nombre);
          setRol(u.rol);
        }
      })();
    }
  }, [editingId]);

  const handleSave = async () => {
    try {
      if (!username || (!editingId && !password) || !nombre) return Alert.alert('Completa los campos');
      if (editingId) {
        await updateUser(editingId, username, password || null, nombre, rol);
      } else {
        await addUser(username, password, nombre, rol);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo guardar');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
      <Text>Contraseña {editingId ? '(dejar vacía para no cambiar)' : ''}</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Text>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text>Rol</Text>
      <TextInput style={styles.input} value={rol} onChangeText={setRol} />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 12, borderRadius: 6 }
});
