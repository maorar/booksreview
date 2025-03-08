
# 📚 BookReview App - React Native + Expo

Presentacion Proyecto Final

Diplomante : Marcos Ormachea Araya
Herramientas utilizadas
React Native + Expo
λ node --version
v20.18.1
λ expo cli --version
6.3.12
λ firebase cli --version
13.31.1

Proyecto Firebase
λ firebase use
Active Project: booksreviewpr

Emuladores Firebase utilizados

┌────────────────┬───────────────────┬──────────────────────────────────┐
│ Emulator       │ Host:Port         │ View in Emulator UI              │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Authentication │ 192.168.1.13:9099 │ http://127.0.0.1:4000/auth       │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Functions      │ 127.0.0.1:5001    │ http://127.0.0.1:4000/functions  │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Firestore      │ 127.0.0.1:8080    │ http://127.0.0.1:4000/firestore  │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Hosting        │ 127.0.0.1:5005    │ n/a                              │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Storage        │ 192.168.1.13:9199 │ http://127.0.0.1:4000/storage    │
├────────────────┼───────────────────┼──────────────────────────────────┤
│ Extensions     │ 127.0.0.1:5001    │ http://127.0.0.1:4000/extensions │
└────────────────┴───────────────────┴──────────────────────────────────┘

Tanto el emulador de autenticacion como el de Storage correspondes a IP's locales.

## 📁 Estructura del Proyecto

```
booksreview/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   └── main/
│   │       ├── LibraryScreen.js
│   │       ├── MyBooksScreen.js
│   │       └── ProfileScreen.js
│   │       └── ProfileStackNavigator.js
│   ├── components/
│   ├── navigation/
│   │       ├── AppNavigator.js
│   │       ├── AuthNavigator.js
│   │       └── TabNavigator.js
│   ├── services/
│   │       └── BooksAPI.js
│   └── utils/
├── App.js
└── package.json
└── firebase.json
└── firebaseConfig.js
```

El proyecto se ejecuta de manera local debido al uso de emuladores. 
Los dispositivos Android pueden autenticarse con los emuladores siempre que esten conectados a la misma red.
```

