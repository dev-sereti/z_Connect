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
import { useState, useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";

const OTP_LENGTH = 6;

type Props = {
  onLogin: () => void;
};

export default function OTPScreen({ onLogin }: Props) {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone, mode } = route.params;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (resendTimer === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value.length > 1) {
      const pasted = value.slice(0, OTP_LENGTH).split("");
      const filled = [...Array(OTP_LENGTH).fill("")];
      pasted.forEach((char, i) => {
        filled[i] = char;
      });
      setOtp(filled);
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      return;
    }
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
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
          <Text style={styles.heading}>Verify your number</Text>
          <Text style={styles.subheading}>We sent a 6-digit code to</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {Array(OTP_LENGTH)
            .fill(0)
            .map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  otp[index] ? styles.otpInputFilled : {},
                ]}
                maxLength={index === 0 ? OTP_LENGTH : 1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                selectTextOnFocus
              />
            ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.verifyBtn,
            (!isComplete || loading) && styles.verifyBtnDisabled,
          ]}
          onPress={handleVerify}
          disabled={!isComplete || loading}
        >
          <Text style={styles.verifyBtnText}>
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[
                styles.resendLink,
                !canResend && styles.resendLinkDisabled,
              ]}
            >
              {canResend ? "Resend" : `Resend in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Wrong number */}
        <TouchableOpacity
          style={styles.wrongNumber}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.wrongNumberText}>Wrong number? Go back</Text>
        </TouchableOpacity>
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
    marginBottom: 32,
  },
  logo: {
    width: 160,
    height: 160,
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  heading: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  phone: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    textAlign: "center",
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  verifyBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  verifyBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  verifyBtnText: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  resendText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  resendLinkDisabled: {
    color: colors.textMuted,
  },
  wrongNumber: {
    alignItems: "center",
  },
  wrongNumberText: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    textDecorationLine: "underline",
  },
});
