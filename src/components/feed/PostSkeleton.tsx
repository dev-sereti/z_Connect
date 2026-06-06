import { View, StyleSheet } from "react-native";
import Skeleton from "../common/Skeleton";
import { colors } from "../../constants";

export default function PostSkeleton() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Skeleton width={44} height={44} borderRadius={22} />
        <View style={styles.headerText}>
          <Skeleton width="50%" height={14} />
          <View style={{ height: 6 }} />
          <Skeleton width="30%" height={12} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Skeleton width="100%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="100%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="70%" height={14} />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Skeleton width={60} height={28} borderRadius={14} />
        <Skeleton width={60} height={28} borderRadius={14} />
        <Skeleton width={60} height={28} borderRadius={14} />
        <Skeleton width={40} height={28} borderRadius={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
