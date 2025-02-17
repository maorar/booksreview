    import React, { useState } from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import LibraryScreen from '../screens/main/LibraryScreen';
    import MyBooksScreen from '../screens/main/MyBooksScreen';
    import ProfileStackNavigator from '../screens/main/ProfileStackNavigator'; 
    import ProfileScreen from '../screens/main/ProfileScreen';  
    //import LoginScreen from '../screens/auth/LoginScreen';      
    import { Icon } from '@rneui/themed';
    
    const Tab = createBottomTabNavigator();
    
    export default function TabNavigator() {
      const [myBooks, setMyBooks] = useState([]); // Estado para los libros seleccionados
    
      // Función para agregar un libro a "Mis Libros"
      const addToMyBooks = (book) => {
        setMyBooks((prevBooks) => [...prevBooks, book]);
      };
    
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              if (route.name === 'Library') {
                iconName = 'book';
              } else if (route.name === 'MyBooks') {
                iconName = 'bookmark';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              } /* else if (route.name === 'Login') {
                iconName = 'sign-in';
              } */
    
              return <Icon name={iconName} type="font-awesome" size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Library"
            options={{ title: 'Librería' }}
          >
            {() => <LibraryScreen addToMyBooks={addToMyBooks} myBooks={myBooks} />}
          </Tab.Screen>
          
          <Tab.Screen
            name="MyBooks"
            options={{ title: 'Mis Libros' }}
          >
            {() => <MyBooksScreen myBooks={myBooks} />}
          </Tab.Screen>
    
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Perfil' }}
          />
    
          {/* <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Iniciar Sesión' }}
          /> */}
          
        </Tab.Navigator>
      );
    }
      