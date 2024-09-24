/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  Text,
  View
} from "@react-pdf/renderer";
import { styles } from "../../../common/reports-docs/styles";
import logo from "./../../../assets/geon-logo.png";
// import { invoice_data } from "./InvoiceData";

const DistanceReportDocs = ({
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
        <Text>Distance Traveled</Text>
      </View>
    </View>
  );
  const TableBody = () =>
    reports.map((report) => (
      <div key={report.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{report.date}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.totalDistance} km </Text>
          </View>
        </View>
      </div>
    ));

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

export default DistanceReportDocs;
