import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../constants";

// ─── Fake Data ───────────────────────────────────────────────
const CATEGORIES = [
  { id: "1", label: "All", active: true },
  { id: "2", label: "Tech", active: false },
  { id: "3", label: "Opportunities", active: false },
  { id: "4", label: "Finance", active: false },
  { id: "5", label: "Career", active: false },
  { id: "6", label: "Health", active: false },
  { id: "7", label: "Sports", active: false },
];

const TRENDING = [
  { id: "1", tag: "#KenyanYouth", posts: "12.4K posts" },
  { id: "2", tag: "#BuildInPublic", posts: "8.1K posts" },
  { id: "3", tag: "#ALXAfrica", posts: "6.7K posts" },
  { id: "4", tag: "#NairobiTech", posts: "5.2K posts" },
  { id: "5", tag: "#YouthEnterprise", posts: "4.8K posts" },
];

const SUGGESTED_PEOPLE = [
  {
    id: "1",
    name: "Wanjiku Mwangi",
    handle: "@wanjiku_m",
    initials: "WM",
    bio: "Software Engineer at Safaricom",
    followers: "2.3K",
  },
  {
    id: "2",
    name: "Odhiambo Kevin",
    handle: "@odhiambo_k",
    initials: "OK",
    bio: "Founder at NairobiHub",
    followers: "1.8K",
  },
  {
    id: "3",
    name: "Fatuma Ali",
    handle: "@fatuma_ali",
    initials: "FA",
    bio: "Medical student, UoN",
    followers: "980",
  },
  {
    id: "4",
    name: "Kipchoge Rono",
    handle: "@kipchoge_r",
    initials: "KR",
    bio: "Youth Advocate & Blogger",
    followers: "3.1K",
  },
];

const EXPLORE_POSTS = [
  {
    id: "1",
    user: "NairobiTech",
    handle: "@nairobitech",
    initials: "NT",
    time: "30m ago",
    content:
      "Google is offering 100 free cloud certifications to Kenyan developers this month. Apply via Google for Startups Africa. #NairobiTech #Google",
    likes: 892,
    comments: 134,
    tag: "Tech",
    tagColor: colors.info,
  },
  {
    id: "2",
    user: "Kenya Youth Fund",
    handle: "@kenyayouthfund",
    initials: "KY",
    time: "2h ago",
    content:
      "We are accepting applications for the 2024 Youth Innovation Grant. Winners receive KES 250,000 and 6 months of mentorship. Deadline: 30th December. #Opportunity",
    likes: 1204,
    comments: 312,
    tag: "Opportunity",
    tagColor: colors.primary,
  },
  {
    id: "3",
    user: "Career Kenya",
    handle: "@careerkenya",
    initials: "CK",
    time: "4h ago",
    content:
      "Top 5 in-demand skills for Kenyan graduates in 2024:\n\n1. Data Analysis\n2. Cloud Computing\n3. Digital Marketing\n4. UX Design\n5. Financial Modelling\n\nWhich are you learning? #CareerKenya",
    likes: 743,
    comments: 98,
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

// ─── Person Card ─────────────────────────────────────────────
function PersonCard({ item }: { item: (typeof SUGGESTED_PEOPLE)[0] }) {
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.personCard}>
      <Avatar initials={item.initials} size={48} />
      <View style={styles.personInfo}>
        <Text style={styles.personName}>{item.name}</Text>
        <Text style={styles.personHandle}>{item.handle}</Text>
        <Text style={styles.personBio}>{item.bio}</Text>
        <Text style={styles.personFollowers}>{item.followers} followers</Text>
      </View>
      <TouchableOpacity
        style={[styles.followBtn, following && styles.followingBtn]}
        onPress={() => setFollowing(!following)}
      >
        <Text
          style={[styles.followBtnText, following && styles.followingBtnText]}
        >
          {following ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Post Card ────────────────────────────────────────────────
function PostCard({ item }: { item: (typeof EXPLORE_POSTS)[0] }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar initials={item.initials} size={40} />
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
            name="share-social-outline"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Explore Screen ───────────────────────────────────────────
export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <FlatList
        data={EXPLORE_POSTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search people, topics, opportunities..."
                placeholderTextColor={colors.textMuted}
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesRow}
              contentContainerStyle={styles.categoriesContent}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    activeCategory === cat.label && styles.categoryChipActive,
                  ]}
                  onPress={() => setActiveCategory(cat.label)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      activeCategory === cat.label &&
                        styles.categoryChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Trending */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending in Kenya</Text>
              {TRENDING.map((item) => (
                <TouchableOpacity key={item.id} style={styles.trendingItem}>
                  <View>
                    <Text style={styles.trendingTag}>{item.tag}</Text>
                    <Text style={styles.trendingPosts}>{item.posts}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Suggested People */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>People to follow</Text>
              {SUGGESTED_PEOPLE.map((person) => (
                <PersonCard key={person.id} item={person} />
              ))}
            </View>

            {/* Posts heading */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending posts</Text>
            </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.sizes.md,
    color: colors.textPrimary,
  },
  categoriesRow: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  trendingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  trendingTag: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  trendingPosts: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 10,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  personHandle: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  personBio: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  personFollowers: {
    fontSize: fonts.sizes.xs,
    color: colors.primary,
    fontWeight: fonts.weights.medium,
    marginTop: 2,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  followingBtn: {
    backgroundColor: colors.primary,
  },
  followBtnText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
    color: colors.primary,
  },
  followingBtnText: {
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
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
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  avatarText: {
    fontWeight: fonts.weights.bold,
  },
});
