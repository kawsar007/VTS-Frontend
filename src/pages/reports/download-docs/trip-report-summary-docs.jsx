/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import logo from "./../../../assets/geon-logo.png";
// import { invoice_data } from "./InvoiceData";

const TripReportSummaryDocs = ({
  reports,
  startTime,
  endTime,
  selectedVehicle,
  todayFormattedDate,
}) => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },
    titleContainer: { flexDirection: "row", marginTop: 24 },
    logo: { width: 90 },
    reportTitle: { fontSize: 16, textAlign: "center" },
    addressTitle: { fontSize: 11, fontStyle: "bold" },
    invoice: { fontWeight: "bold", fontSize: 20 },
    invoiceNumber: { fontSize: 11, fontWeight: "bold" },
    address: { fontWeight: 400, fontSize: 10 },
    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },
    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Text style={styles.reportTitle}>Geon Technologies Ltd.</Text>
        <Image style={styles.logo} src={logo} />
      </View>
    </View>
  );

  const InfoTableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Report Title</Text>
      </View>
      <View style={styles.theader}>
        <Text>: Trip Report Summary</Text>
      </View>
    </View>
  );

  const InfoTableBody = () => (
    <div>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Vehicle</Text>
        </View>
        <View style={styles.tbody}>
          <Text>: {selectedVehicle}</Text>
        </View>
      </View>

      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Owner</Text>
        </View>
        <View style={styles.tbody}>
          <Text>: Milk Vita (milkvita)</Text>
        </View>
      </View>

      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Report Time</Text>
        </View>
        <View style={styles.tbody}>
          <Text>
            {startTime} - {endTime}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>Report Date</Text>
        </View>
        <View style={styles.tbody}>
          <Text> {todayFormattedDate} </Text>
        </View>
      </View>
    </div>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Start Loca</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>End Loca</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Start Time</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>End Time</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Duration</Text>
      </View>
      <View style={styles.theader}>
        <Text>Traveled Distance</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Avg Speed</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Max Speed</Text>
      </View>
    </View>
  );
  const TableBody = () =>
    reports.map((report) => (
      <div key={report.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {report.startLocation
                ? `${report.startLocation.latitude}, ${report.startLocation.longitude}`
                : "N/A"}
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {report.endLocation
                ? `${report.endLocation.latitude}, ${report.endLocation.longitude} km`
                : "N/A"}{" "}
            </Text>
          </View>

          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{report.startTime || "N/A"}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.endTime || "N/A"}</Text>
          </View>

          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {report.duration
                ? `${report.duration.toFixed(2)} minutes`
                : "N/A"}
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {report.distance ? `${report.distance.toFixed(2)} km` : "N/A"}
            </Text>
          </View>

          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {report.averageSpeed
                ? `${report.averageSpeed.toFixed(2)} km/h`
                : "N/A"}
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.maxSpeed ? `${report.maxSpeed} km/h` : "N/A"}</Text>
          </View>
        </View>
      </div>
    ));

  // const TableTotal = () => (
  //   <View style={{ width: "100%", flexDirection: "row" }}>
  //     <View style={styles.total}>
  //       <Text></Text>
  //     </View>
  //     <View style={styles.total}>
  //       <Text> </Text>
  //     </View>
  //     <View style={styles.tbody}>
  //       <Text>Total</Text>
  //     </View>
  //     <View style={styles.tbody}>
  //       <Text>
  //         {reports.items.reduce(
  //           (sum, item) => sum + item.price * item.qty,
  //           0,
  //         )}
  //       </Text>
  //     </View>
  //   </View>
  // );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <InvoiceTitle />
        <InfoTableHead />
        <InfoTableBody />
        <TableHead />
        <TableBody />
        {/* <TableTotal /> */}
      </Page>
    </Document>
  );
};

export default TripReportSummaryDocs;
