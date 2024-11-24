import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const CallControls: React.FC<{
  isCallActive: boolean;
  connecting: boolean;
  startCall: () => void;
  endCall: () => void;
}> = ({ isCallActive, connecting, startCall, endCall }) => (
  <View style={styles.callControls}>
    {!isCallActive ? (
      <TouchableOpacity
        style={styles.startButton}
        onPress={startCall}
        disabled={connecting}
      >
        {connecting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Start Call</Text>
        )}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.endButton}
        onPress={endCall}
        disabled={connecting}
      >
        {connecting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>End Call</Text>
        )}
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  callControls: {
    flexDirection: "row",
    justifyContent: "space-around",
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

export default CallControls;
