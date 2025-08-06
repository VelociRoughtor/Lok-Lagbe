import { View, Text, StyleSheet } from 'react-native';

export default function HireScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hire Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
});
