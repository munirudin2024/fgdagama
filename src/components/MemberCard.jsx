// /src/components/MemberCard.jsx
import React, { useState } from "react";

const MemberCard = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Gaya untuk kartu secara keseluruhan
  const cardStyle = {
    // Ukuran dasar kartu
    width: "240px", // Sedikit lebih lebar agar foto background terlihat
    minHeight: "150px", // Tinggi minimum agar ada ruang untuk teks
    margin: "15px",
    borderRadius: "10px",
    overflow: "hidden", // Penting untuk memastikan gambar background tidak keluar
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative", // Untuk menempatkan overlay atau foto profil di dalamnya
    backgroundColor: "#fff", // Fallback jika gambar tidak loading
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  // Gaya untuk container foto background
  const backgroundPhotoStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${member.imagePlaceholder})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: showDetails ? "80px" : "150px", // Tinggi berubah saat detail muncul
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "10px",
    boxSizing: "border-box",
    transition: "height 0.3s ease", // Animasi perubahan tinggi
  };

  // Gaya untuk teks nama dan peran di awal
  const initialTextStyle = {
    margin: 0,
    fontSize: "1.2em",
    fontWeight: "bold",
    textShadow: "1px 1px 3px rgba(0,0,0,0.7)", // Agar teks lebih jelas di atas gambar
  };

  // Gaya untuk foto profil bundar yang muncul saat detail
  const profileImageStyle = {
    borderRadius: "50%",
    width: "100px", // Foto diperbesar
    height: "100px",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    position: "absolute", // Penting: Letakkan di atas semua
    top: "0px", // Jarak dari atas
    left: `calc(50% - 50px)`, // Pusatkan (50% dari card - setengah lebar foto)
    zIndex: 10,
  };

  // Gaya untuk bagian konten utama kartu
  const contentStyle = {
    padding: "15px",
    textAlign: "center",
    flexGrow: 1, // Agar mengisi ruang yang tersedia
  };

  // Gaya untuk teks detail yang disembunyikan
  const detailsStyle = {
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    marginTop: "15px",
    textAlign: "left",
    fontSize: "13px",
    color: "#333",
    maxHeight: showDetails ? "200px" : "0", // Animasi buka/tutup detail
    overflow: "hidden",
    transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
    opacity: showDetails ? 1 : 0,
  };

  return (
    <div
      style={cardStyle}
      onClick={() => setShowDetails(!showDetails)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Bagian Foto Latar / Profil */}
      <div style={backgroundPhotoStyle}>
        {!showDetails ? (
          // Tampilan awal: Nama dan Peran di atas gambar latar
          <div style={{ padding: "10px", width: "100%" }}>
            <p style={initialTextStyle}>{member.name}</p>
            <p style={{ color: "white", fontSize: "0.9em", margin: 0 }}>
              {member.role}
            </p>
          </div>
        ) : (
          // Tampilan saat detail muncul: Foto profil bundar
          <img
            src={member.imagePlaceholder}
            alt={`Foto ${member.name}`}
            style={profileImageStyle}
          />
        )}
      </div>

      {/* Bagian Konten Kartu */}
      <div style={contentStyle}>
        {showDetails && (
          <>
            <h4 style={{ margin: "15px 0", fontSize: "1.1em" }}>
              {member.name}
            </h4>
            <p
              style={{ color: "#555", fontSize: "13px", margin: "0 0 10px 0" }}
            >
              {member.role}
            </p>
          </>
        )}

        {/* Detail Interaktif */}
        <div style={detailsStyle}>
          <p style={{ margin: "5px 0" }}>
            <strong>Kelas/Sem:</strong> {member.class} / {member.semester}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Domisili:</strong> {member.domicile}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Hobi:</strong> {member.hobby}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>WA:</strong>{" "}
            <a
              href={`https://wa.me/${member.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "none" }}
            >
              {member.wa}
            </a>
          </p>
        </div>

        {/* Teks "Klik untuk Detail" di awal */}
        {!showDetails && (
          <p style={{ color: "#007bff", fontSize: "12px", marginTop: "10px" }}>
            Klik untuk Detail Anggota
          </p>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
