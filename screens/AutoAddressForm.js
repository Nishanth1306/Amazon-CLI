import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Button, Alert, ActivityIndicator,PermissionsAndroid,Platform,StyleSheet,Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "../UserContext";  
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import config from "../src/config";

const GEOAPIFY_API_KEY = "473e400a1cdb409ea64d7ef74d61f10b";

const AutoAddressForm = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    country: "India",
    street: "",
    city: "",
    postalCode: "",
    houseNo: "",
    landmark: "",
  });
  const [manualEntry, setManualEntry] = useState(false);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location to autofill your address.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn("Permission error:", err);
      return false;
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`
      );

      if (!response.data.features || response.data.features.length === 0) {
        throw new Error("No address found for this location");
      }

      const data = response.data.features[0]?.properties;
      return {
        name: "",
        mobileNo: "",
        street: data.street || data.address_line1 || "",
        city: data.city || data.town || data.village || "",
        postalCode: data.postcode || "",
        country: data.country || "",
        houseNo: data.house_number || "",
        landmark: data.landmark || "",
      };
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  };

  const fetchLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLocationError("Location permission denied. Please enable in settings.");
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const address = await reverseGeocode(latitude, longitude);
            setFormData(address);
            setLoading(false);
          } catch (error) {
            setLocationError("Address lookup failed. Please enter manually.");
            setLoading(false);
          }
        },
        (error) => {
          console.warn("High accuracy failed:", error);

          Geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const address = await reverseGeocode(latitude, longitude);
                setFormData(address);
              } catch (error) {
                setLocationError("Couldn't determine precise location.");
              } finally {
                setLoading(false);
              }
            },
            (error) => {
              console.error("Location error:", error);
              setLocationError("Location unavailable. Please enable GPS or enter manually.");
              setLoading(false);
            },
            {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 30000
            }
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0
        }
      );
    } catch (error) {
      console.error("Location fetch error:", error);
      setLocationError("Location service error. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${config.API_URL}/addresses`, {
        userId,
        address: formData
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });  
      setFormData({
        name: "",
        mobileNo: "",
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        postalCode: "",
        country: "India",
      });
      
      setTimeout(() => navigation.goBack(), 500);
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "Failed to save address. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const retryLocation = () => {
    setLoading(true);
    setLocationError(null);
    fetchLocation();
  };

  if (loading && !manualEntry) {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00CED1" />
        <Text style={styles.loadingText}>Detecting your location...</Text>
        <Button
          title="Enter Address Manually"
          onPress={() => setManualEntry(true)}
          color="#666"
        />
      </View>
      </SafeAreaView>
    );
  }

  if (locationError && !manualEntry) {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{locationError}</Text>
        <View style={styles.buttonGroup}>
          <Button title="Retry Location" onPress={retryLocation} />
          <View style={styles.buttonSpacer} />
          <Button
            title="Enter Manually"
            onPress={() => setManualEntry(true)}
            color="#666"
          />
        </View>
      </View>
      </SafeAreaView>
    );
  }

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Your Address</Text>
            {Object.entries(formData).map(([key, value]) => (
              <View key={key} style={styles.inputGroup}>
                <Text style={styles.label}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
                <TextInput
                  value={value}
                  onChangeText={(text) => handleChange(key, text)}
                  style={styles.input}
                  placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}`}
                  placeholderTextColor="#999"
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Button 
                title={isSubmitting ? "Saving..." : "Submit Address"}
                onPress={handleSubmit}
                color="#FFAC1C"
                disabled={isSubmitting}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  loadingText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginBottom: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSpacer: {
    width: 15,
  },
});

export default AutoAddressForm;