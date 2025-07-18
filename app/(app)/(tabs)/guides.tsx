import React from "react";
import { Text, View } from "react-native";
import { Header } from "../../../components/Header"; // Adjust path if needed

const Guides = () => {
  return (
    <>
      <Header title="Guides" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-5xl text-secondary font-bold">Guides!</Text>
      </View>
    </>
  );
};

export default Guides;
