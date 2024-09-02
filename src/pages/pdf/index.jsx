// import InvoiceComponent from "./InvoiceComponent";
// import InvoiceData from "./InvoiceData";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFGenerate = () => {
  return (
    <>
      {/* <InvoiceComponent invoice={InvoiceData} /> */}
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text>Hello, React-PDF!</Text>
            <Text>{`const greet = "Hello, World!";`}</Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PDFGenerate;
