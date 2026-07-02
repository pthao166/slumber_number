import { StyleSheet } from "react-native";

const homeStyle = StyleSheet.create({
  overView: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    overflow: "hidden",
    borderColor: "#8C8C8C",
    color: "#8C8C8C",
  },
  buttonView: {
    // display: "flex",
    flexDirection: "row",
    margin: 40,
  },
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#8C8C8C",
    margin: 10,
  },
  picker: {
    margin: 40,
    justifyContent: "center",
  },
});

export default homeStyle;
