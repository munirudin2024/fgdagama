// File: src/components/MemberCard.jsx (Kode yang disinkronkan)

import React, { useState } from "react";

// Placeholder jika member.imagePlaceholder tidak ada
const DEFAULT_PLACEHOLDER = "https://via.placeholder.com/150x150?text=Anggota";

const MemberCard = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);
  const imageUrl = member.imagePlaceholder || DEFAULT_PLACEHOLDER;

  // Gaya untuk kartu secara keseluruhan
  const cardStyle = {
    width: "360px", // Tetap 250px
    margin: "15px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
    backgroundColor: "#f7f7f7",
    display: "flex",
    flexDirection: "column",
    border: '1px solid #ddd',
  };

  // Gaya untuk container foto background (Latar belakang)
  const backgroundPhotoStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(52, 58, 64, 0.6), rgba(33, 37, 41, 0.7)), url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: showDetails ? "90px" : "170px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "white",
    padding: showDetails ? "10px" : "15px 10px",
    boxSizing: "border-box",
    transition: "height 0.4s ease-in-out", // OK: 0.4s
  };

  // ... (Gaya initialTextStyle, nameInitialStyle, nimInitialStyle tetap sama)
  const initialTextStyle = {
    textAlign: 'center',
    width: '100%',
    padding: '0 10px',
  };
  
  const nameInitialStyle = {
    margin: 0,
    fontSize: "0.8em", 
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
  };

  const nimInitialStyle = {
    margin: '3px 0 0 0',
    fontSize: "0.8em", 
    opacity: 0.9,
    fontWeight: 300,
  };

  // Gaya untuk foto profil bundar yang muncul saat detail
  const profileImageStyle = {
    borderRadius: "50%",
    width: "110px", 
    height: "110px",
    objectFit: "cover",
    border: "4px solid #fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    position: "absolute",
    zIndex: 10,
    // ⚠️ PERBAIKAN FOTO: Disamakan menjadi 0.4s
    transition: "top 0.4s ease-in-out, opacity 0.4s ease-in-out", 

    top: showDetails ? "15px" : "-100px", 
    left: `calc(50% - 50px)`,
    opacity: showDetails ? 1 : 0,
  };

  // Gaya untuk bagian konten utama kartu
  const contentStyle = {
    padding: showDetails ? "45px 20px 10px 20px" : "10px 20px 10px 20px", 
    textAlign: "center",
    flexGrow: 1,
    transition: 'padding 0.4s ease-in-out', // OK: 0.4s
  };

  // Gaya untuk teks detail yang disembunyikan
  const detailsStyle = {
    padding: "15px 0 0 0",
    marginTop: "15px",
    textAlign: "left",
    fontSize: "14px",
    color: "#444",
    maxHeight: showDetails ? "300px" : "0", 
    overflow: "hidden",
    opacity: showDetails ? 1 : 0,
    borderTop: showDetails ? "1px dashed #ced4da" : 'none', 
    // ⚠️ PERBAIKAN DETAIL: max-height disamakan menjadi 0.4s
    transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out, border-top 0.4s ease",
  };

  // ... (Gaya detailItemStyle, labelStyle, valueStyle, combinedInfoStyle tetap sama)
  const detailItemStyle = {
    display: "flex",
    margin: "5px 0",
    lineHeight: "1.3", 
  };
  
  const labelStyle = {
    fontWeight: "normal",
    width: "85px", 
    flexShrink: 0, 
    color: '#007bff', 
  };
  
  const valueStyle = {
    flexGrow: 1, 
    wordBreak: 'break-word', 
  }

  const combinedInfoStyle = {
    padding: "10px 0",
    fontSize: "0.9em",
    color: "#6c757d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid #eee", 
    marginTop: "15px", 
  };


  // Fungsi untuk handle klik pada kartu
  const handleCardClick = (e) => {
    if (e.target.tagName !== 'A') {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-8px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* 1. Bagian Foto Latar / Profil */}
      <div style={backgroundPhotoStyle}>
        {/* Tampilan awal: Nama dan NIM di atas gambar latar */}
        {!showDetails && (
          <div style={initialTextStyle}>
            <p style={nameInitialStyle}>{member.name}</p>
            <p style={nimInitialStyle}>{member.nim}</p>
          </div>
        )}
      </div>

      {/* Foto Profil Bundar */}
      <img
          src={imageUrl}
          alt={`Foto ${member.name}`}
          style={profileImageStyle}
      />

      {/* 2. Bagian Konten Kartu */}
      <div style={contentStyle}>
        
        {/* Teks Nama dan NIM saat detail terbuka */}
        {showDetails && (
          <>
            <h4 style={{ margin: "2px 0", fontSize: "1em", fontWeight: '700' }}>
              {member.name}
            </h4>
            <p
              style={{ color: "#555", fontSize: "0.9em", margin: "0 0 10px 0" }}
            >
              {member.nim}
            </p>
          </>
        )}

        {/* 3. Detail Interaktif */}
        <div style={detailsStyle}>
          
          {/* Item 1: Agama */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Agama</span>
            <span style={valueStyle}>: {member.agama}</span>
          </div>
          
          {/* Item 2: Domisili */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Domisili</span>
            <span style={valueStyle}>: {member.domisili}</span>
          </div>
          
          {/* Item 3: Kelas */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Kelas</span>
            <span style={valueStyle}>: {member.kelas}</span>
          </div>
          
          {/* Item 4: WA Link */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>WhatsApp</span>
            <span style={valueStyle}>
              : <a
                href={`https://wa.me/${member.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#28a745", fontWeight: 'bold', textDecoration: "none" }}
              >
                {member.wa}
              </a>
            </span>
          </div>
        </div>

        {/* 4. Info Gabungan (Role dan Klik Detail) - Selalu tampil di bawah */}
        <div style={combinedInfoStyle}>
            {/* Teks BAB I - Pendahuluan (Role) */}
            <span style={{ fontWeight: '600', color: '#343a40' }}>
                {member.role}
            </span>
            {/* Teks Klik untuk Detail */}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;