// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useState } from "react";
// import AuthNavigator from "./AuthNavigator";
// import MainNavigator from "./MainNavigator";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           <Stack.Screen name="Main" component={MainNavigator} />
//         ) : (
//           <Stack.Screen name="Auth" component={AuthNavigator} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// This file is no longer used.
// Navigation is handled directly in App.tsx
export {};
