// Note: This is an adaptation of the code produced for the Mobile Development course 
// It is not an original work
import {
    ActivityIndicator,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useIsFocused } from "@react-navigation/native";
  
  import { db } from "../firebase";
  import { getFirestore, query, getDocs, collection } from "firebase/firestore";
  
  import MapView from "react-native-maps";
  import * as Location from "expo-location";
  import { Marker } from "react-native-maps";
  import customMarker from "../assets/marker.png";
  
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  
  
import LocationNew from "./LocationNew";
 
  
  import Styles from "../styles/Styles";
  
  /**
   * Enable user to set a location / dive site
   * @param {*} navigation
   * @param {*} props
   * @returns {JSX.Element}
   */
  
  const LocationSelection = ({ onClose, onSelect, selectedLocation }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [markersLoading, setMarkersLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [userLoc, setUserLoc] = useState(null);
    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [errorMessage, setErrorMessage] = useState(null);
    const inFocus = useIsFocused();
    const [newLocationModalVisible, setNewLocationModalVisible] =
      useState(false);
  
    // Update map when user returns to this screen
    useEffect(() => {
      // setLoading(true);
      if (inFocus) {
        setLoading(true);
      }
    }, [inFocus]);
  
    // If user returns to this screen, reload data
    if (selectedLocation?.name && loading) {
      let loc = selectedLocation;
      setLocation(loc);
      setLoading(false);
      setCoords(loc.coords);
    }
  
    // Access user location data
    useEffect(() => {
      (async () => {
        // Get permission for using user location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          setCoords({ latitude: 51.5229, longitude: 0.1308 });
          return;
        }
  
        // Permission granted
        // Get user location to use as default position on map
        let user_location = await Location.getCurrentPositionAsync({});
        setUserLoc(user_location);
        setCoords(user_location.coords);
      })();
    }, []);
  
    // Return user to previous screen
    const goBack = () => {
      onClose();
    };
  
    // Return location data to previous screen
    const onLocSelect = (location) => {
      setLocation(location);
      setCoords(location.coords);
      onSelect(location);
      onClose();
    };

  
    // Load locations onto map
    let loadLocations = async () => {
      const locRef = collection(db, "locations"); // Use collection function to get a reference to the collection
      const locQuery = query(locRef); // Use query function to create a query

      try {
        const querySnapshot = await getDocs(locQuery); // Use getDocs function to get the documents
        let eligibleLocations = [];
        querySnapshot.forEach((doc) => {
          let loc = {
            id: doc.id,
            name: doc.data().name,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            createdAt: doc.data().createdAt,
            location: doc.data().location,
            loading: true,
          };
          loc.loading = false;
          eligibleLocations.push(loc);
        });
        setLocations(eligibleLocations);
        setMarkersLoading(false);
        
      } catch (error) {
        console.log("Error getting locations: ", error);
      }
    };

    // Call loadLocations when the component mounts
    useEffect(() => {
      loadLocations();
    }, []);
  
    return (
      <View>
        {/* Load map with initial position set to user location if available */}
        {/* If coords are set, show Map */}
        {/* Otherwise show 'Map Loading' */}
        {coords?.latitude ? (
          <>
          <MapView
            style={Styles.map}
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.4822,
              longitudeDelta: 0.3221,
            }}
          >
            {/* Load locations to map as Markers */}
            {locations.map((loc, id) => (
              <Marker
                key={loc.id}
                coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                title={loc.name}
                onCalloutPress={() => onLocSelect (loc)}
              >
                <Image source={customMarker} style={{ width: 30, height: 40 }} />
              </Marker>
            ))}
          </MapView>
          {/* Button to open modal for adding a new location or dive site (not yet on map) */}
            <View style={[Styles.mapViewContainer]}>
            <Text
              style={{
                color: "grey",
                paddingVertical: 12,
                height: 30,
                paddingHorizontal: 10,
                backgroundColor: "white",
              }}
            >
              Is Your Location Not On The Map?
            </Text>
            <TouchableOpacity
              style={[Styles.buttonPrimary, Styles.section]}
              onPress={() => setNewLocationModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={20}
                color="white"
              />
              <Text style={Styles.locationButtonText}>Add Location</Text>
            </TouchableOpacity>
          </View></>
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
        
        {/* Modal for adding location / dive site */}
        <Modal
          animationType="slide"
          presentationStyle="pageSheet"
          visible={newLocationModalVisible}
          onRequestClose={() => {
            setNewLocationModalVisible(!newLocationModalVisible);
          }}
        >
          <LocationNew
            onClose={() => setNewLocationModalVisible(false)}
            onSelectLocation={(loc) => {
              onSelect(loc);
            }}
          />
        </Modal>
      </View>
    );
  };
  
  export default LocationSelection;
  