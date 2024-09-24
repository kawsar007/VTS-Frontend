/* eslint-disable react/prop-types */
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "../../../common/reports-docs/styles";
import logo from "./../../../assets/geon-logo.png";

const EngineStartStopDocs = ({
  engineStats,
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
        <Text>Time Range</Text>
      </View>
      <View style={styles.theader}>
        <Text>Duration</Text>
      </View>
      <View style={styles.theader}>
        <Text>Trav dist</Text>
      </View>
      <View style={styles.theader}>
        <Text>Avg. Speed</Text>
      </View>
      <View style={styles.theader}>
        <Text>Max Speed</Text>
      </View>

      <View style={styles.theader}>
        <Text>Location</Text>
      </View>
      <View style={styles.theader}>
        <Text>Status</Text>
      </View>
    </View>
  );
  const TableBody = () =>
    engineStats.map((report) => (
      <div key={report.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {report.startTime}
              {report.stopTime}
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.duration}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report?.travelledDistance}km</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report.avgSpeed} km/h</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{report?.maxSpeed} km/h</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              ({report?.location?.latitude},{report?.location?.longitude})
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>Off</Text>
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

export default EngineStartStopDocs;
