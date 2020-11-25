import React, { useState } from "react";
import axios from "axios";
import useNavigation from "@react-navigation/native";

import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = ({ navigation, setToken }) => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (email && username && description && password) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            { email, username, description, password }
          );
          setToken(response.data.token);
          console.log(response.data);
        } else {
          setErrorMessage("Passwords must be the same");
        }
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log(error.message);
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
            <Text style={styles.title}>Sign up</Text>
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
            placeholder="Username"
            style={styles.input}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            placeholder="Describe yourself in a few words..."
            style={styles.inputText}
            onChangeText={(text) => {
              setDescription(text);
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
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <View style={styles.signUpBloc}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <View style={styles.button}>
              <Button
                // style={styles.button}
                title="Sign up"
                color="black"
                onPress={async () => {
                  handleSubmit();
                  // const userToken = "secret-token";
                  // setToken(userToken);
                }}
              />
            </View>
            <Button
              title="Already have an account? Sign in"
              color="black"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            ></Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  header: { flex: 1, justifyContent: "center", alignItems: "center" },
  header_logo_title: { alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
  },

  form: { flex: 1, padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },

  input: {
    flex: 1,
    height: 40,
    borderBottomColor: "#FF5A5F",
    borderBottomWidth: 1,
    marginBottom: 30,
  },

  inputText: {
    height: 100,
    borderColor: "#FF5A5F",
    borderWidth: 1,
    marginBottom: 30,
    borderRadius: 2,
  },

  button: {
    borderColor: "#FF5A5F",
    borderWidth: 2,
    borderStyle: "solid",
    width: 200,
    height: 60,
    justifyContent: "center",
    borderRadius: 30,
    color: "black",
  },

  errorMessage: {
    color: "#FF5A5F",
    fontSize: 16,
  },

  signUpBloc: {
    flex: 1,
    alignItems: "center",
  },
});
