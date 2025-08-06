import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function WorkDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        if (!id) return;
        
        const docRef = doc(db, 'worked', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setWork({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert('Error', 'Work not found');
          router.back();
        }
      } catch (error) {
        console.error('Error fetching work:', error);
        Alert.alert('Error', 'Failed to load work details');
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]);

  const handleAccept = () => {
    Alert.alert(
      'Accept Work',
      'Are you sure you want to accept this work?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            // Here you would typically update the work status in Firestore
            // For now, we'll just navigate home
            router.replace('/');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3a125d" />
      </View>
    );
  }

  if (!work) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noWorkText}>Work details not available</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Format date if available
  const postedDate = work.createdAt?.toDate 
    ? work.createdAt.toDate().toLocaleDateString() 
    : 'Not available';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{work.jobTitle}</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{work.category}</Text>
          <Text style={[styles.status, 
            work.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
            {work.status}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{work.description}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>${work.price}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{work.location}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Posted On:</Text>
            <Text style={styles.detailValue}>{postedDate}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Posted By:</Text>
            <Text style={styles.detailValue}>
              {work.userId?.substring(0, 8)}...
            </Text>
          </View>
          
          {work.startDate && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>
                {work.startDate.toDate?.().toLocaleDateString() || 'Flexible'}
              </Text>
            </View>
          )}
          
          {work.endDate && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>End Date:</Text>
              <Text style={styles.detailValue}>
                {work.endDate.toDate?.().toLocaleDateString() || 'Flexible'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={handleAccept}
        >
          <Text style={styles.buttonText}>Accept Work</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for buttons
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noWorkText: {
    fontSize: 18,
    color: '#544d4d',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3a125d',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    fontSize: 16,
    color: '#19A7CE',
    fontStyle: 'italic',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#e8f5e9',
    color: '#4CAF50',
  },
  inactiveStatus: {
    backgroundColor: '#ffebee',
    color: '#F44336',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a125d',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#544d4d',
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a125d',
  },
  detailValue: {
    fontSize: 16,
    color: '#544d4d',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  backButton: {
    backgroundColor: '#6c757d',
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});