import homeStyle from "@/styles/HomeStyle";
import { Pressable, Text } from "react-native";

// stops the timer from incrementing and enables the start button
export default function StopButton({
  id,
  setOptionsDisabled,
  optionsDisabled,
}) {
  return (
    <Pressable
      style={homeStyle.pressable}
      onPress={() => {
        console.log("Stop Clicked.");

        setStopTime(Date.now());

        setOptionsDisabled((prev) => ({
          ...prev,
          start: false,
          stop: true,
        }));
        clearInterval(id);
      }}
      disabled={optionsDisabled.stop}
    >
      <Text style={{ color: "#8C8C8C" }}>Stop</Text>
    </Pressable>
  );
}
