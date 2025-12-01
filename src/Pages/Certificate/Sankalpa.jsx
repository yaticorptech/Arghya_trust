import React, { useRef, useState } from 'react';
import styles from '../../Styles/Sankalpa.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../../Global/Navbar';
import { updatesankalpa, updateckecked } from '../../Utils/authApi.jsx';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sankalpa() {
  const certificateRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  
  const data = location.state || {};
  const participants = data.apiData || [];
  
  const name = participants.name || 'Name';
  const Phone = participants.phone || '';
  const Nakshatra = participants.Nakshatra || 'Nakshatra';
  const Rashi = participants.Rashi || 'Rashi';

  const [SankalpaText, setSankalpaText] = useState(participants.Sankalpa || 'Sankalpa');
  const [isEditing, setIsEditing] = useState(false);
  const [newSankalpa, setNewSankalpa] = useState(SankalpaText);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateckecked(Phone);

      if (response.success) {
        toast.success("✔ Status updated successfully!");
        navigate('/thankyou');
      } else {
        toast.error("⚠ Failed to update status. Try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("❌ Error updating status. Try again later.");
    }
  };

  const handleEdit = () => {
    setNewSankalpa(SankalpaText);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await updatesankalpa(Phone, newSankalpa);

      if (response.success) {
        toast.success("✔ Sankalpa updated!");
        setSankalpaText(newSankalpa);
        setIsEditing(false);
      } else {
        toast.error("⚠ Failed to update Sankalpa.");
      }
    } catch (error) {
      console.error("Error updating Sankalpa:", error);
      toast.error("❌ Error updating Sankalpa. Try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className={styles.certificateContainer}>
        <div className={styles.certificate} ref={certificateRef}>
          <img src="/Images/card2.jpg" className={styles.certificateBackground} />
          
          <div className={styles.certificateContent}>
            <h2 className={styles.name}>{name.toUpperCase()}</h2>
            <h3 className={styles.nakshatra}>{Nakshatra.toUpperCase()}</h3>
            <h3 className={styles.rashi}>{Rashi.toUpperCase()}</h3>
            <p className={styles.sankalpa}>{SankalpaText}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button onClick={handleEdit} className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md">
            Edit Sankalpa
          </button>

          <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md">
            Submit
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Edit Sankalpa</h2>

              <textarea
                value={newSankalpa}
                onChange={(e) => setNewSankalpa(e.target.value)}
                className="w-full p-3 border rounded-md h-32"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">
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
