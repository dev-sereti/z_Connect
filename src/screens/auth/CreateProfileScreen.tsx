import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";
import { useAuthStore } from "../../store";

type Props = {
  onLogin: (phone: string) => void;
};

export default function CreateProfileScreen({ onLogin }: Props) {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone } = route.params;
  const { updateUser } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = fullName.trim().length > 0 && username.trim().length > 0;

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleCreate = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(phone);
      updateUser({
        name: fullName.trim(),
        handle: "@" + username.trim().toLowerCase(),
        initials: getInitials(fullName),
        phone,
        bio: bio.trim(),
        location: location.trim() || "Kenya",
        joined:
          "Joined " +
          new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
        posts: 0,
        mbogi: 0,
        following: 0,
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create your profile</Text>
          <Text style={styles.subheading}>Tell your Mbogi who you are</Text>
        </View>

        {/* Avatar Preview */}
        <View style={styles.avatarPreviewContainer}>
          <View style={styles.avatarPreview}>
            <Text style={styles.avatarPreviewText}>
              {fullName ? getInitials(fullName) : "SK"}
            </Text>
          </View>
          <TouchableOpacity style={styles.avatarEditBtn}>
            <Ionicons name="camera-outline" size={16} color={colors.primary} />
            <Text style={styles.avatarEditText}>Add photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <Text style={styles.label}>
            Full name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Amina Wanjiru"
            placeholderTextColor={colors.textMuted}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Username */}
          <Text style={styles.label}>
            Username <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.usernameRow}>
            <View style={styles.atSign}>
              <Text style={styles.atSignText}>@</Text>
            </View>
            <TextInput
              style={styles.usernameInput}
              placeholder="yourhandle"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={(text) =>
                setUsername(
                  text
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .replace(/[^a-z0-9_.]/g, ""),
                )
              }
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Bio */}
          <Text style={styles.label}>
            Bio <Text style={styles.optional}>(optional)</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Tell your Mbogi a little about yourself..."
            placeholderTextColor={colors.textMuted}
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={160}
            textAlignVertical="top"
          />
          <Text style={styles.bioCount}>{bio.length}/160</Text>

          {/* Location */}
          <Text style={styles.label}>
            Location <Text style={styles.optional}>(optional)</Text>
          </Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.locationInput}
              placeholder="e.g. Nairobi, Kenya"
              placeholderTextColor={colors.textMuted}
              value={location}
              onChangeText={setLocation}
              autoCapitalize="words"
            />
          </View>

          {/* Phone — readonly */}
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneReadonly}>
            <Ionicons name="call-outline" size={18} color={colors.textMuted} />
            <Text style={styles.phoneReadonlyText}>{phone}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={[
            styles.createBtn,
            (!isValid || loading) && styles.createBtnDisabled,
          ]}
          onPress={handleCreate}
          disabled={!isValid || loading}
        >
          <Text style={styles.createBtnText}>
            {loading ? "Creating your profile..." : "Join zConnect"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By joining, you agree to zConnect's Terms of Service and Privacy
          Policy.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  heading: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subheading: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
  },
  avatarPreviewContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarPreviewText: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  avatarEditBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  avatarEditText: {
    fontSize: fonts.sizes.sm,
    color: colors.primary,
    fontWeight: fonts.weights.medium,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  required: {
    color: colors.error,
  },
  optional: {
    color: colors.textMuted,
    fontWeight: fonts.weights.regular,
    fontSize: fonts.sizes.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: fonts.sizes.base,
    color: colors.textPrimary,
  },
  usernameRow: {
    flexDirection: "row",
    gap: 8,
  },
  atSign: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  atSignText: {
    fontSize: fonts.sizes.lg,
    color: colors.primary,
    fontWeight: fonts.weights.bold,
  },
  usernameInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: fonts.sizes.base,
    color: colors.textPrimary,
  },
  bioInput: {
    height: 100,
    paddingTop: 14,
  },
  bioCount: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    textAlign: "right",
    marginTop: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  locationInput: {
    flex: 1,
    fontSize: fonts.sizes.base,
    color: colors.textPrimary,
  },
  phoneReadonly: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  phoneReadonlyText: {
    flex: 1,
    fontSize: fonts.sizes.base,
    color: colors.textSecondary,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    fontSize: fonts.sizes.xs,
    color: colors.primary,
    fontWeight: fonts.weights.semibold,
  },
  createBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  createBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  createBtnText: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  terms: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
});
