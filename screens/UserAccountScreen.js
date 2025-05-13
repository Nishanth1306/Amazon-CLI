// import React, { useEffect, useState, useContext } from "react";
// import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
// import axios from "axios";
// import { UserType } from "../UserContext";
// import config from "../src/config";

// const UserAccountScreen = () => {
//   const { userId } = useContext(UserType);
//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`${config.API_URL}/profile/${userId}`);
//         setUser(response.data.user);
//       } catch (error) {
//         console.log("Error fetching user data:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <Text style={{ padding: 20 }}>Loading...</Text>;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Account Details</Text>

//       <View style={styles.detailBox}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.value}>{user.name}</Text>
//       </View>

//       <View style={styles.detailBox}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.value}>{user.email}</Text>
//       </View>

//       <View style={styles.detailBox}>
//         <Text style={styles.label}>Phone</Text>
//         <Text style={styles.value}>{user.phone}</Text>
//       </View>

//       <Text style={styles.addressTitle}>Saved Addresses</Text>
//       {user.addresses?.map((address, index) => (
//         <View key={index} style={styles.addressBox}>
//           <Text>{address.name}, {address.street},</Text>
//           <Text>{address.city}, {address.state} - {address.postalCode}</Text>
//           <Text>{address.country}</Text>
//           <Text>Phone: {address.phone}</Text>
        
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   detailBox: {
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: "bold",
//     color: "#555",
//   },
//   value: {
//     fontSize: 16,
//   },
//   addressTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   addressBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default UserAccountScreen;


import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import config from "../src/config";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const UserAccountScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/profile/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            setUserId(null);
            // Add any additional logout logic here
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", { user });
  };

  const handleEditAddress = (address) => {
    navigation.navigate("EditAddress", { address, userId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            const fetchUser = async () => {
              try {
                const response = await axios.get(`${config.API_URL}/profile/${userId}`);
                setUser(response.data.user);
              } catch (error) {
                console.log("Error fetching user data:", error);
                setError("Failed to load user data. Please try again.");
              } finally {
                setLoading(false);
              }
            };
            fetchUser();
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No user data found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
        <Pressable onPress={handleEditProfile}>
          <Icon name="edit" size={24} color="#4CAF50" />
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>
        
        <View style={styles.detailBox}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user.name || "Not provided"}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.value}>{user.email || "Not provided"}</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{user.phone || "Not provided"}</Text>
        </View>
      </View>

      <View style={styles.addressesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          <Pressable onPress={() => navigation.navigate("AddAddress", { userId })}>
            <Icon name="add" size={24} color="#4CAF50" />
          </Pressable>
        </View>

        {user.addresses?.length > 0 ? (
          user.addresses.map((address, index) => (
            <View key={index} style={styles.addressBox}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressName}>{address.name}</Text>
                <View style={styles.addressActions}>
                  <Pressable onPress={() => handleEditAddress(address)}>
                    <Icon name="edit" size={20} color="#2196F3" style={styles.actionIcon} />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.addressText}>{address.street}, {address.houseNo}</Text>
              <Text style={styles.addressText}>{address.city}, {address.state}</Text>
              <Text style={styles.addressText}>{address.country} - {address.postalCode}</Text>
              <Text style={styles.addressText}>Phone: {address.mobileNo || address.phone}</Text>
              {address.landmark && (
                <Text style={styles.addressText}>Landmark: {address.landmark}</Text>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noAddresses}>
            <Text style={styles.noAddressesText}>No saved addresses</Text>
            <Pressable 
              style={styles.addAddressButton}
              onPress={() => navigation.navigate("AddAddress", { userId })}
            >
              <Text style={styles.addAddressButtonText}>Add Address</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    marginBottom: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressesSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailBox: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 14,
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  addressBox: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  addressName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  addressActions: {
    flexDirection: "row",
  },
  actionIcon: {
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  noAddresses: {
    alignItems: "center",
    padding: 20,
  },
  noAddressesText: {
    color: "#888",
    marginBottom: 15,
  },
  addAddressButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  addAddressButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserAccountScreen;