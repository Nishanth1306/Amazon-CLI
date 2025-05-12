// import React, { useState, useContext } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   ScrollView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { UserType } from "../UserContext";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import config from "../src/config";
// import { SafeAreaView } from "react-native-safe-area-context";

// const AutoPinScreen = () => {
//   const navigation = useNavigation();
//   const { userId } = useContext(UserType);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [pincodeLoading, setPincodeLoading] = useState(false);
//   const [pincodeError, setPincodeError] = useState(null);
//   const [pincode, setPincode] = useState("");
//   const [addressFetched, setAddressFetched] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNo: "",
//     country: "India",
//     state: "",
//     street: "",
//     city: "",
//     postalCode: "",
//     houseNo: "",
//     landmark: "",
//   });

//   const fetchAddressFromPincode = async (pincode) => {
//     if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
//       setPincodeError("Please enter a valid 6-digit pincode");
//       return;
//     }

//     setPincodeLoading(true);
//     setPincodeError(null);
    
//     try {
//       const response = await axios.get(
//         `https://api.postalpincode.in/pincode/${pincode}`
//       );

//       if (response.data && response.data[0]?.Status === "Success" && response.data[0]?.PostOffice?.length > 0) {
//         const postOffice = response.data[0].PostOffice[0];
//         setFormData({
//           name: "",
//           mobileNo: "",
//           country: "India",
//           state: postOffice.State || "",
//           street: postOffice.Name || "",
//           city: postOffice.District || postOffice.Block || "",
//           postalCode: pincode,
//           houseNo: "",
//           landmark: "",
//         });
//         setAddressFetched(true);
//       } else {
//         setPincodeError("No address found for this pincode");
//       }
//     } catch (error) {
//       console.error("Pincode lookup error:", error);
//       setPincodeError("Failed to fetch address. Please try again.");
//     } finally {
//       setPincodeLoading(false);
//     }
//   };

//   const handlePincodeChange = (text) => {
//     const cleanedText = text.replace(/\D/g, "");
//     setPincode(cleanedText);
//     setPincodeError(null);
//     setAddressFetched(false);

    
//     if (cleanedText.length === 6) {
//       fetchAddressFromPincode(cleanedText);
//     }
//   };

//   const handleChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const handleSubmit = async () => {
    
//     if (!formData.name || !formData.mobileNo || !formData.houseNo) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }

//     if (formData.mobileNo.length !== 10) {
//       Alert.alert("Error", "Please enter a valid 10-digit mobile number");
//       return;
//     }

//     if (!addressFetched) {
//       Alert.alert("Error", "Please enter a valid pincode first");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(
//         `${config.API_URL}/addresses`,
//         {
//           userId,
//           address: formData,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       Alert.alert("Success", "Address saved successfully!");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Submission error:", error);
//       Alert.alert(
//         "Error",
//         error.response?.data?.message || "Failed to save address. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <SafeAreaView edges={['top','left','right']}>
//     <View style={{ height: "100%" }}>
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.keyboardAvoidingView}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.container}>
//             <Text style={styles.title}>Enter Your Address</Text>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Pincode *</Text>
//               <View style={styles.pincodeContainer}>
//                 <TextInput
//                   value={pincode}
//                   onChangeText={handlePincodeChange}
//                   style={[styles.input, styles.pincodeInput]}
//                   placeholder="Enter 6-digit pincode"
//                   placeholderTextColor="#999"
//                   keyboardType="number-pad"
//                   maxLength={6}
//                 />
//                 {pincodeLoading && (
//                   <ActivityIndicator
//                     style={styles.pincodeLoader}
//                     size="small"
//                     color="#00CED1"
//                   />
//                 )}
//               </View>
//               {pincodeError && (
//                 <Text style={styles.errorText}>{pincodeError}</Text>
//               )}
//             </View>

