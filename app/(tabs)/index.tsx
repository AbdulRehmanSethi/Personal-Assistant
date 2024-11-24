import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import App from "../../src/screens/app/App"

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <App />
    </SafeAreaView>
  )
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
