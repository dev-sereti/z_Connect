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
const TABS = ["All", "Mentions", "Follows", "Opportunities"];

const NOTIFICATIONS = [
  {
    id: "1",
    type: "like",
    user: "Amina Wanjiru",
    initials: "AW",
    action: "liked your post",
    preview: "Just got accepted into the ALX Africa...",
    time: "2m ago",
    read: false,
    tab: "All",
  },
  {
    id: "2",
    type: "follow",
    user: "Kamau Njoroge",
    initials: "KN",
    action: "started following you",
    preview: "",
    time: "10m ago",
    read: false,
    tab: "Follows",
  },
  {
    id: "3",
    type: "mention",
    user: "Zawadi Ochieng",
    initials: "ZO",
    action: "mentioned you in a post",
    preview: "Hey @sereti_k check out this opportunity...",
    time: "30m ago",
    read: false,
    tab: "Mentions",
  },
  {
    id: "4",
    type: "opportunity",
    user: "Kenya Youth Fund",
    initials: "KY",
    action: "posted a new opportunity",
    preview: "Youth Innovation Grant — KES 250,000 available",
    time: "1h ago",
    read: true,
    tab: "Opportunities",
  },
  {
    id: "5",
    type: "comment",
    user: "Brian Otieno",
    initials: "BO",
    action: "commented on your post",
    preview: "This is exactly what Kenyan youth need...",
    time: "2h ago",
    read: true,
    tab: "Mentions",
  },
  {
    id: "6",
    type: "follow",
    user: "Wanjiku Mwangi",
    initials: "WM",
    action: "started following you",
    preview: "",
    time: "3h ago",
    read: true,
    tab: "Follows",
  },
  {
    id: "7",
    type: "like",
    user: "Odhiambo Kevin",
    initials: "OK",
    action: "liked your post",
    preview: "Thread: 10 free online certifications...",
    time: "4h ago",
    read: true,
    tab: "All",
  },
  {
    id: "8",
    type: "opportunity",
    user: "NairobiTech",
    initials: "NT",
    action: "posted a new opportunity",
    preview: "Google is offering 100 free cloud certifications...",
    time: "5h ago",
    read: true,
    tab: "Opportunities",
  },
  {
    id: "9",
    type: "mention",
    user: "Fatuma Ali",
    initials: "FA",
    action: "mentioned you in a comment",
    preview: "@sereti_k you should apply for this grant!",
    time: "6h ago",
    read: true,
    tab: "Mentions",
  },
  {
    id: "10",
    type: "follow",
    user: "Kipchoge Rono",
    initials: "KR",
    action: "started following you",
    preview: "",
    time: "1d ago",
    read: true,
    tab: "Follows",
  },
];

// ─── Notification Icon ────────────────────────────────────────
function NotifIcon({ type }: { type: string }) {
  const config: Record<string, { icon: string; color: string }> = {
    like: { icon: "heart", color: colors.like },
    follow: { icon: "person-add", color: colors.primary },
    mention: { icon: "at", color: colors.info },
    comment: { icon: "chatbubble", color: colors.warning },
    opportunity: { icon: "star", color: colors.primary },
  };

  const { icon, color } = config[type] || {
    icon: "notifications",
    color: colors.primary,
  };

  return (
    <View style={[styles.notifIcon, { backgroundColor: color + "20" }]}>
      <Ionicons name={icon as any} size={16} color={color} />
    </View>
  );
}

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>
        {initials}
      </Text>
    </View>
  );
}

// ─── Notification Card ────────────────────────────────────────
function NotifCard({ item }: { item: (typeof NOTIFICATIONS)[0] }) {
  const [read, setRead] = useState(item.read);

  return (
    <TouchableOpacity
      style={[styles.notifCard, !read && styles.notifCardUnread]}
      onPress={() => setRead(true)}
    >
      {/* Unread dot */}
      {!read && <View style={styles.unreadDot} />}

      {/* Avatar + icon */}
      <View style={styles.avatarWrapper}>
        <Avatar initials={item.initials} size={46} />
        <View style={styles.notifIconWrapper}>
          <NotifIcon type={item.type} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.notifContent}>
        <Text style={styles.notifText}>
          <Text style={styles.notifUser}>{item.user} </Text>
          <Text style={styles.notifAction}>{item.action}</Text>
        </Text>
        {item.preview !== "" && (
          <Text style={styles.notifPreview} numberOfLines={1}>
            {item.preview}
          </Text>
        )}
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>

      {/* Follow back button */}
      {item.type === "follow" && (
        <TouchableOpacity style={styles.followBackBtn}>
          <Text style={styles.followBackText}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

// ─── Notifications Screen ─────────────────────────────────────
export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.tab === activeTab);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {TABS.map((tab) => (
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
        </ScrollView>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotifCard item={item} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>No notifications here yet</Text>
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
    gap: 8,
  },
  headerTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.bold,
    color: colors.white,
  },
  markAllRead: {
    fontSize: fonts.sizes.sm,
    color: colors.primary,
    fontWeight: fonts.weights.medium,
  },
  tabsWrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabs: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    fontWeight: fonts.weights.medium,
  },
  tabTextActive: {
    color: colors.white,
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    gap: 12,
  },
  notifCardUnread: {
    backgroundColor: colors.primaryLight,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    position: "absolute",
    left: 6,
    top: "50%",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  notifIconWrapper: {
    position: "absolute",
    bottom: -4,
    right: -4,
  },
  notifIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  notifContent: {
    flex: 1,
  },
  notifText: {
    fontSize: fonts.sizes.sm,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 2,
  },
  notifUser: {
    fontWeight: fonts.weights.bold,
  },
  notifAction: {
    fontWeight: fonts.weights.regular,
    color: colors.textSecondary,
  },
  notifPreview: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  followBackBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  followBackText: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.semibold,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.textMuted,
  },
});
