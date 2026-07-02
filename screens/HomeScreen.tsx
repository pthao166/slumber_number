import { IntervalPicker } from "@/components/interval-picker";
import ResetButton from "@/components/reset-button";
import StartButton from "@/components/start-button";
import StopButton from "@/components/stop-button";
import { TimerPicker } from "@/components/timer-picker";
import homeStyle from "@/styles/HomeStyle";
import { useState } from "react";
import { View } from "react-native";

// home screen where the timer and interval selection
// start, stop and restart button is
export default function HomeScreen() {
  // imported timer componenent states
  const [alarmString, setAlarmString] = useState<string | null>(null);
  const [intervalString, setIntervalString] = useState<string | null>(null);

  // my states
  const [time, setTime] = useState<object>({});
  const [id, setId] = useState(0);
  const [original, setOriginal] = useState<object>({});
  const [interval, setInterval] = useState<object>({});

  const [optionsDisabled, setOptionsDisabled] = useState<object>({
    timer: false,
    interval: true,
    start: true,
    stop: true,
    reset: true,
  });

  // formats the time string
  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <View style={homeStyle.overView}>
      <TimerPicker
        setIntervalString={setIntervalString}
        setInterval={setInterval}
        setOriginal={setOriginal}
        setOptionsDisabled={setOptionsDisabled}
        optionsDisabled={optionsDisabled}
        alarmString={alarmString}
        setAlarmString={setAlarmString}
        setTime={setTime}
        formatTime={formatTime}
      />

      <IntervalPicker
        intervalString={intervalString}
        setIntervalString={setIntervalString}
        interval={interval}
        setInterval={setInterval}
        original={original}
        setOptionsDisabled={setOptionsDisabled}
        optionsDisabled={optionsDisabled}
      />

      <View style={homeStyle.buttonView}>
        <StartButton
          setAlarmString={setAlarmString}
          formatTime={formatTime}
          setTime={setTime}
          setId={setId}
          interval={interval}
          setOptionsDisabled={setOptionsDisabled}
          optionsDisabled={optionsDisabled}
        />

        <StopButton
          id={id}
          setId={setId}
          setOptionsDisabled={setOptionsDisabled}
          optionsDisabled={optionsDisabled}
        />

        <ResetButton
          id={id}
          setId={setId}
          original={original}
          setAlarmString={setAlarmString}
          formatTime={formatTime}
          setTime={setTime}
          setOptionsDisabled={setOptionsDisabled}
          optionsDisabled={optionsDisabled}
        />
      </View>
    </View>
  );
}
