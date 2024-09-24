/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import logo from "./../../assets/geon-logo.png";

export const styles = StyleSheet.create({
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

export const InvoiceTitle = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Text style={styles.reportTitle}>Geon Technologies Ltd.</Text>
      <Image style={styles.logo} src={logo} />
    </View>
  </View>
);

export const ReportInfoTableHead = ({ title, subtitle }) => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>{title}</Text>
    </View>
    <View style={styles.theader}>
      <Text>: {subtitle}</Text>
    </View>
  </View>
);

export const ReportInfoTableBody = ({ infoData }) => (
  <>
    {infoData.map(({ label, value }, index) => (
      <View key={index} style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{label}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>: {value}</Text>
        </View>
      </View>
    ))}
  </>
);

export const TableHead = ({ columns }) => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    {columns.map((column, index) => (
      <View key={index} style={styles.theader}>
        <Text>{column}</Text>
      </View>
    ))}
  </View>
);

export const TableBody = ({ data }) => (
  <>
    {data.map((row, index) => (
      <View key={index} style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.tbody}>
          <Text>{row.date}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{row.totalDistance} km</Text>
        </View>
      </View>
    ))}
  </>
);
