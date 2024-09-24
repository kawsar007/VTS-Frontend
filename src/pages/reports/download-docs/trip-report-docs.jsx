/* eslint-disable react/prop-types */
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { InvoiceTitle, ReportInfoTableBody, ReportInfoTableHead, styles } from "../../../common/reports-docs/docsFile";
import { formatEpochToDateForTripReport } from "../../../utils/select-time-utility";
// import { invoice_data } from "./InvoiceData";

const TripReportDocs = ({
  reports,
  startTime,
  endTime,
  selectedVehicle,
  todayFormattedDate,
}) => {
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
    reports.slice(0, 10).map((report) => (
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
        <ReportInfoTableHead title='Report Title' subtitle='Trip Report Details.' />
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
        {/* <TableTotal /> */}
      </Page>
    </Document>
  );
};

export default TripReportDocs;
