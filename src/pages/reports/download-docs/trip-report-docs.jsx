/* eslint-disable react/prop-types */
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../../../common/reports-docs/styles";
import { formatEpochToDateForTripReport } from "../../../utils/select-time-utility";
import logo from "./../../../assets/geon-logo.png";
// import { invoice_data } from "./InvoiceData";

const TripReportDocs = ({
  reports,
  startTime,
  endTime,
  selectedVehicle,
  todayFormattedDate,
}) => {
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
        <Text>Date</Text>
      </View>
      <View style={styles.theader}>
        <Text>Location</Text>
      </View>
      <View style={styles.theader}>
        <Text>Speed (km/h)</Text>
      </View>
      <View style={styles.theader}>
        <Text>Cumu Dist</Text>
      </View>
      <View style={styles.theader}>
        <Text>Engine</Text>
      </View>
    </View>
  );
  const TableBody = () =>
    reports.map((report) => (
      <div key={report.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{formatEpochToDateForTripReport(report.time)}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              ({report?.latitude}, {report.longitude})
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.speed}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.pdop}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report?.engine === 0 ? "OFF" : "ON"}</Text>
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

export default TripReportDocs;
