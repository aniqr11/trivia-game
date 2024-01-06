import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GoogleButton from "react-google-button";
import { API } from "../libs/Api";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const navigation = useNavigation();
  const imgSplash = [
    require("../image/splash.jpg"),
    require("../image/bgImage.jpg"),
  ];

  async function getLogin() {
    // try {
    //   const respone = await API.get("/google/login/url");

    //   console.log(respone);
    // } catch (error) {
    //   console.log(error);
    // }
    navigation.navigate(
      "/https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=283225227768-50r9i7jv2bjtp49opecukpkvafqp9adc.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fcallback%2Fgoogle&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&approval_prompt=force&include_granted_scopes=true&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow"
    );
    // return respone
    // useEffect(({ navigation }) => {
    //   navigation.navigate(`${respone}`);
    // });
  }

  // useEffect(() => {
  //   getLogin();
  // }, []);

  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={imgSplash[1]}
      >
        <Image source={imgSplash[0]} style={styles.Image} />

        <View style={{ marginBottom: 20 }}>
          <Pressable>
            <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=283225227768-50r9i7jv2bjtp49opecukpkvafqp9adc.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fcallback%2Fgoogle&state&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&approval_prompt=force&include_granted_scopes=true&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow">
              <GoogleButton />
            </a>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            By continue, you agree to Terms and Privacy
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },

  Image: {
    height: 150,
    width: 150,
    // margin: "auto",
    marginTop: -10,
    borderRadius: 100,
    marginBottom: 80,
  },
});
