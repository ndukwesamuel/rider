import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For info icons

const RegistrationTypeScreen = ({ setAuthType }) => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <Text style={styles.title}>Registration Type Selection</Text>
      <Text style={styles.subtitle}>
        Please select a type of account you'd like to open below;
      </Text>

      {/* 3D Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/Foodmart/holding-hand.png")} // Ensure image exists in assets
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Selection Options */}
      <View style={styles.card}>
        {/* Option 1 */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setAuthType("signup")}
        >
          <Ionicons
            name={
              selectedType === "personal"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={20}
            color="black"
          />
          <Text style={styles.optionText}>Personal Account</Text>
          <Ionicons name="information-circle-outline" size={18} color="black" />
        </TouchableOpacity>

        {/* Option 2 */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedType("logistics")}
        >
          <Ionicons
            name={
              selectedType === "logistics"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={20}
            color="black"
          />
          <Text style={styles.optionText}>Third Party Logistics Provider</Text>
          <Ionicons name="information-circle-outline" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D7F6E", // Greenish background
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: -40, // Adjust positioning
  },
  illustration: {
    width: 250,
    height: 250,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});

export default RegistrationTypeScreen;
