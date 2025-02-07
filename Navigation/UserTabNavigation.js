import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import Wallet from "../screens/Rider/Wallet/Wallet";
import Account from "../screens/Rider/Account/Account";
import MyDeliveries from "../screens/Rider/Deliveries/MyDeliveries";

const Tab = createBottomTabNavigator();

const UserTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.labelStyle,
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#F79B2C" : "grey"}
            />
          ),
        }}
      />
      {/* Wallet */}
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: "Wallet",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="credit-card"
              size={30}
              color={focused ? "#F79B2C" : "grey"}
            />
          ),
        }}
      />
      {/* Deliveries */}
      <Tab.Screen
        name="Deliveries"
        component={MyDeliveries}
        options={{
          tabBarLabel: "Deliveries",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              size={24}
              color={focused ? "#F79B2C" : "grey"}
            />
          ),
        }}
      />
      {/* Account */}
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-circle"
              size={24}
              color={focused ? "#F79B2C" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    height: 65,
    borderTopWidth: 0,
    elevation: 5,
    borderTopColor: "#ddd",
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 5,
    color: "#333",
  },
});

export default UserTabNavigation;
