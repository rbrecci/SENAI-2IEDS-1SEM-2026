import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App () {

  function mostrarMensagem() {
    if(Platform.OS === "web") {
      alert("Parabéns! seu app está funcionando");
    }else{
      Alert.alert("Parabéns", "Seu app está funcionando");
    }
  }
  return (
  <View style={styles.container}>
    <Image
    source={require("./assets/SenaiLogo.png")}
    style={styles.logo}
    resizeMode="contain"
    />

    <Text style={styles.titulo}>Bem-Vindo ao Site</Text>

    <Text style={styles.texto}>
      Clique para verificar seu site funcionando 
      </Text> 
      <TouchableOpacity
      style={styles.botao}
      onPress={mostrarMensagem}
      activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>Clique Aqui</Text>
      </TouchableOpacity>

      <StatusBar style="light"/>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent:"center",
    padding: 20
  },

  logo: {
    width: 300,
    height: 200,
    marginBottom: 30,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fFFF",
    textAlign: "center",
    marginBottom: 20,

  },

  texto: {
    fontSize: 18, 
    color:"#ffff",
    textAlign:"center",
    lineHeight: 26,
    marginBottom: 30, 
  },

  botao: {
    backgroundColor: "#ffff",
    paddingVertical:14,
    paddingHorizontal:35, 
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4, 
  },

  textoBotao: {
    color: "#ff0000",
    fontSize: 18,
    fontWeight: "bold",
  }

});