import React, { useEffect, useState } from "react";
import "./LaunchModal.css";

const LaunchModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("launchModalSeen");
    if (!alreadySeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("launchModalSeen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Aplicație Web de Animație</h2>

        <p className="modal-text">
          Această aplicație web de animație a fost realizată de{" "}
          <strong>Mihai Bența</strong>.
        </p>

        <p className="modal-text">
          Pentru utilizare, colaborări sau informații suplimentare,
          vă rugăm să ne contactați prin una dintre metodele de mai jos:
        </p>

        <div className="modal-buttons">
          <a
            href="mailto:bentamihai94@gmail.com"
            className="btn primary"
          >
            Trimite Email
          </a>

          <a
            href="https://wa.me/0743385789"
            target="_blank"
            rel="noopener noreferrer"
            className="btn whatsapp"
          >
            Contact WhatsApp
          </a>
        </div>

        <button className="close-btn" onClick={handleClose}>
          Închide
        </button>
      </div>
    </div>
  );
};

export default LaunchModal;