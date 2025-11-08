import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styles from '../../Styles/Sankalpa.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Global/Navbar';
import { div } from 'framer-motion/client';

function Sankalpa() {
  const certificateRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const participants = data.apiData?.data || [];


  const name = participants[0]?.name || 'Name';
  const Phone = participants[0]?.phone || '';
  const Nakshatra = participants[0]?.nakshatra || 'Nakshatra';
  const Rashi = participants[0]?.rashi || 'Rashi';
  const [SankalpaText, setSankalpaText] = useState(participants[0]?.sankalpa || 'Sankalpa');
  const [isEditing, setIsEditing] = useState(false);
  const [newSankalpa, setNewSankalpa] = useState(SankalpaText);

  // ✅ Download certificate (fixed size 432x289)
  // const handleDownload = async () => {
  //   const canvas = await html2canvas(certificateRef.current);
  //   const link = document.createElement('a');
  //   link.download = `${name || 'certificate'}.png`;
  //   link.href = canvas.toDataURL('image/png');
  //   link.click();
  // };

  // ✅ Submit status (example API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    // const response = await axios.post(
    //   'https://script.google.com/macros/s/AKfycbxg_aU8MkKUzE4ICA2e6CdcTlOmPkwzwQ-ja76WYAzG9e6p6PPBgSVMRli2X7jvhBux4w/exec',
    //   { phone: Phone, isChecked: true },
    //   { headers: { 'Content-Type': 'application/json' } }
    // );

    // console.log('API Response:', response.data);
    // if (response.data.status === 'success') {
    navigate('/thankyou');
    //   } else {
    //     alert('Failed to update status. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error updating status:', error);
    //   alert('❌ Failed to update Sankalpa status. Please try again later.');
    // }
  };

  // ✅ Open text editor modal
  const handleEdit = () => {
    setNewSankalpa(SankalpaText);
    setIsEditing(true);
  };

  // ✅ Save edited Sankalpa
  const handleSave = async () => {
    const confirmChange = window.confirm('Are you sure you want to change?');
    if (!confirmChange) return;

    try {
      const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbzf9PlQFvE19oRL27Kk5MpwkDmSpe0K1x1kTdFI9l9lrXVL3oVKh1bnUVi4FW_CwiCl8g/exec',
        { Phone, sankalpa: newSankalpa }
      );

      if (response.status === 200) {
        alert('✅ Sankalpa updated successfully!');
        setSankalpaText(newSankalpa);
        setIsEditing(false);
      } else {
        alert('⚠️ Failed to update Sankalpa. Try again.');
      }
    } catch (error) {
      console.error('Error updating Sankalpa:', error);
      alert('❌ Error updating Sankalpa. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.certificateContainer}>



        {/* Certificate Display */}
        <div className={styles.certificate} ref={certificateRef}>
          <img
            src="/Images/card2.jpg"
            alt="Certificate Background"
            className={styles.certificateBackground}
          />
          <div className={styles.certificateContent}>
            <h2 className={styles.name}>{name.toUpperCase()}</h2>
            <h3 className={styles.nakshatra}>{Nakshatra.toUpperCase()}</h3>
            <h3 className={styles.rashi}>{Rashi.toUpperCase()}</h3>
            <p className={styles.sankalpa}>{SankalpaText}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition duration-300"
          >
            Edit Sankalpa
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
          {/* <button
          onClick={handleDownload}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg shadow-md transition duration-300"
        >
          Download
        </button> */}
        </div>

        {/* ✅ Modal for editing Sankalpa */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Edit Sankalpa</h2>
              <textarea
                value={newSankalpa}
                onChange={(e) => setNewSankalpa(e.target.value)}
                className="w-full p-3 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sankalpa;
