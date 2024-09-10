import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineDownload, HiOutlinePrinter } from "react-icons/hi";
import PdfData from "./PdfData";

const GeneratePdf = () => {
  const styles = {
    flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
    btn: {
      borderRadius: "3px",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "3px",
      fontSize: "11px",
      color: "#4f4f4f",
      fontWeight: 600,
      cursor: "pointer",
      userSelect: "none",
    },
  };

  const handleShare = async (blob) => {
    await saveAs(blob, `invoice.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Invoice`,
    )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  };

  return (
    <div className='flex justify-center items-center gap-4 mt-10'>
        <PDFDownloadLink document={<PdfData />} fileName='invoice.pdf'>
          <div style={styles.btn}>
            <HiOutlineDownload size={14} />
            <span>Download</span>
          </div>
        </PDFDownloadLink>

        <BlobProvider document={<PdfData />}>
          {({ url, blob }) => (
            <a href={url} target='_blank' style={styles.btn} rel='noreferrer'>
              <HiOutlinePrinter size={14} />
              <span>Print</span>
            </a>
          )}
        </BlobProvider>
        <BlobProvider document={<PdfData />}>
          {({ url, blob }) => (
            <div style={styles.btn} onClick={() => handleShare(url, blob)}>
              <FiShare2 size={14} />
              <span>Share</span>
            </div>
          )}
        </BlobProvider>
    </div>
  );
};

export default GeneratePdf;
