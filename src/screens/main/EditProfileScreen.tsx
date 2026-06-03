import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";
import { useAuthStore } from "../../store";

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, updateUser } = useAuthStore();

  const [fullName, setFullName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(
    user?.handle?.replace("@", "") ?? "",
  );
  const [bio, setBio] = useState(user?.bio ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [saving, setSaving] = useState(false);

  const isValid = fullName.trim().length > 0 && username.trim().length > 0;

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleSave = () => {
    if (!isValid) return;
    setSaving(true);
    setTimeout(() => {
      updateUser({
        name: fullName.trim(),
        handle: "@" + username.trim().toLowerCase(),
        initials: getInitials(fullName),
        bio: bio.trim(),
        location: location.trim(),
      });
      setSaving(false);
      navigation.goBack();
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              (!isValid || saving) && styles.saveBtnDisabled,
            ]}
            onPress={handleSave}
            disabled={!isValid || saving}
          >
            <Text style={styles.saveBtnText}>
              {saving ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {fullName ? getInitials(fullName) : (user?.initials ?? "SK")}
                </Text>
              </View>
              <TouchableOpacity style={styles.avatarEditBtn}>
                <Ionicons name="camera" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarHint}>Tap to change photo</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Full name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full name"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="words"
              />
            </View>

            {/* Username */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Username <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.usernameRow}>
                <View style={styles.atSign}>
                  <Text style={styles.atSignText}>@</Text>
                </View>
                <TextInput
                  style={styles.usernameInput}
                  value={username}
                  onChangeText={(text) =>
                    setUsername(
                      text
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .replace(/[^a-z0-9_.]/g, ""),
                    )
                  }
                  placeholder="yourhandle"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Bio */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell your Mbogi about yourself..."
                placeholderTextColor={colors.textMuted}
                multiline
                maxLength={160}
                textAlignVertical="top"
              />
              <Text style={styles.bioCount}>{bio.length}/160</Text>
            </View>

            {/* Location */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <TextInput
                  style={styles.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="e.g. Nairobi, Kenya"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Phone — readonly */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone number</Text>
              <View style={styles.phoneReadonly}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <Text style={styles.phoneReadonlyText}>
                  {user?.phone ?? ""}
                </Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.primary}
                  />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>
              <Text style={styles.phoneHint}>
                Phone number cannot be changed
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  saveBtnText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarHint: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
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
  phoneHint: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
});
