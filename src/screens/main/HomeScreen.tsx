import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";

// ─── Fake Data ───────────────────────────────────────────────
const STORIES = [
  { id: "1", name: "You", initials: "Y" },
  { id: "2", name: "Amina", initials: "AM" },
  { id: "3", name: "Kamau", initials: "KN" },
  { id: "4", name: "Zawadi", initials: "ZO" },
  { id: "5", name: "Brian", initials: "BO" },
  { id: "6", name: "Aisha", initials: "AK" },
];

const POSTS = [
  {
    id: "1",
    user: "Amina Wanjiru",
    handle: "@amina_w",
    initials: "AW",
    time: "2m ago",
    content:
      "Just got accepted into the ALX Africa Software Engineering program! If you are a Kenyan youth looking to break into tech, apply now. Deadline is this Friday. #ALX #KenyanYouth #Tech",
    likes: 142,
    comments: 38,
    shares: 21,
    tag: "Opportunity",
    tagColor: colors.primary,
  },
  {
    id: "2",
    user: "Kamau Njoroge",
    handle: "@kamau_dev",
    initials: "KN",
    time: "15m ago",
    content:
      "Built my first React Native app today using zConnect as inspiration. The Kenyan tech scene is on fire right now. Who else is building something? Drop your project below. #BuildInPublic",
    likes: 89,
    comments: 24,
    shares: 12,
    tag: "Tech",
    tagColor: colors.info,
  },
  {
    id: "3",
    user: "Zawadi Ochieng",
    handle: "@zawadi_o",
    initials: "ZO",
    time: "1h ago",
    content:
      "Reminder: The Youth Enterprise Fund applications close next week. Up to KES 500,000 available for young entrepreneurs aged 18-35. Do not sleep on this opportunity! #YEF #KenyanEntrepreneur",
    likes: 310,
    comments: 67,
    shares: 89,
    tag: "Finance",
    tagColor: colors.warning,
  },
  {
    id: "4",
    user: "Brian Otieno",
    handle: "@brian_otieno",
    initials: "BO",
    time: "3h ago",
    content:
      "Thread: 10 free online certifications that Kenyan employers actually value in 2024.\n\n1. Google Digital Skills for Africa\n2. Cisco Networking Academy\n3. HubSpot Marketing\n\n#CareerTips #Kenya",
    likes: 521,
    comments: 103,
    shares: 214,
    tag: "Career",
    tagColor: colors.accent,
  },
];

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({
  initials,
  size = 44,
  color = colors.primary,
}: {
  initials: string;
  size?: number;
  color?: string;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color + "20",
          borderColor: color,
        },
      ]}
    >
      <Text style={[styles.avatarText, { color, fontSize: size * 0.35 }]}>
        {initials}
      </Text>
    </View>
  );
}

// ─── Story Item ───────────────────────────────────────────────
function StoryItem({ item }: { item: (typeof STORIES)[0] }) {
  return (
    <TouchableOpacity style={styles.storyItem}>
      <Avatar initials={item.initials} size={56} />
      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

// ─── Post Card ────────────────────────────────────────────────
function PostCard({ item }: { item: (typeof POSTS)[0] }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Avatar initials={item.initials} size={44} />
        <View style={styles.postMeta}>
          <View style={styles.postMetaTop}>
            <Text style={styles.postUser}>{item.user}</Text>
            <View
              style={[
                styles.postTag,
                { backgroundColor: item.tagColor + "20" },
              ]}
            >
              <Text style={[styles.postTagText, { color: item.tagColor }]}>
                {item.tag}
              </Text>
            </View>
          </View>
          <Text style={styles.postHandle}>
            {item.handle} · {item.time}
          </Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? colors.like : colors.textSecondary}
          />
          <Text style={[styles.actionText, liked && { color: colors.like }]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="repeat-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="share-social-outline"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Home Screen ──────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>SK</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Sereti Kamau</Text>
            <Text style={styles.headerHandle}>@sereti_k</Text>
            <Text style={styles.headerMbogi}>12 Mbogi</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="add" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons
              name="mail-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Stories */}
            <View style={styles.storiesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {STORIES.map((story) => (
                  <StoryItem key={story.id} item={story} />
                ))}
              </ScrollView>
            </View>
            <View style={styles.divider} />
          </>
        }
        renderItem={({ item }) => <PostCard item={item} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  headerInfo: {
    justifyContent: "center",
  },
  headerName: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  headerHandle: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    lineHeight: 16,
  },
  headerMbogi: {
    fontSize: fonts.sizes.xs,
    color: colors.primary,
    fontWeight: fonts.weights.semibold,
    lineHeight: 16,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  storiesContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingLeft: 12,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
    width: 64,
  },
  storyName: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  avatarText: {
    fontWeight: fonts.weights.bold,
  },
  divider: {
    height: 8,
    backgroundColor: colors.background,
  },
  postCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  postMeta: {
    flex: 1,
  },
  postMetaTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  postUser: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  postTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  postTagText: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.semibold,
  },
  postHandle: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  postContent: {
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
});
