import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ navigation, setToken }) {
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (email && password) {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email, password }
        );
        setToken(response.data.token);
        console.log(response);
      } else {
        setErrorMessage("Veuillez renseigner un email et un mot de passe");
      }
    } catch (error) {
      // console.log(Object.keys(error));
      console.log(error.response.data.error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.header_logo_title}>
            <Image
              source={require("../assets/logo.jpg")}
              style={styles.logo}
            ></Image>
            <Text style={styles.title}>Sign in</Text>
          </View>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <View style={styles.signUpBloc}>
            {/* <Text style={styles.errorMessage}>{errorMessage}</Text> */}
            <View style={styles.button}>
              <Button
                // style={styles.button}
                title="Sign in"
                color="black"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
            <View>
              <Text>{errorMessage}</Text>
            </View>
            <Button
              title="No account? Register"
              color="black"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            ></Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // header: { flex: 1, justifyContent: "center", alignItems: "center" },
  header_logo_title: { alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomColor: "#FF5A5F",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});
