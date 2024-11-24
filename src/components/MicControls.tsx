import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const MicControls: React.FC<{
  isMicActive: boolean;
  startMic: () => void;
  stopMic: () => void;
}> = ({ isMicActive, startMic, stopMic }) => (
  <View style={styles.micControls}>
    {!isMicActive ? (
      <TouchableOpacity style={styles.startButton} onPress={startMic}>
        <Text style={styles.buttonText}>Mic On 🎙️</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.endButton} onPress={stopMic}>
        <Text style={styles.buttonText}>Mic Off 🎙️</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  micControls: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#e9ecef",
  },
  startButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  endButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default MicControls;
