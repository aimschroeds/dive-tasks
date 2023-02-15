import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  addButton: {
    backgroundColor: '#AA77FF',
    borderRadius: 5,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#AA77FF', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, minWidth: 70, alignItems: 'center',
},
    buttonPrimary: {
        height: 30,
        marginVertical: 6,
        padding: 6,
        paddingHorizontal: 15,
        backgroundColor: "#AA77FF",
        color: "white",
        width: "45%",
        textAlign: "center",
        marginHorizontal: "3%",
      },
      buttonPrimaryLarge: {
        width: "95%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -10,
      },
      buttonPrimarySmall: {
        width: "30%",
      },
      buttonSecondary: {
        backgroundColor: "#AA77FF", alignItems: "center", marginHorizontal: 20, marginVertical: 15,
      },
      buttonPlan: {
        backgroundColor: "#62CDFF", alignItems: "center", marginHorizontal: 20, marginVertical: 15,
      },
      buttonLowkey: {
        height: 30,
        padding: 6,
        paddingHorizontal: 10,
        backgroundColor: "transparent",
        color: "#AA77FF",
        width: "45%",
        textAlign: "center",
        marginHorizontal: "3%",

      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 18,
      },
      buttonSmallText: {
        color: "white",
        fontWeight: "700",
        fontSize: 12,
      },
      buttonTextLowkey: {
        color: "#AA77FF",
        fontWeight: "400",
        fontSize: 12,
      },
      carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      carouselSlider: {
        width: '90%',
        height: 40,
      },
      carouselImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
      },
      uploadImageButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      uploadImageButton: {
        backgroundColor: '#AA77FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      },
      uploadImageButtonText: {
        color: '#FFF',
        fontSize: 16,
      },      
      cellTitleText: {
        fontSize: 14,
        fontFamily: "Helvetica",
        fontWeight: "bold",
        color: "#62CDFF",
        // marginBottom: 5,
      },
      cellTitleTextWithMargin: {
        marginTop: 10,
        marginBottom: 20,
      },
      cellContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginVertical: 3,
        marginLeft: -20,
      },
      cellPrimaryView: {
        backgroundColor: "#F5F5F5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        width: "100%",
      },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      containerInput: {
        width: "80%",
      },
      containerButton: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
      },
      input: {
        height: 50,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: "#AA77FF",
      },
      imageCenter: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        alignSelf: "center",
      },
      linkText: {
        color: "black",
        fontSize: 16,
        marginVertical: 10,
        width: "100%",
      },
      messageSuccess: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#F5F5F5",
        color: "green",
      },
      messageError: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#F5F5F5",
        color: "red",
      },
      messageWarning: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#F5F5F5",
        color: "orange",
      },
      noImagesText: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'gray',
      },
      image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 10,
      },
      
      milestoneItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 8,
        paddingHorizontal: 0,
      },
      milestoneIcon: {
        marginLeft: 8,
        paddingVertical: 16,
      },
      milestoneName: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: -8,
        paddingVertical: 12,
      },
      milestoneCheckbox: {
        backgroundColor: "transparent",
        borderWidth: 0,
        marginRight: 8,
        // padding: 0,
      },
      milestoneContent: {
        flex: 1,
        marginLeft: 0,
      },
      notesContainer: {
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 24,
      },
      notesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      notesInput: {
        marginTop: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        minHeight: 120,
        padding: 8,
      },

      skillCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        marginLeft: -8,
        marginRight: 8, 
      },
      skillItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 4,
      },
      skillName: {
        fontSize: 14,
      },
      skillStatus: {
        fontSize: 14,
        color: "gray",
      },
      planContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 10,
      },
      planDetailsContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 10,
    },
    planDetailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    planDetailsStatus: {
        fontSize: 18,
        color: 'green',
        marginBottom: 10,
    },
    planDetailsCompletion: {
        fontSize: 18,
        marginBottom: 10,
    },
    planDetailsDate: {
        fontSize: 14,
        color: '#808080',
    },
    
      percentageText: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
      },
      planText: {
        fontSize: 18,
        marginLeft: 10,
      },
      row: {
        alignItems: "center", justifyContent: "space-between", flexDirection: "row"
      },
      skillInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingVertical: 4,
        flex: 1, marginRight: 10, minHeight: 40, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5,
    },
      skillText: {
          color: 'purple',
      },
      tableHeader: {
        fontSize: 16,
        fontFamily: "Helvetica",
        fontWeight: "bold",
        color: "#62CDFF",
        marginBottom: 5,
      },
      tableHeaderChild: {
        fontSize: 14,
        fontFamily: "Helvetica",
        fontWeight: "bold",
        color: "#AA77FF",
        marginBottom: 5,
      },
      tableRow: {
        flexDirection: "row",
        marginBottom: 10,
        width: "100%",
        flex: 1,
        alignSelf: "center",
        justifyContent: "space-around",
      },
      tableRowLeft: {
        justifyContent: "flex-start",
      },
      tableCellTitleText: {
        fontSize: 14,
        fontFamily: "Helvetica",
        fontWeight: "bold",
        color: "#62CDFF",
        // marginBottom: 5,
      },
      toggle: {
        paddingVertical: 5,
        borderRadius: 15,
        paddingHorizontal: 30,
        // marginRight: 15,
        width: "50%",
        alignItems: "center",
      },
      toggleSelected: {
        backgroundColor: "#AA77FF",
      },
      toggleText: {
        fontWeight: "bold",
      },
      toggleTextSelected: {
        color: "white",
      },
      toggleTextUnselected: {
        color: "gray",
      },
      toggleUnselected: {
        backgroundColor: "#F5F5F5",
      },
      uploadImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#AA77FF',
        borderStyle: 'dashed',
        borderRadius: 10,
         // Set width to full screen
         width: "90%",
        height: 80,
        marginBottom: 20,
        marginRight: 10,
        marginHorizontal: 16,
      },
      uploadImageIcon: {
        color: '#AA77FF',
      },
      imageRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      imageScroll: {
        flexDirection: 'row',
      },
      imageDeleteButton: {
        position: 'absolute',
        top: 5,
        right: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
      },
      imageScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      imageScrollButtonLeft: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
      },
    
      imageScrollButtonRight: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
      },
      paddingVertical: {
        // marginVertical: 5,
        paddingVertical: 15,
      },
      mapSetMarker: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 250,
      },
      mapViewContainer: {
        paddingHorizontal: 20,
        flexDirection: "column",
        alignContent: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
      },
      mapViewTextContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
      },
      section: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        // alignContent: 'space-between',
        // marginTop: -30,
      },
      locationButtonText: {
        color: "white",
        marginLeft: 10,
      },
      plusButtonText: {
        color: "#AA77FF",
        paddingHorizontal: 10,
      },
      map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 200,
      },
      locationLabel: {
        backgroundColor: '#AA77FF', // Choose the background color you prefer
        color: 'white', // Choose the text color you prefer
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 20, // This will make the corners very rounded
        marginBottom: 10,
        marginLeft: -16,
      },
      scheduleLabel: {
        backgroundColor: '#97DEFF', // Choose the background color you prefer
        color: 'white', // Choose the text color you prefer
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 20, // This will make the corners very rounded
        marginBottom: 10,
        marginLeft: 6,
      },
      profilePic: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderRadius: 50,
        marginLeft: "5%",
      },
      cellMinimalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2,
        marginVertical: 1,
      },
      profileText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        alignSelf: "center",
        // marginBottom: 10,
      },
      weatherIcon: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        borderRadius: 14,
        // marginLeft: "5%",
        backgroundColor: "#62CDFF",
        padding: 0,
      },
      weatherText: {
        fontSize: 14,
        textAlign: "left",
        alignSelf: "center",
        marginLeft: 10,
        // marginBottom: 10,
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalImage: {
        width: "100%",
        height: "100%",
      },
});