import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default Header;
