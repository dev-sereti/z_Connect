import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/main/HomeScreen";
import ExploreScreen from "../screens/main/ExploreScreen";
import PostScreen from "../screens/main/PostScreen";
import NotificationsScreen from "../screens/main/NotificationsScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import { colors } from "../constants";

const Tab = createBottomTabNavigator();

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<
  string,
  { active: IoniconsName; inactive: IoniconsName }
> = {
  Home: {
    active: "home",
    inactive: "home-outline",
  },
  Explore: {
    active: "compass",
    inactive: "compass-outline",
  },
  Post: {
    active: "add-circle",
    inactive: "add-circle-outline",
  },
  Notifications: {
    active: "notifications",
    inactive: "notifications-outline",
  },
  Profile: {
    active: "person",
    inactive: "person-outline",
  },
};

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
