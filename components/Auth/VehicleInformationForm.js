import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  CheckBox,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

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

      {/* Upload Fields */}
      <View style={styles.uploadSection}>
        <Text style={styles.label}>Front View</Text>
        <TouchableOpacity onPress={() => pickDocument(setFrontView)}>
          <Text style={styles.browseText}>Browse</Text>
        </TouchableOpacity>
        {frontView && <Text style={styles.fileName}>{frontView.name}</Text>}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>Rear View</Text>
        <TouchableOpacity onPress={() => pickDocument(setRearView)}>
          <Text style={styles.browseText}>Browse</Text>
        </TouchableOpacity>
        {rearView && <Text style={styles.fileName}>{rearView.name}</Text>}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>Side View</Text>
        <TouchableOpacity onPress={() => pickDocument(setSideView)}>
          <Text style={styles.browseText}>Browse</Text>
        </TouchableOpacity>
        {sideView && <Text style={styles.fileName}>{sideView.name}</Text>}
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>Carriage Space</Text>
        <TouchableOpacity onPress={() => pickDocument(setCarriageSpace)}>
          <Text style={styles.browseText}>Browse</Text>
        </TouchableOpacity>
        {carriageSpace && (
          <Text style={styles.fileName}>{carriageSpace.name}</Text>
        )}
      </View>

      {/* Terms & Conditions */}
      <View style={styles.checkboxContainer}>
        {/* <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} /> */}
        <Text style={styles.checkboxText}>
          By clicking this box, I have read, understood and agreed to the{" "}
          <Text style={styles.termsLink}>terms and conditions</Text> of Foodmart
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
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
