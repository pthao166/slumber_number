import homeStyle from "@/styles/HomeStyle";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

// allows user to select the duration of the timer
export function TimerPicker({
  setIntervalString,
  setInterval,
  setOriginal,
  setOptionsDisabled,
  optionsDisabled,
  alarmString,
  setAlarmString,
  setTime,
  formatTime,
}) {
  const [showPicker, setShowPicker] = useState(false);

  // checks that the selection is non-zero and resets the interval selection
  function checkTimer(pickedDuration) {
    if (
      pickedDuration.hours === 0 &&
      pickedDuration.minutes === 0 &&
      pickedDuration.seconds === 0
    ) {
      Alert.alert(
        "Error",
        "Cannot select 0 for the timer.",
        [
          {
            text: "Confirm",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      setShowPicker(false);

      setAlarmString(formatTime(pickedDuration));
      setTime(pickedDuration);
      setOriginal(pickedDuration);

      setOptionsDisabled((prev) => ({
        ...prev,
        interval: false,
        start: true,
      }));

      setIntervalString("00:00");
      setInterval({ minutes: 0, seconds: 0 });
    }
  }

  return (
    <View style={homeStyle.picker}>
      <Text style={{ fontSize: 18, color: "#202020", alignSelf: "center" }}>
        {alarmString !== null ? "Timer set for" : "No timer set"}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        disabled={optionsDisabled.timer}
        onPress={() => setShowPicker(true)}
      >
        <View style={{ alignItems: "center" }}>
          {alarmString !== null ? (
            <Text style={{ color: "#202020", fontSize: 48 }}>
              {alarmString}
            </Text>
          ) : null}

          <TouchableOpacity
            disabled={optionsDisabled.timer}
            activeOpacity={0.7}
            onPress={() => {
              setShowPicker(true);
            }}
          >
            <View style={{ marginTop: 30 }}>
              <Text style={homeStyle.text}>Set Timer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TimerPickerModal
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        onConfirm={(pickedDuration) => {
          checkTimer(pickedDuration);
        }}
        setIsVisible={setShowPicker}
        styles={{
          theme: "light",
          pickerColumnWidth: {
            hours: 90,
          },
        }}
        visible={showPicker}
        initialValue={{ hours: 0, minutes: 0, seconds: 0 }}
      />
    </View>
  );
}
