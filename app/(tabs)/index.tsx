import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import HomeScreen from "../../src/screens/HomeScreen/HomeScreen";
import { Provider, useDispatch } from "react-redux";
import store from "../../src/redux/store";
import { loadFavoritesFromStorage } from "@/src/redux/slices/favoritesSlice";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Provider store={store}>
      <RootComponent />
    </Provider>
    </SafeAreaView>
  );
};

const RootComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
