import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppScreen from "../components/shared/AppScreen";
const HomeScreen = () => {
  const [isAvailable, setIsAvailable] = React.useState(true);
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  console.log({
    ddd: user_profile_data?.data?.name,
  });
  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.userText}>
            Hi {user_profile_data?.data?.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={styles.toggleContainer}>
              {/* <Text style={styles.availableText}>Available</Text> */}
              <Switch
                value={isAvailable}
                onValueChange={() => setIsAvailable(!isAvailable)}
                thumbColor="#fff"
                trackColor={{ true: "#04973C", false: "#ddd" }}
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View styw> */}
        <View
          style={{
            backgroundColor: "#D9D9D9",
            height: 135,
            width: 358,
            alignSelf: "center",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        {/* </View> */}

        {/* Orders Section */}
        <Text style={styles.newOrders}>🔔 New Orders</Text>
        <View style={styles.card}>
          <Text style={styles.orderId}>#E8F99P</Text>
          <Text style={styles.time}>5 min away</Text>

          <View style={styles.userInfo}>
            <Image
              source={{
                uri: user_data?.data?.profile_picture_url,
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userName}>Johnny Doormane</Text>
              <Text style={styles.price}>₦3,000</Text>
              <Text style={styles.rating}>⭐ 4.0</Text>
            </View>
          </View>

          <View style={styles.travelInfo}>
            <Text>123 address, street name</Text>
            <Text style={styles.estimatedTime}>
              Estimated travel time: 1hr 30minutes
            </Text>
            <Text>456 building name</Text>
          </View>

          <View style={styles.orderDetails}>
            <Text>x1 Special Rice</Text>
            <Text>₦15,000</Text>
          </View>

          <View style={styles.orderDetails}>
            <Text>x3 Special Rice</Text>
            <Text>₦25,000</Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>₦42,500</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  userText: {
    fontSize: 24,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    marginRight: 10,
    color: "#333",
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  newOrders: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    padding: 15,
    elevation: 5,
  },
  orderId: {
    fontWeight: "600",
    fontSize: 18,
  },
  time: {
    color: "grey",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    color: "grey",
  },
  rating: {
    color: "#04973C",
  },
  travelInfo: {
    marginVertical: 10,
  },
  estimatedTime: {
    fontWeight: "600",
    marginVertical: 5,
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  totalText: {
    fontWeight: "600",
  },
  totalAmount: {
    fontWeight: "600",
    color: "#04973C",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#04973C",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  declineButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default HomeScreen;
