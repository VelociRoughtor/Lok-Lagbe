import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

const categories = [
  'Cleaning',
  'Plumbing',
  'Electrician',
  'Carpentry',
  'Painting',
  'Gardening',
  'Moving',
  'Cooking',
  'Babysitting',
  'Laundry',
  'AC Repair',
  'Pest Control',
  'Beauty',
  'Car Wash',
  'Computer Repair',
  'Mobile Repair',
  'Tutoring',
  'Photography',
  'Event Planning',
  'Security',
  'Other',
];

export default function PostYourWorkScreen() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [money, setMoney] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [category, setCategory] = useState(categories[0]);

  const [jobTitleError, setJobTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [moneyError, setMoneyError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const onSubmit = () => {
    setJobTitleError(false);
    setDescriptionError(false);
    setMoneyError(false);
    setLocationError(false);

    let hasError = false;

    if (!jobTitle.trim()) {
      setJobTitleError(true);
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError(true);
      hasError = true;
    }
    if (endDate < startDate || (endDate.getTime() === startDate.getTime() && endTime < startTime)) {
      alert('End date/time cannot be before start date/time');
      return;
    }
    if (!money.trim()) {
      setMoneyError(true);
      hasError = true;
    }
    if (!location.trim()) {
      setLocationError(true);
      hasError = true;
    }

    if (hasError) return;

    const postData = {
      jobTitle,
      description,
      startDateTime: combineDateTime(startDate, startTime),
      endDateTime: combineDateTime(endDate, endTime),
      money,
      location,
      images,
      category,
    };

    console.log('Post data:', postData);

    alert('Job posted successfully!');
    router.back();
  };

  const combineDateTime = (date: Date, time: Date) => {
    const dt = new Date(date);
    dt.setHours(time.getHours());
    dt.setMinutes(time.getMinutes());
    return dt;
  };

  const formatTime = (time: Date) =>
    time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Job Title</Text>
      <TextInput
        style={[styles.input, jobTitleError && styles.inputError]}
        placeholder="Enter job title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      {jobTitleError && <Text style={styles.errorText}>Job title is required</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput, descriptionError && styles.inputError]}
        placeholder="Enter job description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />
      {descriptionError && <Text style={styles.errorText}>Description is required</Text>}

      <Text style={styles.label}>Date and Time</Text>
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text>From: {startDate.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text>To: {endDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text>Start Time: {formatTime(startTime)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text>End Time: {formatTime(endTime)}</Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(e, time) => {
            setShowStartTimePicker(false);
            if (time) setStartTime(time);
          }}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(e, time) => {
            setShowEndTimePicker(false);
            if (time) setEndTime(time);
          }}
        />
      )}

      <Text style={styles.label}>Money Offered</Text>
      <TextInput
        style={[styles.input, moneyError && styles.inputError]}
        placeholder="Enter amount"
        value={money}
        onChangeText={setMoney}
        keyboardType="numeric"
      />
      {moneyError && <Text style={styles.errorText}>Money amount is required</Text>}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={[styles.input, locationError && styles.inputError]}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      {locationError && <Text style={styles.errorText}>Location is required</Text>}

      <Text style={styles.label}>Images (optional)</Text>
      <View style={styles.imageContainer}>
        {images.map((img, i) => (
          <Image key={i} source={{ uri: img.uri }} style={styles.image} />
        ))}
      </View>
      <Button title="Pick Images" onPress={pickImages} />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.submitButton}>
        <Button title="Submit" onPress={onSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#222',
  },
  label: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 30,
    alignSelf: 'center',
    width: '50%',
  },
});
