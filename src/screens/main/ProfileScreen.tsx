import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";
import { useAuthStore } from "../../store";

// ─── Fake Posts ───────────────────────────────────────────────
const USER_POSTS = [
  {
    id: "1",
    content:
      "Just launched zConnect — a social platform for Kenyan youth to share ideas, opportunities and stories. We are building something special for the next generation. #zConnect #KenyanYouth",
    likes: 234,
    comments: 56,
    shares: 89,
    time: "1d ago",
    tag: "Tech",
    tagColor: colors.info,
    liked: false,
  },
  {
    id: "2",
    content:
      "Attended the Nairobi Tech Summit today. The energy in the room was electric. Kenyan developers are building world-class solutions. Proud to be part of this movement. #NairobiTech",
    likes: 189,
    comments: 34,
    shares: 45,
    time: "3d ago",
    tag: "Career",
    tagColor: colors.accent,
    liked: false,
  },
  {
    id: "3",
    content:
      "Thread: How I got my first software engineering job in Kenya with zero experience.\n\n1. Started with free online courses\n2. Built 3 portfolio projects\n3. Contributed to open source\n\n#CareerTips #Kenya",
    likes: 521,
    comments: 103,
    shares: 214,
    time: "1w ago",
    tag: "Opportunity",
    tagColor: colors.primary,
    liked: false,
  },
];

const PROFILE_TABS = ["Posts", "Replies", "Likes"];

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>
        {initials}
      </Text>
    </View>
  );
}

// ─── Post Card ────────────────────────────────────────────────
function PostCard({ item }: { item: (typeof USER_POSTS)[0] }) {
  const [liked, setLiked] = useState(item.liked);
  const [likeCount, setLikeCount] = useState(item.likes);

  return (
    <View style={styles.postCard}>
      <View style={styles.postTop}>
        <View
          style={[styles.postTag, { backgroundColor: item.tagColor + "20" }]}
        >
          <Text style={[styles.postTagText, { color: item.tagColor }]}>
            {item.tag}
          </Text>
        </View>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
          }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={18}
            color={liked ? colors.like : colors.textSecondary}
          />
          <Text style={[styles.actionText, liked && { color: colors.like }]}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="chatbubble-outline"
            size={18}
            color={colors.textSecondary}
          />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="repeat-outline"
            size={18}
            color={colors.textSecondary}
          />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons
            name="share-social-outline"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Profile Screen ───────────────────────────────────────────
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Posts");
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <FlatList
        data={USER_POSTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostCard item={item} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListHeaderComponent={
          <>
            {/* Cover */}
            <View style={styles.cover}>
              <View style={styles.coverPattern}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <Text key={i} style={styles.coverText}>
                    zConnect{"  "}
                  </Text>
                ))}
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileSection}>
              <View style={styles.avatarRow}>
                <View style={styles.avatarBorder}>
                  <Avatar initials={user?.initials ?? "SK"} size={80} />
                </View>
                <View style={styles.profileActions}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate("EditProfile")}
                  >
                    <Ionicons
                      name="pencil-outline"
                      size={16}
                      color={colors.primary}
                    />
                    <Text style={styles.editBtnText}>Edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareBtn}>
                    <Ionicons
                      name="share-social-outline"
                      size={18}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Ionicons
                      name="log-out-outline"
                      size={18}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.profileName}>
                {user?.name ?? "Sereti Kamau"}
              </Text>
              <Text style={styles.profileHandle}>
                {user?.handle ?? "@sereti_k"}
              </Text>

              {user?.bio ? (
                <Text style={styles.profileBio}>{user.bio}</Text>
              ) : null}

              <View style={styles.profileMeta}>
                {user?.location ? (
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color={colors.textMuted}
                    />
                    <Text style={styles.metaText}>{user.location}</Text>
                  </View>
                ) : null}
                {user?.joined ? (
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color={colors.textMuted}
                    />
                    <Text style={styles.metaText}>{user.joined}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{user?.posts ?? 0}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{user?.mbogi ?? 0}</Text>
                  <Text style={styles.statLabel}>Mbogi</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{user?.following ?? 0}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsRow}>
              {PROFILE_TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.tabActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.tabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={48}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        }
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
  cover: {
    height: 120,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  coverPattern: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    opacity: 0.2,
  },
  coverText: {
    fontSize: fonts.sizes.lg,
    color: colors.white,
    fontWeight: fonts.weights.bold,
  },
  profileSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: -40,
    marginBottom: 12,
  },
  avatarBorder: {
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 44,
  },
  avatar: {
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  profileActions: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  editBtnText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
    color: colors.primary,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  profileHandle: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginBottom: 10,
  },
  profileBio: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  profileMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  tabsRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: fonts.weights.bold,
  },
  postCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  postTime: {
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
  divider: {
    height: 8,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.textMuted,
  },
});
