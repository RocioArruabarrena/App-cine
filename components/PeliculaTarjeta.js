
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IMAGE_BASE_URL } from '../services/tmdb';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(movie)}>
      {movie.poster_path ? (
        <Image source={{ uri: IMAGE_BASE_URL + movie.poster_path }} style={styles.image} />
      ) : null}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.date}>{movie.release_date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 8, backgroundColor: '#fff', marginVertical: 6, borderRadius: 8, elevation: 1 },
  image: { width: 80, height: 120, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  date: { color: '#666', marginTop: 6 }
});
