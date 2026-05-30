import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, fonts } from "../../constants";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Account created! OTP sent to +254" + phone);
    }, 1500);
  };

  const isFormValid = fullName && username && phone;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Connect. Empower. Grow</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full name */}
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Amina Wanjiru"
            placeholderTextColor={colors.textMuted}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Username */}
          <Text style={styles.label}>Username</Text>
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
                setUsername(text.toLowerCase().replace(/\s/g, ""))
              }
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Phone */}
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>🇰🇪 +254</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="7XX XXX XXX"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={9}
            />
          </View>

          {/* Sign up button */}
          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || loading) && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating account..." : "Create account"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 8,
  },
  tagline: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    fontWeight: fonts.weights.medium,
    letterSpacing: 0.5,
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
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
  phoneRow: {
    flexDirection: "row",
    gap: 8,
  },
  countryCode: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  countryCodeText: {
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    fontWeight: fonts.weights.medium,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: colors.textMuted,
  },
  buttonText: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
});
