/* eslint-disable react/prop-types */
import { Document, Page } from "@react-pdf/renderer";
import {
  InvoiceTitle,
  ReportInfoTableBody,
  ReportInfoTableHead,
  styles,
  TableBody,
  TableHead,
} from "../../../common/reports-docs/docsFile";

const DistanceReportDocs = ({
  reports,
  startTime,
  endTime,
  selectedVehicle,
  todayFormattedDate,
}) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <InvoiceTitle />
        <ReportInfoTableHead title='Report Title' subtitle='Distance Report' />
        <ReportInfoTableBody
          infoData={[
            { label: "Vehicle", value: selectedVehicle },
            { label: "Owner", value: "Milk Vita (milkvita)" },
            { label: "Report Time", value: `${startTime} - ${endTime}` },
            { label: "Report Date", value: todayFormattedDate },
          ]}
        />
        <TableHead columns={["Date", "Distance Traveled"]} />
        <TableBody data={reports} />
      </Page>
    </Document>
  );
};

export default DistanceReportDocs;
