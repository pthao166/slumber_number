import homeStyle from "@/styles/HomeStyle";
import * as Speech from "expo-speech";
import { useRef } from "react";
import { Pressable, Text } from "react-native";

// increments time forward and enable interval selection, reset and stop button
export default function StartButton({
  setAlarmString,
  formatTime,
  setTime,
  setId,
  interval,
  setOptionsDisabled,
  optionsDisabled,
}) {
  const prevDiffRef = useRef(0);

  // helper function that announces the elapsed interval
  function checkElapsed(difference) {
    let announcement = [];
    const totalSeconds = interval.minutes * 60 + interval.seconds;
    if (difference % totalSeconds === 0) {
      if (interval.minutes === 1) {
        announcement.push("1 minute");
      } else if (interval.minutes > 1) {
        announcement.push(interval.minutes + " minutes");
      }

      if (interval.minutes !== 0 && interval.seconds !== 0) {
        announcement.push("and");
      }

      if (interval.seconds === 1) {
        announcement.push("1 second");
      } else if (interval.seconds > 1) {
        announcement.push(interval.seconds + " seconds");
      }

      announcement.push("has elapsed.");

      Speech.speak(announcement.join(" "));
    }
  }

  // increments the time forward and announces if timer has finished
  function timeStart() {
    prevDiffRef.current = 0;
    console.log("Timer started");

    const startTime = Date.now();

    const id = setInterval(() => {
      let next;
      const currentTime = Date.now();
      const difference = Math.floor((currentTime - startTime) / 1000);

      checkElapsed(difference);

      setTime((prev) => {
        const change = difference - prevDiffRef.current;
        prevDiffRef.current = difference;
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - change;

        if (totalSeconds <= 0) {
          next = { hours: 0, minutes: 0, seconds: 0 };
          clearInterval(id);
          setOptionsDisabled(() => ({
            ...prev,
            timer: false,
          }));
          Speech.speak("Timer has ended.");
        } else {
          next = {
            hours: Math.floor(totalSeconds / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
          };
        }

        setAlarmString(formatTime(next));

        return next;
      });
    }, 1000);

    setId((prevId) => {
      if (prevId) clearInterval(prevId);
      return id;
    });
  }

  return (
    <Pressable
      style={homeStyle.pressable}
      onPress={() => {
        setOptionsDisabled(() => ({
          start: true,
          stop: false,
          reset: false,
          interval: true,
          timer: true,
        }));
        timeStart();
      }}
      disabled={optionsDisabled.start}
    >
      <Text style={{ color: "#8C8C8C" }}>Start</Text>
    </Pressable>
  );
}
