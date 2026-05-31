import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";

// ─── Post Types ───────────────────────────────────────────────
const POST_TYPES = [
  { id: "1", label: "Idea", icon: "bulb-outline", color: colors.warning },
  {
    id: "2",
    label: "Opportunity",
    icon: "star-outline",
    color: colors.primary,
  },
  { id: "3", label: "Career", icon: "briefcase-outline", color: colors.accent },
  { id: "4", label: "Finance", icon: "cash-outline", color: colors.info },
  { id: "5", label: "Tech", icon: "code-slash-outline", color: "#8B5CF6" },
  { id: "6", label: "Health", icon: "heart-outline", color: "#EF4444" },
];

const MAX_CHARS = 280;

export default function PostScreen() {
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [posting, setPosting] = useState(false);

  const charsLeft = MAX_CHARS - content.length;
  const isValid = content.trim().length > 0 && selectedType !== "";
  const isNearLimit = charsLeft <= 30;
  const isOverLimit = charsLeft < 0;

  const handlePost = () => {
    if (!isValid || isOverLimit) return;
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setContent("");
      setSelectedType("");
      alert("Post shared with your Mbogi!");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            style={[
              styles.postBtn,
              (!isValid || isOverLimit) && styles.postBtnDisabled,
            ]}
            onPress={handlePost}
            disabled={!isValid || isOverLimit || posting}
          >
            <Text style={styles.postBtnText}>
              {posting ? "Sharing..." : "Share"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Row */}
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SK</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Sereti</Text>
              <Text style={styles.userHandle}>@sereti_k</Text>
            </View>
          </View>

          {/* Text Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="What's on your mind? Share an idea, opportunity or story with your Mbogi..."
              placeholderTextColor={colors.textMuted}
              multiline
              value={content}
              onChangeText={setContent}
              maxLength={MAX_CHARS + 10}
              autoFocus
              textAlignVertical="top"
            />
          </View>

          {/* Character Counter */}
          <View style={styles.counterRow}>
            <View style={styles.counterBar}>
              <View
                style={[
                  styles.counterFill,
                  {
                    width: `${Math.min((content.length / MAX_CHARS) * 100, 100)}%`,
                    backgroundColor: isOverLimit
                      ? colors.error
                      : isNearLimit
                        ? colors.warning
                        : colors.primary,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.counterText,
                isNearLimit && { color: colors.warning },
                isOverLimit && { color: colors.error },
              ]}
            >
              {charsLeft}
            </Text>
          </View>

          {/* Post Type Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tag your post</Text>
            <View style={styles.typesGrid}>
              {POST_TYPES.map((type) => {
                const isSelected = selectedType === type.label;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeChip,
                      isSelected && {
                        backgroundColor: type.color + "20",
                        borderColor: type.color,
                      },
                    ]}
                    onPress={() =>
                      setSelectedType(isSelected ? "" : type.label)
                    }
                  >
                    <Ionicons
                      name={type.icon as any}
                      size={16}
                      color={isSelected ? type.color : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.typeChipText,
                        isSelected && {
                          color: type.color,
                          fontWeight: fonts.weights.bold,
                        },
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Add Media Row */}
          <View style={styles.mediaRow}>
            <Text style={styles.mediaLabel}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons
                  name="link-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for a great post</Text>
            <Text style={styles.tipItem}>
              · Use hashtags like #KenyanYouth or #NairobiTech to reach more
              people
            </Text>
            <Text style={styles.tipItem}>
              · Tag your post so the right Mbogi finds it
            </Text>
            <Text style={styles.tipItem}>
              · Keep it real — authentic posts get more engagement
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────
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
  headerTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  postBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postBtnDisabled: {
    backgroundColor: colors.textMuted,
  },
  postBtnText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  userHandle: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    minHeight: 140,
  },
  textInput: {
    fontSize: fonts.sizes.base,
    color: colors.textPrimary,
    lineHeight: 24,
    minHeight: 120,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  counterBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  counterFill: {
    height: "100%",
    borderRadius: 2,
  },
  counterText: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    fontWeight: fonts.weights.medium,
    minWidth: 28,
    textAlign: "right",
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  typesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  typeChipText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  mediaLabel: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
    color: colors.textSecondary,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 16,
  },
  mediaBtn: {
    padding: 4,
  },
  tipsContainer: {
    backgroundColor: colors.primaryLight,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  tipsTitle: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    marginBottom: 8,
  },
  tipItem: {
    fontSize: fonts.sizes.sm,
    color: colors.primaryDark,
    lineHeight: 20,
    marginBottom: 4,
  },
});
