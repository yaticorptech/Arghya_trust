import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Global/Navbar";
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const location = useLocation();
  const apiData = location.state?.apiData?.data || [];
  const [participants, setParticipants] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setParticipants(apiData);
    }
  }, [apiData]);

  // ✅ Format-agnostic date filter (handles dd/mm/yyyy, ISO, etc.)
  const filteredParticipants = selectedDate
    ? participants.filter((p) => {
        const participantDate = p.date || p.Date;
        if (!participantDate) return false;

        try {
          // Normalize to yyyy-mm-dd
          const formattedParticipantDate = new Date(
            participantDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
          )
            .toISOString()
            .split("T")[0];

          return formattedParticipantDate === selectedDate;
        } catch {
          return false;
        }
      })
    : participants;

  // ✅ Generate PDF for filtered participants
  const handleDownloadAll = async () => {
    if (filteredParticipants.length === 0) {
      toast.warning("No data found for the selected date!");
      return;
    }

    toast.info("Generating certificates... Please wait.");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const bgImg = "/Images/card2.jpg"; // Ensure this image is in /public/Images/

    for (let i = 0; i < filteredParticipants.length; i++) {
      const p = filteredParticipants[i];
      const name = p.name || p.Name || "Name";
     
      const rashi = p.rashi || p.Rashi || "Rashi";
      const nakshatra = p.nakshatra || p.Nakshatra || "Nakshatra";
      const sankalpa = p.sankalpa || p.Sankalpa || "Sankalpa";
      

      // Draw certificate background
      await new Promise((resolve) => {
        const img = new Image();
        img.src = bgImg;
        img.onload = () => {
          pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
          resolve();
        };
      });

      

      // Name
      pdf.setFont("times", "bold");
      pdf.setFontSize(26);
      pdf.setTextColor("#ffffff");
      pdf.text(name.toUpperCase(), 110, 205);

      // Rashi & Nakshatra
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(26);
      pdf.text(rashi.toUpperCase(), 110, 230);
      pdf.text(nakshatra.toUpperCase(), 450, 230);

      // Sankalpa
      pdf.setFont("times", "normal");
      pdf.setFontSize(7.5);
      const sankalpaLines = pdf.splitTextToSize(
        sankalpa.toUpperCase(),
        pageWidth - 105
      );
      pdf.text(sankalpaLines, 50, 290);

      
      // Add new page (except last one)
      if (i !== filteredParticipants.length - 1) pdf.addPage();
    }
const formattedDate =
  selectedDate ||
  (filteredParticipants[0]?.date || filteredParticipants[0]?.Date
    ? new Date(
        (filteredParticipants[0].date || filteredParticipants[0].Date).replace(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$3-$2-$1"
        )
      )
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-")
    : "All");
    pdf.save(`Sankalpa(${formattedDate}).pdf`);
    toast.success("Certificates downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer position="top-center" />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Admin Dashboard
        </h1>

        {/* Date Filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => setSelectedDate("")}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleDownloadAll}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition duration-300"
          >
            📥 Download Certificates
          </button>
        </div>

        {/* Participants Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="p-3 text-left">Sl.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Rashi</th>
                <th className="p-3 text-left">Nakshatra</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((p, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold">{index + 1}</td>
                    <td className="p-3">{p.name || p.Name}</td>
                    <td className="p-3">{p.phone || p.Phone}</td>
                    <td className="p-3">{p.rashi || p.Rashi}</td>
                    <td className="p-3">{p.nakshatra || p.Nakshatra}</td>
                    <td className="p-3">
                      {p.date || p.Date
                        ? new Date(
                            (p.date || p.Date).replace(
                              /(\d{2})\/(\d{2})\/(\d{4})/,
                              "$3-$2-$1"
                            )
                          ).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No data available for selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
