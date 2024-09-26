/* eslint-disable react/prop-types */
import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  InvoiceTitle,
  ReportInfoTableBody,
  ReportInfoTableHead,
  styles,
} from "../../../common/reports-docs/docsFile";
// import { invoice_data } from "./InvoiceData";

const TripReportSummaryDocs = ({
  reports,
  startTime,
  endTime,
  selectedVehicle,
  todayFormattedDate,
}) => {
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
        <ReportInfoTableHead
          title='Report Title'
          subtitle='Trip Report Summary'
        />
        <ReportInfoTableBody
          infoData={[
            { label: "Vehicle", value: selectedVehicle },
            { label: "Owner", value: "Milk Vita (milkvita)" },
            { label: "Report Time", value: `${startTime} - ${endTime}` },
            { label: "Report Date", value: todayFormattedDate },
          ]}
        />
        <TableHead />
        <TableBody />
      </Page>
    </Document>
  );
};

export default TripReportSummaryDocs;
