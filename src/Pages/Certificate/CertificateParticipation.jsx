import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styles from '../../Styles/CertificateParticipation.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Global/Navbar';
import { div } from 'framer-motion/client';

function CertificateParticipation() {
  const certificateRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const participants = data.apiData || [];


  const name = participants.name || 'Name';


  // ✅ Download certificate (fixed size 432x289)
  const handleDownload = async () => {
    const canvas = await html2canvas(certificateRef.current);
    const link = document.createElement('a');
    link.download = `${name || 'certificate'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    // navigate('/thankyou');
  };



  return (
    <div>
      <Navbar />
      <div className={styles.certificateContainer}>



        {/* Certificate Display */}
        <div className={styles.certificate} ref={certificateRef}>
          <img
            src="/Images/participationcertificate.jpg"
            alt="Certificate Background"
            className={styles.certificateBackground}
          />
          <div className={styles.certificateContent}>
            <h2 className={styles.name}>{name.toUpperCase()}</h2>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg shadow-md transition duration-300"
          >
            Download
          </button>
        </div>


      </div>
    </div>
  );
}

export default CertificateParticipation;
