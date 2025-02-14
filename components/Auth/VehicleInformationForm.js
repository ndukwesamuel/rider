import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const VehicleInformationScreen = () => {
  const [transportService, setTransportService] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [frontView, setFrontView] = useState(null);
  const [rearView, setRearView] = useState(null);
  const [sideView, setSideView] = useState(null);
  const [carriageSpace, setCarriageSpace] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const pickDocument = async (setFile) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpeg", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (result.type !== "cancel") {
      setFile(result);
      console.log(result);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Vehicle Information</Text>
      <Text style={styles.subHeader}>Fill out all fields...</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Transport Service eg car, bike...</Text>
        <TextInput
          style={styles.input}
          value={transportService}
          onChangeText={setTransportService}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Plate Number</Text>
        <TextInput
          style={styles.input}
          value={plateNumber}
          onChangeText={setPlateNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Capacity</Text>
        <TextInput
          style={styles.input}
          value={vehicleCapacity}
          onChangeText={setVehicleCapacity}
        />
      </View>

      <Text style={styles.sectionTitle}>
        Upload Images of your bike, car, keke, bus, truck
      </Text>
      <Text style={styles.uploadNote}>Upload required images below...</Text>
      <Text style={styles.fileNote}>
        File should be 1MB below...pdf, jpg, png files only
      </Text>

      {[
        { label: "Front View", state: frontView, setState: setFrontView },
        { label: "Rear View", state: rearView, setState: setRearView },
        { label: "Side View", state: sideView, setState: setSideView },
        {
          label: "Carriage Space",
          state: carriageSpace,
          setState: setCarriageSpace,
        },
      ].map((item, index) => (
        <View key={index} style={styles.uploadSection}>
          <Text style={styles.label}>{item.label}</Text>
          <TouchableOpacity onPress={() => pickDocument(item.setState)}>
            <Text style={styles.browseText}>Browse</Text>
          </TouchableOpacity>
          {item?.state && (
            <Text style={styles.fileName}>{item.assets[0].name}</Text>
          )}
        </View>
      ))}

      {/* Terms & Conditions with Icon */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <Ionicons
          name={termsAccepted ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={termsAccepted ? "green" : "gray"}
        />
        <Text style={styles.checkboxText}>
          I have read, understood, and agreed to the{" "}
          <Text style={styles.termsLink}>terms and conditions</Text> of Foodmart
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} disabled={!termsAccepted}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: { padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#033500",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#033500",
    marginTop: 20,
  },
  uploadNote: { fontSize: 12, color: "#ff0000", marginTop: 5 },
  fileNote: { fontSize: 12, color: "#ff0000", marginBottom: 10 },
  uploadSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  browseText: { color: "#007BFF", fontWeight: "600" },
  fileName: { marginLeft: 10, color: "#333" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  checkboxText: { marginLeft: 5, fontSize: 12 },
  termsLink: { color: "#007BFF", textDecorationLine: "underline" },
  button: {
    backgroundColor: "#FF9F00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
};

export default VehicleInformationScreen;
