import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { Autenticacion, AuthProvider } from "./context/Autenticacion"
import Detalles from "./screens/Detalles"
import FormularioUsuario from "./screens/FormularioUsuario"
import GestionUsuario from "./screens/GestionUsuario"
import Login from "./screens/Login"
import Peliculas from "./screens/Peliculas"

const Stack = createNativeStackNavigator()

function RootNavigator() {
  const { isLoading, user, logout } = useContext(Autenticacion)

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )

  const Logout = () => (
    <TouchableOpacity onPress={logout} style={{ paddingRight: 16 }}>
      <Text style={{ color: "#f7a5a5ff", fontWeight: "bold" }}>Logout</Text>
    </TouchableOpacity>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#464896ff" },
          headerTintColor: "#fff",
          headerRight: () => <Logout />,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        ) : user.rol === "admin" ? (
          <>
            <Stack.Screen name="PanelAdmin" component={GestionUsuario} options={{ title: "Usuarios" }} />
            <Stack.Screen name="AñadirUser" component={FormularioUsuario} options={{ title: "Nuevo Usuario" }} />
            <Stack.Screen name="EditarUser" component={FormularioUsuario} options={{ title: "Editar Usuario" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Peliculas" component={Peliculas} options={{ title: "Películas" }} />
            <Stack.Screen name="Detalle" component={Detalles} options={{ title: "Detalle" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}
