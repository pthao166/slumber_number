import homeStyle from "@/styles/HomeStyle";
import { Pressable, Text } from "react-native";

// clears the timer and enables the start button and interval selection
export default function ResetButton({
  id,
  original,
  setAlarmString,
  formatTime,
  setTime,
  setOptionsDisabled,
  optionsDisabled,
}) {
  return (
    <Pressable
      style={homeStyle.pressable}
      onPress={() => {
        clearInterval(id);
        setAlarmString(formatTime(original));
        setTime(original);
        setOptionsDisabled((prev) => ({
          start: false,
          stop: true,
          reset: true,
          interval: false,
          timer: false,
        }));
      }}
      disabled={optionsDisabled.reset}
    >
      <Text style={{ color: "#8C8C8C" }}>Reset</Text>
    </Pressable>
  );
}
