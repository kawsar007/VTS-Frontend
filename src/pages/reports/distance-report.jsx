/* eslint-disable react/prop-types */
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DistanceReport = ({ total }) => {
  const doc = new jsPDF();
  const handleDownloadPDF = () => {
    autoTable(doc, { html: "#report-table" });
    doc.save("reports.pdf");
  };  

  return (
    <>
    {total > 0 ? (
      <div className="mt-6">
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
        id="report-table"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Date
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Distance Traveled
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Fuel Consumption
            </th>
          </tr>
          <tr className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
            <td
              data-th="Date"
              className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              2024-07-01
            </td>
            <td
              data-th="Distance Traveled"
              className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              {total.toFixed(2)}
            </td>
            <td
              data-th="Fuel Consumption"
              className=" before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              10.63 Liter
            </td>
          </tr>
          <tr className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
            <td
              data-th="Date"
              className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              Total :
            </td>
            <td
              data-th="Distance Traveled"
              className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              {total.toFixed(2)}
            </td>
            <td
              data-th="Fuel Consumption"
              className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
            >
              10.63 Liter
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="mt-6 middle none center w-full rounded-lg bg-blue-700 hover:bg-blue-800 py-3 px-6 font-sans text-xs font-bold uppercase text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
        onClick={handleDownloadPDF}
      >
        New Save as PDF
      </button>
    </div>
    ) : (<div className="w-full border flex justify-center items-center mt-8">
      <h2 className="text-red-600 text-2xl p-4">No records found!</h2>
    </div>)}
    
    
    </>
  );
};

export default DistanceReport;
