import homeStyle from "@/styles/HomeStyle";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

// allows user to select the interval in which they receieve a notification
export function IntervalPicker({
  intervalString,
  setIntervalString,
  setInterval,
  original,
  setOptionsDisabled,
  optionsDisabled,
}) {
  const [showPicker, setShowPicker] = useState(false);

  // formats interval string
  const formatInterval = ({
    minutes,
    seconds,
  }: {
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  // checks that the interval selection is non-zero or shorter than the timer duration
  function checkInterval(pickedDuration) {
    if (
      pickedDuration.minutes * 60 + pickedDuration.seconds >
      original.hours * 3600 + original.minutes * 60 + original.seconds
    ) {
      Alert.alert(
        "Error",
        "Cannnot select interval longer in duration than timer.",
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
    } else if (pickedDuration.minutes === 0 && pickedDuration.seconds === 0) {
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
      setOptionsDisabled((prev) => ({
        ...prev,
        start: false,
      }));
      setIntervalString(formatInterval(pickedDuration));
      setInterval(pickedDuration);

      // setStartDisabled(false);

      setShowPicker(false);
    }
    // setIntervalDisabled(true);
  }

  return (
    <View style={homeStyle.picker}>
      <Text style={{ fontSize: 18, color: "#202020", alignSelf: "center" }}>
        {intervalString !== null ? "Interval set for" : "No interval set"}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        // disabled={showSet}
        onPress={() => setShowPicker(true)}
        disabled={optionsDisabled.interval}
      >
        <View style={{ alignItems: "center" }}>
          {intervalString !== null ? (
            <Text style={{ color: "#202020", fontSize: 48 }}>
              {intervalString}
            </Text>
          ) : null}

          <TouchableOpacity
            // disabled={showSet}
            activeOpacity={0.7}
            onPress={() => {
              setShowPicker(true);
            }}
            disabled={optionsDisabled.interval}
          >
            <View style={{ marginTop: 30 }}>
              <Text style={homeStyle.text}>Set Interval</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TimerPickerModal
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        modalTitle="Set Interval"
        onCancel={() => setShowPicker(false)}
        onConfirm={(pickedDuration) => {
          checkInterval(pickedDuration);
        }}
        setIsVisible={setShowPicker}
        styles={{
          theme: "light",
          pickerColumnWidth: {
            minutes: 100,
            seconds: 100,
          },
        }}
        visible={showPicker}
        hideHours={true}
        initialValue={{ hours: 0, minutes: 0, seconds: 0 }}
      />
    </View>
  );
}
