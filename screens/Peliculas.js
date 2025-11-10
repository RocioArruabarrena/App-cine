
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from '../components/PeliculaTarjeta';
import { getPopularMovies } from '../services/tmdb';

export default function Peliculas({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!movies.length) return <View style={styles.center}><Text>No hay películas</Text></View>;

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={movies}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} onPress={(m) => navigation.navigate('MovieDetail', { id: m.id })} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' }});
