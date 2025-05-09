import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

const GEOAPIFY_API_KEY = "473e400a1cdb409ea64d7ef74d61f10b";

const AutoAddressForm = () => {
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
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
      return true; // iOS handles permissions differently
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
        name: data.name || "",
        street: data.street || data.address_line1 || "",
        city: data.city || data.town || data.village || "",
        state: data.state || "",
        postalCode: data.postcode || "",
        country: data.country || "",
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

      // First attempt: High accuracy with quick timeout
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

  const handleSubmit = () => {
    if (!formData.street || !formData.city || !formData.postalCode) {
      Alert.alert("Error", "Please fill in all required address fields");
      return;
    }
    
    Alert.alert("Address Submitted", JSON.stringify(formData, null, 2));

  };
  

  const retryLocation = () => {
    setLoading(true);
    setLocationError(null);
    fetchLocation();
  };

  if (loading && !manualEntry) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00CED1" />
        <Text style={styles.loadingText}>Detecting your location...</Text>
        <Button
          title="Enter Address Manually"
          onPress={() => setManualEntry(true)}
          color="#666"
        />
      </View>
    );
  }

  if (locationError && !manualEntry) {
    return (
      <View style={styles.container}>
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
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Address</Text>
      
      {Object.entries(formData).map(([key, value]) => (
        <TextInput
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          value={value}
          onChangeText={(text) => handleChange(key, text)}
          style={styles.input}
        />
      ))}
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Submit Address" 
          onPress={handleSubmit} 
          color="#00CED1"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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