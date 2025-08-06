import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { router } from 'expo-router';

const WorkHistoryScreen = () => {
  const [postedWorks, setPostedWorks] = useState<any[]>([]);
  const [acceptedWorks, setAcceptedWorks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          router.replace('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', uid));
        if (!userDoc.exists()) {
          Alert.alert('Error', 'User data not found');
          return;
        }

        const userData = userDoc.data();
        const postedIds = userData.postedWorks || [];
        const acceptedIds = userData.acceptedWorks || [];

        const fetchWorkDocs = async (ids: string[]) => {
          const workDocs = await Promise.all(
            ids.map(async (id: string) => {
              const docSnap = await getDoc(doc(db, 'worked', id));
              return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
            })
          );
          return workDocs.filter(Boolean);
        };

        const posted = await fetchWorkDocs(postedIds);
        const accepted = await fetchWorkDocs(acceptedIds);

        setPostedWorks(posted);
        setAcceptedWorks(accepted);

        // Fetch related notifications for accepted works
        const notifQuery = query(
          collection(db, 'notifications'),
          where('toUserId', '==', uid)
        );
        const notifSnap = await getDocs(notifQuery);
        const notifs = notifSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(notifs);

      } catch (error) {
        console.error('Error fetching work data:', error);
        Alert.alert('Error', 'Failed to fetch work history');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

 

  const renderWorkCard = (work: any, isAccepted = false) => (
    <View key={work.id} style={styles.workCard}>
      <Text style={styles.workTitle}>{work.jobTitle}</Text>
      <Text style={styles.workCategory}>{work.category}</Text>
      <Text style={styles.workDescription}>{work.description}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Price:</Text>
        <Text style={styles.detailValue}>৳{work.price}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailValue}>{work.location}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text
          style={[
            styles.detailValue,
            work.status === 'active' ? styles.activeStatus : styles.inactiveStatus,
          ]}
        >
          {work.status}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Posted on:</Text>
        <Text style={styles.detailValue}>
          {work.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
        </Text>
      </View>

      {isAccepted && (
        <View style={styles.detailRow}>
          
          
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#146C94" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Your Posted Works</Text>
      {postedWorks.length === 0 ? (
        <Text style={styles.noWorksText}>No posted works found</Text>
      ) : (
        postedWorks.map(work => renderWorkCard(work))
      )}

      <Text style={styles.title}>✅ Your Accepted Works</Text>
      {acceptedWorks.length === 0 ? (
        <Text style={styles.noWorksText}>No accepted works found</Text>
      ) : (
        acceptedWorks.map(work => renderWorkCard(work, true))
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>⬅️ Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#146C94',
    marginBottom: 16,
    textAlign: 'center',
  },
  noWorksText: {
    fontSize: 16,
    color: '#544d4d',
    textAlign: 'center',
    marginBottom: 20,
  },
  workCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  workTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a125d',
    marginBottom: 4,
  },
  workCategory: {
    fontSize: 14,
    color: '#19A7CE',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  workDescription: {
    fontSize: 14,
    color: '#544d4d',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a125d',
  },
  detailValue: {
    fontSize: 14,
    color: '#544d4d',
  },
  activeStatus: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  inactiveStatus: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  seen: {
    color: 'green',
    fontWeight: 'bold',
  },
  unseen: {
    color: '#e89d07',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#146C94',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default WorkHistoryScreen;
