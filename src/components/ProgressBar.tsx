import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar: React.FC<{
  progress: { position: number; duration: number };
}> = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View
      style={[
        styles.progressBar,
        {
          width: progress.duration
            ? `${(progress.position / progress.duration) * 100}%`
            : "0%",
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  progressBarContainer: { height: 10, backgroundColor: "red", width: "100%" },
  progressBar: { height: "100%", backgroundColor: "#007bff" },
});

export default ProgressBar;
