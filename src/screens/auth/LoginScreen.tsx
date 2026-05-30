import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoginScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fonts.sizes.xl,
    color: colors.textPrimary,
    fontWeight: fonts.weights.bold,
  },
});
