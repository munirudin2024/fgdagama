import React from "react";
import MemberCard from "./components/MemberCard";
import { lecturer, members } from "./data/fgdMembers";

// URL Gambar Latar Belakang dari user
const BACKGROUND_IMAGE_URL =
  "https://unsia.ac.id/wp-content/uploads/2023/10/pic10.jpg";

// Catatan: Ganti [ID_VIDEO_ANDA] dengan ID YouTube yang sebenarnya setelah video diunggah
const YOUTUBE_VIDEO_ID = "ThM0EdT1ByU";

const FGDPage = () => {
  // Gaya untuk container utama (Full Page Background)
  const mainContainerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "0", // Hapus padding di container utama
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",

    // Gaya untuk Gambar Latar Belakang
    backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
    backgroundAttachment: "fixed", // Agar gambar tidak ikut scroll
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Gaya untuk Header (Flyer Title)
  const headerStyle = {
    textAlign: "center",
    padding: "50px 20px",
    marginBottom: "30px",

    // OVERLAY HITAM/GELAP pada Header agar Teks Putih Terbaca
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    color: "white",
  };

  // Gaya untuk konten di tengah (Detail & Team)
  const sectionContentStyle = {
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "12px",

    // OVERLAY PUTIH pada Section agar Konten Terbaca Jelas di atas Background
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  };

  return (
    <div style={mainContainerStyle}>
      {/* SECTION 1: HEADER & JUDUL FGD */}
      <header style={headerStyle}>
        <h3 style={{ margin: 0 }}>FOCUS GROUP DISCUSSION (FGD)</h3>
        <h1 style={{ margin: "5px 0 10px 0", fontSize: "3em" }}>
          Rukun di Era Disrupsi
        </h1>
        <p style={{ fontSize: "1.2em" }}>
          Mewujudkan Kerukunan Umat Beragama dalam Multi Konteks Kehidupan
        </p>

        {/* Call to Action Utama */}
        <a
          href="#registration"
          style={{
            display: "inline-block",
            marginTop: "25px",
            padding: "12px 30px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "50px",
            fontWeight: "bold",
          }}
        >
          DAFTAR SEKARANG & JADI BAGIAN DARI SOLUSI!
        </a>
      </header>

      {/* SECTION 2: DETAIL LOGISTIK */}
      <section style={sectionContentStyle}>
        <h2 style={{ textAlign: "center", color: "#007bff" }}>DETAIL ACARA</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <h3>🗓️ Waktu</h3>
            <p>Jumat, 22 November 2025</p>
          </div>
          <div>
            <h3>⏰ Pukul</h3>
            <p>14.00 - 16.00 WIB</p>
          </div>
          <div>
            <h3>📍 Tempat</h3>
            <p>Ruang Rapat Digital, Gedung F | Kampus [Nama Kampus]</p>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            borderTop: "1px solid #ddd",
            paddingTop: "15px",
          }}
        >
          <h3>Manfaat</h3>
          <p>E-Sertifikat, Wawasan Eksklusif, Networking Lintas Bidang.</p>
        </div>
      </section>

      {/* SECTION 3: TEAM & INTERACTIVE PROFILES */}
      <section style={sectionContentStyle}>
        <h2
          style={{
            textAlign: "center",
            color: "#007bff",
            borderBottom: "2px solid #007bff",
            paddingBottom: "10px",
          }}
        >
          TIM PENELITI & FASILITATOR
        </h2>

        {/* Dosen Pembimbing */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <h3 style={{ color: "#dc3545" }}>Dosen Pembimbing</h3>
          <div
            style={{
              display: "inline-block",
              padding: "15px",
              border: "2px solid #dc3545",
              borderRadius: "10px",
              backgroundColor: "#ffe5e5",
            }}
          >
            {/* Asumsi: Gunakan imagePlaceholder Dosen */}
            <img
              src={lecturer.imagePlaceholder}
              alt={lecturer.name}
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <h4 style={{ margin: "10px 0 5px 0" }}>{lecturer.name}</h4>
            <p>{lecturer.bio}</p>
          </div>
        </div>

        {/* Anggota Tim (15 Orang) */}
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          Anggota Kelompok Riset (15 Orang)
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* SECTION 4: REGISTRATION & DOCUMENTATION */}
      <section
        id="registration"
        style={{
          textAlign: "center",
          padding: "40px 0",
          backgroundColor: "rgba(52, 58, 64, 0.9)",
          color: "white",
        }}
      >
        {/* Bagian Pendaftaran */}
        <h2>FORMULIR PENDAFTARAN</h2>
        <p>Isi formulir</p>

        {/* Placeholder untuk Form Pendaftaran Nyata */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "rgba(73, 80, 87, 0.8)",
            display: "inline-block",
            borderRadius: "8px",
          }}
        >
          <p>kelompok 2</p>
        </div>

        {/* --- BAGIAN REKAMAN YOUTUBE (SUDAH DIPINDAHKAN KE DALAM SECTION INI) --- */}
        <div
          style={{
            marginTop: "50px",
            maxWidth: "800px",
            margin: "50px auto 0 auto",
            padding: "0 20px", // Tambahkan padding horizontal agar responsif
          }}
        >
          <h2 style={{ borderTop: "1px solid #777", paddingTop: "20px" }}>
            DOKUMENTASI
          </h2>
          <p>
            Tonton kembali sesi diskusi kerukunan umat beragama dalam multi
            konteks
          </p>

          {/* Container Responsive untuk Video */}
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              maxWidth: "100%",
              background: "black",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="Rekaman FGD Kerukunan Umat Beragama"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></iframe>
          </div>
          {/* Ingat untuk mengganti YOUTUBE_VIDEO_ID dengan ID video Anda yang sebenarnya */}
        </div>
      </section>
    </div>
  );
};

export default FGDPage;
