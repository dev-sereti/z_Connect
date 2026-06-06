import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";
import { useAuthStore, usePostStore } from "../../store";
import PostSkeleton from "../../components/feed/PostSkeleton";

// ─── Stories ─────────────────────────────────────────────────
const STORIES = [
  { id: "1", name: "You", initials: "Y" },
  { id: "2", name: "Amina", initials: "AM" },
  { id: "3", name: "Kamau", initials: "KN" },
  { id: "4", name: "Zawadi", initials: "ZO" },
  { id: "5", name: "Brian", initials: "BO" },
  { id: "6", name: "Aisha", initials: "AK" },
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
function PostCard({ item }: { item: any }) {
  const { likePost } = usePostStore();

  return (
    <View style={styles.postCard}>
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

      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => likePost(item.id)}
        >
          <Ionicons
            name={item.liked ? "heart" : "heart-outline"}
            size={20}
            color={item.liked ? colors.like : colors.textSecondary}
          />
          <Text
            style={[styles.actionText, item.liked && { color: colors.like }]}
          >
            {item.likes}
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
  const { user } = useAuthStore();
  const { posts } = usePostStore();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {user?.initials ?? "SK"}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>
              {user?.name ?? "Sereti Kamau"}
            </Text>
            <Text style={styles.headerHandle}>
              {user?.handle ?? "@sereti_k"}
            </Text>
            <Text style={styles.headerMbogi}>{user?.mbogi ?? 0} Mbogi</Text>
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

      {/* Feed */}
      {loading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostSkeleton />
          <View style={styles.divider} />
          <PostSkeleton />
          <View style={styles.divider} />
          <PostSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="newspaper-outline"
                  size={48}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.emptyTitle}>No posts yet</Text>
              <Text style={styles.emptyMessage}>
                Be the first to share something with your Mbogi. Ideas,
                opportunities, stories — anything goes.
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => navigation.navigate("Post")}
              >
                <Text style={styles.emptyBtnText}>Create a post</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
    paddingBottom: 40,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  emptyBtnText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
});
