import {
    ActivityIndicator,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useIsFocused } from "@react-navigation/native";
  
  import { db, auth } from "../firebase";
  import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
  
  import MapView from "react-native-maps";
  import customMarker from "../assets/marker.png";
  import * as Location from "expo-location";
  import { Marker } from "react-native-maps";
  
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

  import Styles from "../styles/Styles";

  
  /**
   * Modal enabling user to add new locations
   * @param {*} navigation
   * @param {*} props
   * TO DO: Define each prop?
   * @returns {JSX.Element}
   */
  
  const LocationNew = ({ navigation, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const inFocus = useIsFocused();
    const [locationName, setLocationName] = useState("");
    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [shortHeight, setShortHeight] = useState(0);
    const [width, setWidth] = useState(Dimensions.get("window").width);
    const [addressLoading, setAddressLoading] = useState(false);
    const [location, setLocation] = useState({});
  
    // When user returns to screen, reload data
    useEffect(() => {
      if (inFocus) {
        setLoading(true);
      }
    }, [inFocus]);
  
    // Keep track of state of keyboard
    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
        setKeyboardStatus(true);
        onKeyboardDidShow(e);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus(false);
      });
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
  
    // Reduce height on map, if keyword is in use
    const onKeyboardDidShow = (e) => {
      setShortHeight(
        Dimensions.get("window").height - e.endCoordinates.height - 250
      );
    };
  
    // Access user location data
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          // Use default set of coordinates
          setCoords({ latitude: 51.5229, longitude: 0.1308 });
          return;
        }
  
        // Permission granted
        let location = await Location.getCurrentPositionAsync({});
        // Default map to user's location
        setUserLocation(location);
        setCoords(location.coords);
      })();
    }, []);
  
    // Return user to previous screen
    const goBack = () => {
      props.onClose();
    };
  
    // If selection made, pass data to previous screen
    const onLocationSelect = (location) => {
      props.onSelectLocation(location);
      goBack();
    };
  
    // Get address of Marker
    useEffect(() => {
      (async () => {
        if (coords.latitude && addressLoading) {
          await Location.reverseGeocodeAsync(coords)
            .then((address) => {
            setLocation(address[0])
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setAddressLoading(false);
      })();
    }, [addressLoading, coords]);
  
    // When user stops dragging marker, set coords and initiate getting address
    let markerDragEnded = (e) => {
      setAddressLoading(true);
      setCoords(e.nativeEvent.coordinate);
    };
  
    // Add location / site to db
      const addLocation = async () => {
        if (locationName === "") {
          setErrorMessage("Please enter a location name");
          return;
        }
        if (location) {
          let loc = {
            name: locationName,
            location: location,
            latitude: coords.latitude,
            longitude: coords.longitude,
            userId: auth.currentUser.uid,
            createdAt: new Date(),
          };
      
          try {
            const docRef = await addDoc(collection(db, "locations"), loc);
            console.log("Document written with ID: ", docRef.id);
            loc.id = docRef.id;
            setSuccessMessage("Location added!");
            onLocationSelect(loc);
          } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage(error.message);
          }
        }
      };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ marginTop: "1%" }}
      >
        {/* Header back button */}
        <Pressable onPress={goBack}>
          <Text style={[Styles.plusButtonText, Styles.paddingVertical]}>
            {" "}
            Back{" "}
          </Text>
        </Pressable>
        {/* If coords are set, show Map */}
        {/* Otherwise show 'Map Loading' */}
        {coords.latitude ? (
          <MapView
            style={
              !keyboardStatus
                ? Styles.mapSetMarker
                : { width: width, height: shortHeight }
            }
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.4822,
              longitudeDelta: 0.3221,
            }}
          >
            {/* Draggable marker; position defaults to user location */}
            <Marker
              draggable
              coordinate={coords}
              onDrag={(e) => {
                setCoords(e.nativeEvent.coordinate);
              }}
              onDragEnd={(e) => markerDragEnded(e)}
            >
              <Image source={customMarker} style={{ width: 60, height: 80 }} />
            </Marker>
          </MapView>
        ) : (
          <View style={Styles.mapSetMarker}>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ marginTop: "50%" }}
            />
            <Text style={{ alignSelf: "center", marginVertical: 25 }}>
              Map Loading...
            </Text>
          </View>
        )}
        <SafeAreaView>
          {/* Instructions to drag pin  */}
          <View>
            <Text
              style={{ alignSelf: "center", color: "black", marginVertical: 10 }}
            >
              Drag the pin to your planned location
            </Text>
          </View>
          {/* Input for name of new dive site / location */}
          <View style={[Styles.mapViewTextContainer]}>
            <TextInput
              style={[Styles.input, { width: "50%", height: 40 }]}
              onChangeText={(text) => setLocationName(text)}
              placeholder="Location Name"
              onSubmitEditing={Keyboard.dismiss}
            />
            {/* While address is loading, show "Add" button as disabled */}
            {/* Otherwise show 'Add' button */}
            {addressLoading ? (
              <TouchableOpacity
                disabled
                style={[
                  Styles.buttonPrimary,
                  Styles.section,
                  Styles.buttonPrimarySmall,
                  { marginTop: 18 },
                ]}
                onPress={addLocation}
              >
                <ActivityIndicator size="small" color="#00ff00" />
                <Text style={Styles.locationButtonText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                    Styles.buttonPrimary,
                    Styles.section,
                    Styles.buttonPrimarySmall,
                  { marginTop: 18 },
                ]}
                onPress={addLocation}
              >
                <MaterialCommunityIcons
                  name="map-marker-check"
                  size={20}
                  color="white"
                />
                <Text style={Styles.locationButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };
  
  export default LocationNew;
  