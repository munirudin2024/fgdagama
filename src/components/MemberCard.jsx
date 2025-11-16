import React, { useState } from "react";

const MemberCard = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Gaya untuk kartu secara keseluruhan
  const cardStyle = {
    // Ukuran dasar kartu
    width: "240px",
    margin: "15px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
    backgroundColor: "#fff",
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

  // Gaya untuk teks nama di awal
  const initialTextStyle = {
    margin: 0,
    fontSize: "0.1em",
    fontWeight: "bold",
    textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
  };

  // Gaya untuk foto profil bundar yang muncul saat detail
  const profileImageStyle = {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    position: "absolute",
    top: "0px",
    left: `calc(50% - 50px)`,
    zIndex: 10,
  };

  // Gaya untuk bagian konten utama kartu
  const contentStyle = {
    // PENTING: Mengurangi padding di sini untuk memperkecil area putih
    padding: "10px",
    textAlign: "center",
    flexGrow: 1,
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

  // --- START: Gaya Flexbox untuk Penyejajaran Titik Dua ---
  
  // 1. Gaya untuk kontainer setiap baris (Membuat 2 kolom)
  const detailItemStyle = {
    display: "flex",
    margin: "5px 0",
    lineHeight: "1.2", // Merapikan jarak antar baris
  };
  
  // 2. Gaya untuk kolom label/judul
  const labelStyle = {
    fontWeight: "bold",
    // 85px cukup untuk "Domisili" dan "Linkedin" + titik dua + spasi
    width: "85px", 
    flexShrink: 0, // Mencegah kolom ini menciut
  };
  
  // 3. Gaya untuk kolom nilai
  const valueStyle = {
    flexGrow: 1, // Membiarkan nilai mengisi sisa ruang
  }

  // --- END: Gaya Flexbox untuk Penyejajaran Titik Dua ---

  // Gaya baru untuk menggabungkan BAB dan Teks Klik
  const combinedInfoStyle = {
    // Padding vertical minimal agar area putih kecil
    padding: "1px 0",
    fontSize: "12px",
    color: "#555",
    // Membuat teks BAB/Peran dan "Klik untuk Detail" menjadi satu baris
    display: "flex",
    justifyContent: "space-between", // Memisahkan kedua teks
    alignItems: "center",
    borderTop: "1px solid #eee", // Garis pemisah tipis
    marginTop: "1px", // Jarak dari nama
  };

  // Gaya untuk teks klik saja (agar warnanya berbeda)
  const clickTextStyle = {
    color: "#007bff",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "10px",
    flexShrink: 0 // Pastikan teks ini tidak menciut
  };

  // Fungsi untuk handle klik pada kartu
  const handleCardClick = (e) => {
    // Jika user mengklik link WA, jangan toggle detail
    if (e.target.tagName !== 'A') {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div
      style={cardStyle}
      onClick={handleCardClick} // Menggunakan handler yang dimodifikasi
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Bagian Foto Latar / Profil */}
      <div style={backgroundPhotoStyle}>
        {/* Tampilan awal: Hanya Nama di atas gambar latar */}
        {!showDetails && (
          <div style={{ padding: "10px", width: "100%" }}>
            <p style={initialTextStyle}>{member.name}</p>
          </div>
        )}

        {/* Tampilan saat detail muncul: Foto profil bundar */}
        {showDetails && (
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
          // Teks Nama dan Peran saat detail terbuka
          <>
            {/* Mengubah margin agar nama tampil di bawah foto profil yang muncul */}
            <h4 style={{ margin: "30px 0 0 0", fontSize: "0.8em" }}>
              {member.name}
            </h4>
            <p
              style={{ color: "#555", fontSize: "0.5px", margin: "0 0 10px 0" }}
            >
              {member.nim}
            </p>
          </>
        )}

        {/* Detail Interaktif (Bagian yang Dirapikan) */}
        <div style={detailsStyle}>
          
          {/* Item 1: Agama */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Agama</span>
            <span style={valueStyle}>{member.agama}</span>
          </div>
          
          {/* Item 2: Domisili */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Domisili</span>
            <span style={valueStyle}>{member.domisili}</span>
          </div>
          
          {/* Item 3: Email */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Kelas</span>
            <span style={valueStyle}>{member.kelas}</span>
          </div>
          
          {/* Item 4: Linkedin / WA Link */}
          <div style={detailItemStyle}>
            <span style={labelStyle}>Wa</span>
            <a
              href={`https://wa.me/${member.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "none" }}
            >
              {member.wa}
            </a>
          </div>
        </div>

        {/* Info Gabungan (BAB dan Klik Detail) - Hanya tampil saat detail tertutup */}
        {!showDetails && (
          <div style={combinedInfoStyle}>
            {/* Teks BAB I - Pendahuluan (Role) */}
            <span style={{ fontWeight: '500' }}>{member.role}</span>
            {/* Teks Klik untuk Detail */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;