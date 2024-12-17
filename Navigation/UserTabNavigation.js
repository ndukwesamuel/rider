// import React from "react";
// import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { AntDesign } from "@expo/vector-icons";
// import HomeScreen from "../screens/HomeScreen";

// // Tab Component
// const TabComponent = ({
//   focused,
//   iconFocused,
//   iconUnfocused,
//   containerStyle,
//   label,
//   textStyle,
// }) => {
//   return (
//     <View style={[containerStyle]}>
//       {focused ? (
//         <Image source={iconFocused} style={{ width: 25, height: 25 }} />
//       ) : (
//         <Image source={iconUnfocused} style={{ width: 25, height: 25 }} />
//       )}
//       <Text
//         style={[textStyle, { fontWeight: "400", fontFamily: "Inter-Regular" }]}
//       >
//         {label}
//       </Text>
//     </View>
//   );
// };

// // Custom Tab Button
// const CustomTabButton = ({ children, onPress, containerStyle }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         containerStyle,
//         {
//           top: -20,
//           alignItems: "center",
//           justifyContent: "center",
//         },
//       ]}
//       onPress={onPress}
//     >
//       <View
//         style={{
//           width: 60,
//           height: 60,
//           borderRadius: 36,
//           backgroundColor: "#04973C",
//           borderWidth: 5,
//           borderColor: "white",
//         }}
//       >
//         {children}
//       </View>
//       <Text
//         style={{ fontWeight: "400", fontFamily: "Inter-Regular", fontSize: 12 }}
//       >
//         Home
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const Tab = createBottomTabNavigator();

// const UserTabNavigation = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           height: 65,
//           ...styles.shadow,
//         },
//       }}
//     >
//       {/* Home Screen */}
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <AntDesign
//               name="home"
//               size={24}
//               color="white"
//               style={{ width: 25, height: 25 }}
//             />
//           ),
//           tabBarButton: (props) => <CustomTabButton {...props} />,
//         }}
//       />

//       {/* Guests Screen */}
//       {/* <Tab.Screen
//         name="Guests"
//         component={Guests}
//         options={{
//           title: "Guests",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabComponent
//               focused={focused}
//               iconFocused={require("../../assets/images/guest2.png")}
//               iconUnfocused={require("../../assets/images/guest.png")}
//               label="Guests"
//               containerStyle={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//               textStyle={{ color: "#000000" }}
//             />
//           ),
//         }}
//       /> */}

//       {/* Neighborhood Screen */}
//       {/* <Tab.Screen
//         name="Neighborhood"
//         component={Neigborhood}
//         options={{
//           title: "Chat",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabComponent
//               focused={focused}
//               iconFocused={require("../../assets/message-text2.png")}
//               iconUnfocused={require("../../assets/message-text.png")}
//               label="Chat"
//               containerStyle={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//               textStyle={{ color: "#000000" }}
//             />
//           ),
//         }}
//       /> */}

//       {/* Emergency Screen */}
//       {/* <Tab.Screen
//         name="Emergency"
//         component={Emergency}
//         options={{
//           title: "Emergency",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabComponent
//               focused={focused}
//               iconFocused={require("../../assets/images/emergency2.png")}
//               iconUnfocused={require("../../assets/images/emergency.png")}
//               label="Emergency"
//               containerStyle={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//               textStyle={{ color: "#000000" }}
//             />
//           ),
//         }}
//       /> */}

//       {/* Account Screen */}
//       {/* <Tab.Screen
//         name="Account"
//         component={Account}
//         options={{
//           title: "Account",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabComponent
//               focused={focused}
//               iconFocused={require("../../assets/images/Account2.png")}
//               iconUnfocused={require("../../assets/images/Account.png")}
//               label="Account"
//               containerStyle={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 top: 10,
//               }}
//               textStyle={{ color: "#000000" }}
//             />
//           ),
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "#7F5DF0",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default UserTabNavigation;

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
              size={24}
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
