import { View, Text, StyleSheet } from 'react-native';

export default function WorksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Works Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
});
