
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Autenticacion } from '../context/Autenticacion';
import { deleteUser, getAllUsers } from '../database/db';

export default function GestionUsuario({ navigation }) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(Autenticacion);

  const load = async () => {
    const list = await getAllUsers();
    setUsers(list);
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => load());
    load();
    return unsub;
  }, [navigation]);

  const handleDelete = (id) => {
    if (id === user.id) return Alert.alert('No puedes eliminarte a ti mismo');
    Alert.alert('Confirmar', 'Eliminar usuario?', [
      { text: 'Cancelar' },
      { text: 'Sí', onPress: async () => { await deleteUser(id); load(); } }
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Crear usuario" onPress={() => navigation.navigate('FormularioUsuario')} />
      <FlatList
        data={users}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.nombre}>{item.nombre} — {item.rol}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => navigation.navigate('EditUser', { id: item.id })} />
              <Button color="#ef4444" title="Eliminar" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  row: { padding: 12, backgroundColor: '#fff', marginVertical: 6, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  username: { fontWeight: 'bold', fontSize: 16 },
  nombre: { color: '#666' },
  actions: { flexDirection: 'row', gap: 8 }
});
