/* eslint-disable react/prop-types */
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

const DistanceReport = ({ groupedData }) => {
  console.log(groupedData);

  // const doc = new jsPDF();
  // const handleDownloadPDF = () => {
  //   autoTable(doc, { html: "#report-table" });
  //   doc.save("reports.pdf");
  // };

  return (
    <>
      {groupedData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total Distance</th>
            </tr>
          </thead>
      
          <tbody className="divide-y divide-gray-200">
            {groupedData.map((report, index) => (
              <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{report.date}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{report.totalDistance}</td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      ) : (
        <div className='w-full border flex justify-center items-center mt-8'>
          <h2 className='text-red-600 text-2xl p-4'>No records found!</h2>
        </div>
      )}
    </>
  );
};

export default DistanceReport;
