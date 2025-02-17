import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Text, ListItem, Image, Button } from '@rneui/themed';
//import auth from '@react-native-firebase/auth';
import { getAll } from '../../services/BooksAPI'; 


export default function LibraryScreen({ addToMyBooks, myBooks }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('Invitado');
  

  // Función para cargar los libros desde la API
  const loadBooks = async () => {
    try {
      const data = await getAll();
      setBooks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los libros cuando el componente se monta
  useEffect(() => {
    loadBooks();
  }, []);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Mostrar un mensaje de error si algo sale mal
  if (error) {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  // Función para agregar un libro a "Mis Libros"
  const handleAddToMyBooks = (book) => {
    if (myBooks.some((b) => b.id === book.id)) {
      Alert.alert('Libro ya agregado', 'Este libro ya está en tu lista de "Mis Libros".');
    } else {
      addToMyBooks(book);
    }
  };

  // Renderizar cada libro en la lista
  const renderBook = ({ item }) => (
    <ListItem bottomDivider>
      <Image
        source={{ uri: item.imageLinks?.thumbnail }}
        style={styles.coverImage}
        resizeMode="contain"
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{item.subtitle}</ListItem.Subtitle>
        <Text style={styles.authors}>Autores: {item.authors?.join(', ')}</Text>
        <Text style={styles.publisher}>Editorial: {item.publisher}</Text>
        <Text style={styles.publishedDate}>Fecha de publicación: {item.publishedDate}</Text>
        <Button
          title="Agregar a Mis Libros"
          onPress={() => handleAddToMyBooks(item)} // Agregar el libro a "Mis Libros"
          buttonStyle={styles.addButton}
        />
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Librería</Text>
       <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
  },
  coverImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#666',
  },
  authors: {
    fontSize: 14,
    color: '#444',
  },
  publisher: {
    fontSize: 14,
    color: '#444',
  },
  publishedDate: {
    fontSize: 14,
    color: '#444',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
  },
});