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
});