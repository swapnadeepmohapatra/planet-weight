import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Animated,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "react-native-vector-icons";

export default function App() {
  Font.loadAsync({
    Baloo2: require("./src/font/Baloo2.ttf"),
    Dosis: require("./src/font/Dosis-Bold.ttf")
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100
    }).start();
  };
  const [planetData, setPlanetData] = useState([
    {
      name: "Mercury",
      wight: 0.0553,
      imageSrc: require("./src/images/mercury.png")
    },
    {
      name: "Venus",
      wight: 0.815,
      imageSrc: require("./src/images/venus.png")
    },
    {
      name: "Mars",
      wight: 0.107,
      imageSrc: require("./src/images/mars.png")
    },
    {
      name: "Earth",
      wight: 1,
      imageSrc: require("./src/images/earth.png")
    },
    {
      name: "Jupiter",
      wight: 318,
      imageSrc: require("./src/images/jupiter.png")
    },
    {
      name: "Saturn",
      wight: 95.2,
      imageSrc: require("./src/images/saturn.png")
    },
    {
      name: "Uranus",
      wight: 14.5,
      imageSrc: require("./src/images/uranus.png")
    },
    {
      name: "Neptune",
      wight: 17.1,
      imageSrc: require("./src/images/neptune.png")
    }
  ]);
  const [index, setIndex] = useState(0);
  const [myWeight, setMyWeight] = useState(10);
  const [mytext, setMytext] = useState(10);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
      <View style={styles.imageBox}>
        <TouchableOpacity
          disabled={index >= 1 ? false : true}
          style={styles.buttonBox}
          onPress={() => {
            if (index >= 1) {
              fadeOut();
              setTimeout(() => {
                setIndex(index - 1);
              }, 100);
              setTimeout(() => {
                fadeIn();
              }, 100);
            }
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={100}
            color="#c1c1c1"
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim
            }
          ]}
        >
          <Image source={planetData[index].imageSrc} />
        </Animated.View>

        <TouchableOpacity
          style={styles.buttonBox}
          disabled={index <= 6 ? false : true}
          onPress={() => {
            if (index <= 6) {
              fadeOut();
              setTimeout(() => {
                setIndex(index + 1);
              }, 100);
              setTimeout(() => {
                fadeIn();
              }, 100);
            }
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={100}
            color="#c1c1c1"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.planetText}>{planetData[index].name}</Text>

      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Your Weight on Earth"
          keyboardType="decimal-pad"
          onChangeText={text => setMytext(text)}
          value={mytext}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#1BCA9B",
            borderRadius: 20,
            paddingVertical: 5,
            marginTop: 20,
            marginHorizontal: 50
          }}
          onPress={() => {
            setMyWeight(mytext);
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#ffffff",
              alignSelf: "center"
            }}
          >
            Calculate
          </Text>
        </TouchableOpacity>
        <Text style={styles.planetWeightText}>
          My Weight on {planetData[index].name} :
        </Text>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={styles.weightText}>
            {Math.round(
              (myWeight * planetData[index].wight + Number.EPSILON) * 100
            ) / 100}
          </Text>
          <Text
            style={{
              color: "#ffffff",
              alignSelf: "flex-end",
              marginBottom: 20
            }}
          >
            KGs
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    color: "#000000"
  },
  imageBox: {
    flexDirection: "row"
  },
  buttonBox: {
    backgroundColor: "#101010",
    paddingVertical: 50,
    alignSelf: "center"
  },
  planetText: {
    fontSize: 32,
    color: "#ffffff",
    fontFamily: "Baloo2"
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    color: "#ffffff",
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#1e1e1e",
    fontSize: 20
  },
  planetWeightText: {
    fontSize: 24,
    color: "#ffffff",
    marginTop: 20
  },
  weightText: {
    color: "#ffffff",
    fontSize: 70,
    alignSelf: "center",
    marginTop: 20,
    fontFamily: "Dosis"
  }
});