//             {addressFetched && (
//               <>
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Name *</Text>
//                   <TextInput
//                     value={formData.name}
//                     onChangeText={(text) => handleChange("name", text)}
//                     style={styles.input}
//                     placeholder="Enter your full name"
//                     placeholderTextColor="#999"
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Mobile Number *</Text>
//                   <TextInput
//                     value={formData.mobileNo}
//                     onChangeText={(text) => handleChange("mobileNo", text)}
//                     style={styles.input}
//                     placeholder="Enter 10-digit mobile number"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>House/Flat No *</Text>
//                   <TextInput
//                     value={formData.houseNo}
//                     onChangeText={(text) => handleChange("houseNo", text)}
//                     style={styles.input}
//                     placeholder="Enter house/flat number"
//                     placeholderTextColor="#999"
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Street/Area</Text>
//                   <TextInput
//                     value={formData.street}
//                     onChangeText={(text) => handleChange("street", text)}
//                     style={styles.input}
//                     placeholder="Street/Area (auto-filled)"
//                     placeholderTextColor="#999"
//                     editable={false}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Landmark</Text>
//                   <TextInput
//                     value={formData.landmark}
//                     onChangeText={(text) => handleChange("landmark", text)}
//                     style={styles.input}
//                     placeholder="Enter nearby landmark (optional)"
//                     placeholderTextColor="#999"
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>City</Text>
//                   <TextInput
//                     value={formData.city}
//                     onChangeText={(text) => handleChange("city", text)}
//                     style={styles.input}
//                     placeholder="City (auto-filled)"
//                     placeholderTextColor="#999"
//                     editable={false}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>State</Text>
//                   <TextInput
//                     value={formData.state}
//                     onChangeText={(text) => handleChange("state", text)}
//                     style={styles.input}
//                     placeholder="State (auto-filled)"
//                     placeholderTextColor="#999"
//                     editable={false}
//                   />
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.label}>Country</Text>
//                   <TextInput
//                     value={formData.country}
//                     onChangeText={(text) => handleChange("country", text)}
//                     style={styles.input}
//                     placeholder="Country"
//                     placeholderTextColor="#999"
//                     editable={false}
//                   />
//                 </View>

//                 <View style={styles.buttonContainer}>
//                   <Button
//                     title={isSubmitting ? "Saving..." : "Save Address"}
//                     onPress={handleSubmit}
//                     color="#00CED1"
//                     disabled={isSubmitting}
//                   />
//                 </View>
//               </>
//             )}
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//     </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 30,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 25,
//     textAlign: "center",
//     color: "#333",
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#555",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     backgroundColor: "#f9f9f9",
//     color: "#333",
//   },
//   pincodeContainer: {
//     position: "relative",
//   },
//   pincodeInput: {
//     paddingRight: 40,
//   },
//   pincodeLoader: {
//     position: "absolute",
//     right: 15,
//     top: 15,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   errorText: {
//     color: "red",
//     marginTop: 5,
//     fontSize: 14,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 10,
//     color: "#333",
//   },
// });

// export default AutoPinScreen;



import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import config from "../src/config";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AddressForm = {
  name: string;
  mobileNo: string;
  country: string;
  state: string;
  street: string;
  city: string;
  postalCode: string;
  houseNo: string;
  landmark: string;
};

const AutoPinScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { userId } = useContext(UserType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");
  const [addressFetched, setAddressFetched] = useState(false);

  const [formData, setFormData] = useState<AddressForm>({
    name: "",
    mobileNo: "",
    country: "India",
    state: "",
    street: "",
    city: "",
    postalCode: "",
    houseNo: "",
    landmark: "",
  });

  const fetchAddressFromPincode = async (pin: string) => {
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setPincodeError("Please enter a valid 6-digit pincode");
      return;
    }

    setPincodeLoading(true);
    setPincodeError(null);

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);

      const postOffice = response.data[0]?.PostOffice?.[0];

      if (response.data[0]?.Status === "Success" && postOffice) {
        setFormData({
          name: "",
          mobileNo: "",
          country: "India",
          state: postOffice.State || "",
          street: postOffice.Name || "",
          city: postOffice.District || postOffice.Block || "",
          postalCode: pin,
          houseNo: "",
          landmark: "",
        });
        setAddressFetched(true);
      } else {
        setPincodeError("No address found for this pincode");
      }
    } catch (error) {
      console.error("Pincode fetch error:", error);
      setPincodeError("Failed to fetch address. Please try again.");
    } finally {
      setPincodeLoading(false);
    }
  };

  const handlePincodeChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    setPincode(cleaned);
    setPincodeError(null);
    setAddressFetched(false);

    if (cleaned.length === 6) {
      fetchAddressFromPincode(cleaned);
    }
  };

  const handleChange = (key: keyof AddressForm, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.mobileNo || !formData.houseNo) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (formData.mobileNo.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    if (!addressFetched) {
      Alert.alert("Error", "Please enter a valid pincode first");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        `${config.API_URL}/addresses`,
        {
          userId,
          address: formData,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Alert.alert("Success", "Address saved successfully!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Submission error:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Enter Your Address</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Pincode *</Text>
                  <View style={styles.pincodeContainer}>
                    <TextInput
                      value={pincode}
                      onChangeText={handlePincodeChange}
                      style={[styles.input, styles.pincodeInput]}
                      placeholder="Enter 6-digit pincode"
                      placeholderTextColor="#999"
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                    {pincodeLoading && (
                      <ActivityIndicator
                        style={styles.pincodeLoader}
                        size="small"
                        color="#00CED1"
                      />
                    )}
                  </View>
                  {pincodeError && (
                    <Text style={styles.errorText}>{pincodeError}</Text>
                  )}
                </View>

                {addressFetched && (
                  <>
                    {[
                      { label: "Name *", key: "name", placeholder: "Enter your full name" },
                      { label: "Mobile Number *", key: "mobileNo", placeholder: "Enter 10-digit mobile number", keyboardType: "phone-pad", maxLength: 10 },
                      { label: "House/Flat No *", key: "houseNo", placeholder: "Enter house/flat number" },
                      { label: "Landmark", key: "landmark", placeholder: "Enter nearby landmark (optional)" },
                    ].map((field) => (
                      <View style={styles.inputGroup} key={field.key}>
                        <Text style={styles.label}>{field.label}</Text>
                        <TextInput
                          value={formData[field.key as keyof AddressForm]}
                          onChangeText={(text) =>
                            handleChange(field.key as keyof AddressForm, text)
                          }
                          style={styles.input}
                          placeholder={field.placeholder}
                          placeholderTextColor="#999"
                          keyboardType={field.keyboardType as any}
                          maxLength={field.maxLength}
                        />
                      </View>
                    ))}

                    {[
                      { label: "Street/Area", key: "street" },
                      { label: "City", key: "city" },
                      { label: "State", key: "state" },
                      { label: "Country", key: "country" },
                    ].map((field) => (
                      <View style={styles.inputGroup} key={field.key}>
                        <Text style={styles.label}>{field.label}</Text>
                        <TextInput
                          value={formData[field.key as keyof AddressForm]}
                          onChangeText={(text) =>
                            handleChange(field.key as keyof AddressForm, text)
                          }
                          style={styles.input}
                          placeholder={`${field.label} (auto-filled)`}
                          placeholderTextColor="#999"
                          editable={false}
                        />
                      </View>
                    ))}

                    <View style={styles.buttonContainer}>
                      <Button
                        title={isSubmitting ? "Saving..." : "Save Address"}
                        onPress={handleSubmit}
                        color="#00CED1"
                        disabled={isSubmitting}
                      />
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 30 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 25, textAlign: "center", color: "#333" },
  inputGroup: { marginBottom: 20 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: "600", color: "#555" },
  input: { height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, backgroundColor: "#f9f9f9", color: "#333" },
  pincodeContainer: { position: "relative" },
  pincodeInput: { paddingRight: 40 },
  pincodeLoader: { position: "absolute", right: 15, top: 15 },
  buttonContainer: { marginTop: 20, borderRadius: 8, overflow: "hidden" },
  errorText: { color: "red", marginTop: 5, fontSize: 14 },
});

export default AutoPinScreen;
