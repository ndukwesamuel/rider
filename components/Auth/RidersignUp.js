import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import {
  CustomTextArea,
  Forminput,
  Forminputpassword,
  RadioButton,
  SelectInput,
} from "../shared/InputForm";
import { maincolors } from "../../utills/Themes";
import AppscreenLogo from "../shared/AppscreenLogo";

const API_BASEURL = "https://foodmart-backend.gigtech.site/api/";

const RidersignUp = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const changeStep = (type) => {
    setStep(type);
  };

  return (
    <AppscreenLogo>
      {step === 1 ? (
        <StepThreeSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 2 ? (
        <StepOneSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 3 ? (
        <StepThreeSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : step === 4 ? (
        <StepFourSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      ) : (
        <StepFourSignUp onSetAuth={onSetAuth} changeStep={changeStep} />
      )}
    </AppscreenLogo>
  );
};

export default RidersignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
    backgroundColor: maincolors.white,
  },
  header: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 12,
    lineHeight: 36,
    fontWeight: "400",
  },
  inputContainer: {
    gap: 20,
  },
  labels: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: maincolors.inputcolor, // "#ccc",
    backgroundColor: maincolors.inputcolor, // "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: maincolors.primary, //"#001272",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24.05,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 22.4,
    textAlign: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
  },
  halfInput: {
    width: "48%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const StepOneSignUp = ({ onSetAuth, changeStep }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    gender: "",
    date_of_birth: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const Registration_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/rider/register`;
      console.log({ url });
      return axios.post(url, data_info, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: (success) => {
        Toast.show({ type: "success", text1: success.data.message });
        dispatch(setOtpEmail(formData.email));
        changeStep(2);
      },
      onError: (error) => {
        Toast.show({ type: "error", text1: error?.response?.data?.message });
      },
    }
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Text style={styles.subHeader}>Let’s Get Started</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => handleInputChange("name", text)}
          value={formData.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange("email", text)}
          value={formData.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          onChangeText={(text) => handleInputChange("mobile_number", text)}
          value={formData.mobile_number}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Gender (optional)"
            onChangeText={(text) => handleInputChange("gender", text)}
            value={formData.gender}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Date of Birth (optional)"
            onChangeText={(text) => handleInputChange("date_of_birth", text)}
            value={formData.date_of_birth}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => handleInputChange("password", text)}
          value={formData.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          onChangeText={(text) =>
            handleInputChange("password_confirmation", text)
          }
          value={formData.password_confirmation}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={() => Registration_Mutation.mutate(formData)}
        disabled={Registration_Mutation?.isLoading}
      >
        {Registration_Mutation.isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </Pressable>

      <Text style={styles.footerText}>
        Already have an Account?{" "}
        <Text onPress={() => onSetAuth("sign-in")} style={styles.signInText}>
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
};

const StepTwoSignUp = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    relationship: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const NextOfKin_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/rider/onboarding/next-of-kin`;
      console.log({ url });
      return axios.post(url, data_info, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: (success) => {
        Toast.show({ type: "success", text1: success.data.message });
        changeStep(3);
      },
      onError: (error) => {
        Toast.show({ type: "error", text1: error?.response?.data?.message });
      },
    }
  );

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.header}>Next of Kin</Text>
        <Text style={styles.subHeader}>Fill out all fields...</Text>
      </View>

      <View style={{ gap: 10 }}>
        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Full Name</Text>
          <Forminput
            placeholder="Full Name"
            onChangeText={(text) => handleInputChange("name", text)}
            value={formData.name}
            style={styles.input}
          />
        </View>

        {/* Mobile Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Mobile Number</Text>
          <Forminput
            placeholder="Mobile Number"
            onChangeText={(text) => handleInputChange("mobile_number", text)}
            value={formData.mobile_number}
            style={styles.input}
          />
        </View>

        {/* Relationship to Rider */}
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>Relationship to Rider</Text>
          <Forminput
            placeholder="Relationship to Rider"
            onChangeText={(text) => handleInputChange("relationship", text)}
            value={formData.relationship}
            style={styles.input}
          />
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => NextOfKin_Mutation.mutate(formData)}
          >
            {NextOfKin_Mutation.isLoading ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const StepThreeSignUp = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    account_name: "",
    account_number: " ",
    bank_id: " ",
  });

  const otpemail = useSelector((state) => state?.OnboardingSlice);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const AddBankDetails_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/profile/bank-details`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.header}>Payment</Text>
          <Text
            style={[
              styles.subHeader,
              {
                textAlign: "center",
              },
            ]}
          >
            Fill out all fields...
          </Text>
        </View>

        <View style={{ gap: 10 }}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Account Name</Text>
            <Forminput
              placeholder="Account Name"
              onChangeText={(text) => handleInputChange("account_name", text)}
              value={formData.account_name}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Account Number</Text>
            <Forminput
              placeholder="Delivery Time Frame"
              onChangeText={(text) => handleInputChange("account_number", text)}
              value={formData.account_number}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Bank Name</Text>
            <Forminput
              placeholder="Bank"
              onChangeText={(text) => handleInputChange("bank_id", text)}
              value={formData.bank_id}
              style={styles.input}
            />
          </View>

          {/* Additional input fields */}

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => AddBankDetails_Mutation.mutate(formData)}
              style={styles.button}
            >
              {AddBankDetails_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const StepFourSignUp = ({ onSetAuth, changeStep }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Business_Name: "",
    Business_Registration_Number: "",
    Business_Address: "",
    Contact_Persons_Name: "",
    Contact_Persons_Email: "",
    Contact_Persons_Mobile_Number: "",
    Add_Emergency_Number: "",
    password: "",
    gender: "", // Added gender here
  });

  const otpemail = useSelector((state) => state?.OnboardingSlice);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const Registration_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}api/auth/signup`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        dispatch(checkOtp(true));
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleSignUp = () => {
    const { email, password, firstName, lastName, phoneNumber, homeAddress } =
      formData;
    dispatch(setOtpEmail(email));
    Registration_Mutation.mutate({
      email,
      password,
      userName: firstName,
      lastName,
      phoneNumber,
      homeLocation: homeAddress,
    });
  };

  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View style={{ gap: 10 }}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Have a Food Safety Certification?</Text>
            <Forminput
              placeholder="Account Name"
              onChangeText={(text) => handleInputChange("firstName", text)}
              value={formData.firstName}
              style={styles.input}
            />

            <View style={{ marginTop: 15 }}>
              <Text>Choose Gender:</Text>
              <RadioButton
                label="Male"
                selected={selectedOption === 1}
                onSelect={() => handleRadioSelect(1)}
              />
              <RadioButton
                label="Female"
                selected={selectedOption === 2}
                onSelect={() => handleRadioSelect(2)}
                inputStyle={styles.radioButton}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labels}>Input Quality Control Measures</Text>

            <CustomTextArea
              placeholder="Enter text here..."
              value={text}
              onChangeText={handleTextChange}
              style={{ width: "80%" }}
              inputStyle={{
                textAlignVertical: "top", // Ensures text starts from the top
                paddingTop: 10, // Add paddingTop to control vertical padding
                paddingBottom: 10, // Add paddingBottom to balance padding
                backgroundColor: "#F6F8FAE5",
                paddingHorizontal: 10,
                paddingTop: 10, // Add paddingTop to control the vertical padding
                paddingBottom: 10, // Add paddingBottom to balance the padding
                height: 100,
                borderRadius: 6,
                fontSize: 16,
              }}
            />
          </View>

          {/* Additional input fields */}

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => changeStep(3)} style={styles.button}>
              {Registration_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
