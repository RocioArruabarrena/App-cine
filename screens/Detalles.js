
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getMovieDetails, IMAGE_BASE_URL } from '../services/tmdb';

export default function Detalles({ route }) {
  const id = route.params?.id;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      const m = await getMovieDetails(id);
      setMovie(m);
    })();
  }, [id]);

  if (!movie) return <View style={styles.center}><ActivityIndicator /></View>;

  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      {movie.poster_path ? <Image source={{ uri: IMAGE_BASE_URL + movie.poster_path }} style={styles.image} /> : null}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.info}>Rating: {movie.vote_average}</Text>
      <Text style={styles.info}>Fecha: {movie.release_date}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 420, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  overview: { marginTop: 8, lineHeight: 20 },
  info: { marginTop: 6, color: '#555' }
});
