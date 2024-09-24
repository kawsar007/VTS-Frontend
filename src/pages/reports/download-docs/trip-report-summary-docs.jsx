/* eslint-disable react/prop-types */
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../../../common/reports-docs/styles";
import logo from "./../../../assets/geon-logo.png";
// import { invoice_data } from "./InvoiceData";

const TripReportSummaryDocs = ({
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
      <View style={styles.theader}>
        <Text>Start Loca</Text>
      </View>
      <View style={styles.theader}>
        <Text>End Loca</Text>
      </View>
      <View style={styles.theader}>
        <Text>Start Time</Text>
      </View>
      <View style={styles.theader}>
        <Text>End Time</Text>
      </View>
      <View style={styles.theader}>
        <Text>Duration</Text>
      </View>
      <View style={styles.theader}>
        <Text>Travel Dist</Text>
      </View>
      <View style={styles.theader}>
        <Text>Avg Speed</Text>
      </View>
      <View style={styles.theader}>
        <Text>Max Speed</Text>
      </View>
    </View>
  );
  const TableBody = () =>
    reports.map((report) => (
      <div key={report.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={styles.tbody}>
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

          <View style={styles.tbody}>
            <Text>{report.startTime || "N/A"}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.endTime || "N/A"}</Text>
          </View>

          <View style={styles.tbody}>
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

          <View style={styles.tbody}>
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

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <InvoiceTitle />
        <InfoTableHead />
        <InfoTableBody />
        <TableHead />
        <TableBody />
      </Page>
    </Document>
  );
};

export default TripReportSummaryDocs;
