import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountdownTimer from "../components/timer";
import Score from "../components/score";
import data from "../mocks/playerGame.json";
import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  Question: string;
  Options: string[];
  Answer: string;
}

const Quiz = () => {
  const [allQuestions, setAllquestion] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOptions, setCorrectOptions] = useState("");
  const [isOptionsDisabled, setisOptionsDisabled] = useState(false);
  const [getScore, setGetScore] = useState(0);
  const [resultText, setResultText] = useState("");
  const [timer, setTimer] = useState(0);
  const playerGame = data;

  async function getQuestion() {
    const res = await axios.get(
      "http://192.168.18.174:5000/api/v1/get-question"
    );
    setAllquestion(res.data);
    console.log(res.data);
    setTimer(20);
  }

  const handlePress = (selectedOptions: any) => {
    setCurrentOptionSelected(selectedOptions);
    // if (timer == 0) {
    //   validateAnswer(selectedOptions);
    // }
  };

  const validateAnswer = (selectedOptions: any) => {
    let Answer = allQuestions[currentQuestion]["Answer"];
    setCorrectOptions(Answer);
    setisOptionsDisabled(true);
    if (selectedOptions == Answer) {
      setGetScore(getScore + 20);
      setResultText("Correct!");
    } else {
      setResultText("Wrong!");
    }

    // if(currentQuestion== allQuestions.length-1)
    // setCurrentQuestion(currentQuestion + 1);
    // setCurrentOptionSelected(null);
    // setCorrectOptions("");
    // setisOptionsDisabled(false);
    setTimeout(() => {
      // Move to the next question after a delay (e.g., 1000 milliseconds)
      moveToNextQuestion();
    }, 3000);
  };

  const moveToNextQuestion = () => {
    // Reset state for the next question
    setCurrentOptionSelected(null);
    setCorrectOptions("");
    setisOptionsDisabled(false);
    setResultText("");
    setTimer(20);

    // Move to the next question if available
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle end of questions (e.g., navigate to result screen)
    }
    Animated.timing(progress, {
      toValue: currentQuestion + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  const ProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: "blue",
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    // Automatically validate the answer when the timer reaches 0
    if (timer === 0 && currentOptionSelected !== null) {
      validateAnswer(currentOptionSelected);
    }

    // if (timer === 0 && currentOptionSelected == null) {
    //   setCurrentOptionSelected('')
    //   validateAnswer(currentOptionSelected);
    // }
  }, [timer, currentOptionSelected]);

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        source={require("../image/bgImage.jpg")}
        style={styles.container}
      >
        <View style={styles.centered}>
          {/* top */}
          <View style={styles.score}>
            <Score />
          </View>

          {/* center */}
          <View style={styles.content}>
            <Text style={styles.timer}>
              {/* <CountdownTimer durationInSeconds={20} /> */}
              {timer}
            </Text>

            {/* question */}
            <View style={styles.questionBox}>
              <Text style={styles.question}>
                {allQuestions[currentQuestion]?.Question}
              </Text>
            </View>
            {/* option */}
            <View>
              {allQuestions[currentQuestion]?.Options.map((Options: any) => (
                <TouchableOpacity
                  onPress={() => handlePress(Options)}
                  disabled={isOptionsDisabled}
                  key={Options}
                  style={[
                    styles.answerBox,
                    {
                      borderColor:
                        Options == correctOptions
                          ? "green"
                          : Options == currentOptionSelected
                          ? "blue"
                          : "yellow",
                      backgroundColor:
                        Options == correctOptions
                          ? "rgba(69, 235, 19,0.8)"
                          : Options == currentOptionSelected
                          ? "rgba(25, 22, 22, 0.8)"
                          : "rgba(25, 22, 22, 0.8)",
                    },
                  ]}
                >
                  <Text style={styles.answerText}>{Options}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.avatarPlayer}
                      source={require(`../image/${playerGame[0].image}`)}
                    />
                    {/* {playerGame[0].Answer} */}
                  </View>
                  {/* check answer */}
                </TouchableOpacity>
              ))}
            </View>
            {/* bar */}
            <Text>{resultText}</Text>
          </View>
          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            {/* quest length */}
            <Text
              style={[styles.answerText, { fontSize: 20, textAlign: "center" }]}
            >
              {currentQuestion + 1}/
              <Text style={[styles.answerText, { fontSize: 20 }]}>
                {allQuestions.length} Question
              </Text>
            </Text>
            {ProgressBar()}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
  centered: {
    width: "85%",
    backgroundColor: "rgba(198, 101, 224, 0.5)",
    height: "90%",
    marginHorizontal: "auto",
    marginTop: 30,
  },
  score: {},
  content: {
    width: "90%",
    // backgroundColor: "rgba(198, 101, 224, 0.5)",
    textAlign: "center",
    marginHorizontal: "auto",
    borderRadius: 15,
    position: "relative",
    top: 70,
  },
  timer: {
    fontSize: 30,
    color: "#fc7f03",
    fontFamily: "georgia",
    textAlign: "center",
    marginBottom: 5,
  },
  question: {
    color: "white",
    fontWeight: "100",
    fontFamily: "georgia",
    letterSpacing: 0.5,
    textShadowColor: "black",
    textShadowRadius: 10,
    fontSize: 20,
  },
  questionBox: {
    width: "80%",
    backgroundColor: "rgba(25, 22, 22, 0.5)",
    marginHorizontal: "auto",
    padding: 10,
    borderRadius: 10,
  },
  answerBox: {
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  answerText: {
    color: "white",
    fontWeight: "200",
    fontFamily: "georgia",
    letterSpacing: 2,
    marginHorizontal: 10,
    marginVertical: 15,
    // textShadowColor: "white",
    // textShadowRadius: 1,
  },
  avatarPlayer: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    objectFit: "cover",
    borderRadius: 100,
    marginHorizontal: 3,
  },
});
