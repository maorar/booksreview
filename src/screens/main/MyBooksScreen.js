import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Modal, Button, Alert } from 'react-native';
import { Text, ListItem, Image } from '@rneui/themed';

export default function MyBooksScreen({ myBooks }) {
  const [reviews, setReviews] = useState({}); // Estado para almacenar las reseñas
  const [selectedBookId, setSelectedBookId] = useState(null); // Estado para el libro seleccionado
  const [reviewText, setReviewText] = useState(''); // Estado para el texto de la reseña
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para abrir el modal y escribir una reseña
  const openReviewModal = (bookId) => {
    setSelectedBookId(bookId);
    setReviewText(reviews[bookId] || ''); // Cargar la reseña existente si la hay
    setIsModalVisible(true);
  };

  // Función para guardar la reseña
  const saveReview = () => {
    if (selectedBookId) {
      setReviews((prevReviews) => ({
        ...prevReviews,
        [selectedBookId]: reviewText,
      }));
      Alert.alert('Reseña guardada', 'Tu reseña ha sido guardada correctamente.');
      setIsModalVisible(false); // Cerrar el modal después de guardar
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Mis Libros</Text>
      <FlatList
        data={myBooks}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <Image
              source={{ uri: item.imageLinks?.thumbnail }}
              style={styles.coverImage}
              resizeMode="contain"
            />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
              <Text>Autores: {item.authors?.join(', ')}</Text>
              <Text>Editorial: {item.publisher}</Text>
              <Text>Fecha de publicación: {item.publishedDate}</Text>
              <Button
                title="Escribir Reseña"
                onPress={() => openReviewModal(item.id)} // Abrir el modal para escribir la reseña
                buttonStyle={styles.addButton}
              />
              {reviews[item.id] && (
                <Text style={styles.reviewText}>Reseña: {reviews[item.id]}</Text>
              )}
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Modal para escribir la reseña */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text h4>Escribe tu reseña</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Escribe tu reseña aquí"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />
            <Button
              title="Guardar Reseña"
              onPress={saveReview}
              buttonStyle={styles.saveButton}
            />
            <Button
              title="Cerrar"
              onPress={() => setIsModalVisible(false)}
              buttonStyle={styles.closeButton}
            />
          </View>
        </View>
      </Modal>
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
  coverImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  reviewButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
  },
  reviewText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 100,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
  },
  
});