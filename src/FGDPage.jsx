import React, { useState, useRef, useEffect } from "react";
import MemberCard from "./components/MemberCard";
import { lecturer, members } from "./data/fgdMembers";

const BACKGROUND_IMAGE_URL =
"https://unsia.ac.id/wp-content/uploads/2023/10/pic10.jpg";

const YOUTUBE_VIDEO_ID = "_VfAP45O3_w";
//const BGM_YOUTUBE_ID = "WhqEGF5LoDk";//pop
const BGM_YOUTUBE_ID = "gKmd_iOGNVI"; //religi
const BGM_PLAYER_ID = "bgm-youtube-player";

const SLIDE_EMBED_URL = ""; 
const ARTIKEL_EMBED_URL = ""; 
const ARTIKEL_LINK_DOWNLOAD = "";

// ===== KOMPONEN MEETING INFO INTERAKTIF =====
const MeetingInfoInteractive = () => {
  // Tanggal rapat
  const meetingDate = 22;
  const meetingMonth = 10; // November (0-indexed)
  const meetingYear = 2025;
  
  // Link Zoom - GANTI DENGAN LINK ZOOM ANDA
  const zoomLink = "https://zoom.us/j/your-meeting-id";

  // Generate calendar untuk November 2025
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth(meetingMonth, meetingYear);
  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Jam analog untuk waktu meeting (14:00)
  const meetingHour = 14;
  const meetingMinute = 0;
  
  const hourAngle = (meetingHour % 12) * 30 + meetingMinute * 0.5;
  const minuteAngle = meetingMinute * 6;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      padding: '0',
      marginTop: '30px'
    }}>
      
      {/* Kalender */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        padding: '20px',
        flex: '1 1 280px',
        minWidth: '280px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '28px' }}>📅</span>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#007bff', margin: 0 }}>Tanggal Presentasi</h3>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
          color: 'white',
          borderRadius: '8px 8px 0 0',
          padding: '12px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>November 2025</p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginTop: '15px'
        }}>
          {weekDays.map(day => (
            <div key={day} style={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#666',
              padding: '8px 0'
            }}>
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '6px',
                ...(day === meetingDate ? {
                  background: 'linear-gradient(135deg,  #007bff 0%, #0056b3 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(220,53,69,0.4)',
                  transform: 'scale(1.1)',
                  animation: 'pulse 2s infinite'
                } : day ? {
                  color: '#333',
                  cursor: 'pointer'
                } : {})
              }}
            >
              {day}
            </div>
          ))}
        </div>
        
  
      </div>

      {/* Jam Analog */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        padding: '25px',
        flex: '1 1 280px',
        minWidth: '280px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '28px' }}>⏰</span>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#007bff', margin: 0  }}>Waktu Presentasi</h3>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0' }}>
          <div style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '8px solid #e9ecef',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}>
            {/* Angka jam */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * 70;
              const y = Math.sin(angle) * 70;
              return (
                <div
                  key={num}
                  style={{
                    position: 'absolute',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    transform: `translate(${x}px, ${y}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-7px',
                    marginTop: '-10px'
                  }}
                >
                  {num}
                </div>
              );
            })}
            
            {/* Titik tengah */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}></div>
            
            {/* Jarum jam */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '6px',
              height: '50px',
              backgroundColor: '#212529',
              borderRadius: '3px',
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`
            }}></div>
            
            {/* Jarum menit */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '70px',
              backgroundColor: '#007bff',
              borderRadius: '2px',
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`
            }}></div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p style={{ fontSize: '25px', fontWeight: 'bold', color: '#28a745', margin: '5px 0' }}>14:00 - 17:30</p>
          <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>WIB</p>
        </div>
      </div>

      {/* Lokasi */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        padding: '25px',
        flex: '1 1 280px',
        minWidth: '280px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '28px' }}>📍</span>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#007bff', margin: 0  }}>Lokasi Presentasi</h3>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '30px 0'
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(111,66,193,0.3)',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
         // onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
         // onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M17.5 14.33C16.67 13.5 15.67 13 14.5 13h-5c-1.17 0-2.17.5-3 1.33V6h11v8.33zM19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 7c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
            </svg>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#212529', marginBottom: '8px' }}></p>
            
            <a 
              href={zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,123,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
              }}
            >
              🎥 Gabung Zoom Meeting
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== KOMPONEN UTAMA FGD PAGE =====
const FGDPage = () => {
// 1. STATE UNTUK STATUS PEMUTARAN
const [isPlaying, setIsPlaying] = useState(false);
// 2. REF UNTUK MENYIMPAN OBJEK PEMAIN YOUTUBE
const playerRef = useRef(null);

// Fungsi untuk memuat YouTube Iframe API dan membuat objek pemain
useEffect(() => {
// Memastikan skrip YouTube API dimuat
if (!window.YT) {
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Fungsi yang akan dipanggil ketika YouTube API siap
window.onYouTubeIframeAPIReady = () => {
// Membuat objek pemain YouTube
playerRef.current = new window.YT.Player(BGM_PLAYER_ID, {
videoId: BGM_YOUTUBE_ID,
playerVars: {
autoplay: 0, 
loop: 1, 
playlist: BGM_YOUTUBE_ID, 
controls: 0, 
showinfo: 0,
rel: 0,
modestbranding: 1,
},
events: {
onReady: (event) => {
// ...
},
},
});
};
// Cleanup function
return () => {
if (playerRef.current) {
playerRef.current.destroy();
}
};
}, []); 

// Fungsi untuk menangani pemutaran/jeda musik
const togglePlay = () => {
if (playerRef.current && window.YT) {
const isCurrentlyPlaying = playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING;
if (isCurrentlyPlaying || isPlaying) {
playerRef.current.pauseVideo();
setIsPlaying(false);
} else {
playerRef.current.playVideo();
setIsPlaying(true);
}
}
};

// Gaya untuk container utama
const mainContainerStyle = {
fontFamily: "Arial, sans-serif",
padding: "0",
backgroundColor: "#f9f9f9",
minHeight: "100vh",
backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
backgroundAttachment: "fixed",
backgroundSize: "cover",
backgroundPosition: "center",
};

// Gaya untuk Header
const headerStyle = {
textAlign: "center",
padding: "50px 20px",
marginBottom: "30px",
backgroundColor: "rgba(0, 0, 0, 0.65)",
color: "white",
};

// Gaya untuk konten di tengah
const sectionContentStyle = {
maxWidth: "1200px",
margin: "30px auto",
padding: "20px",
borderRadius: "12px",
backgroundColor: "rgba(255, 255, 255, 0.95)",
boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

return (
<div style={mainContainerStyle}>
{/* 🔇 IFRAME BGM TERSEMBUNYI */}
<div
id={BGM_PLAYER_ID} 
style={{
position: "absolute",
top: -100, 
left: -100,
width: 1,
height: 1,
overflow: 'hidden'
}}
/>

{/* SECTION 1: HEADER & JUDUL FGD */}
<header style={headerStyle}>
<h3 style={{ margin: 0}}>KELOMPOK 2 PENDIDIKAN AGAMA</h3>
<h1 style={{ margin: "5px 0 10px 0", fontSize: "3em" }}>
Konsep Kerukunan Umat Beragama dan Implementasinya dalam Multi Konteks
</h1>
<p style={{ fontSize: "1.2em" }}>
Topik ini mengarah pada pembahasan tentang bagaimana nilai-nilai kerukunan umat beragama dipahami, diterapkan, dan dikembangkan dalam berbagai bidang kehidupan di Indonesia sebagai upaya memperkuat toleransi, moderasi beragama, dan persatuan nasional.
</p>

{/* Call to Action Utama (Tombol Play/Pause) */}
<button
onClick={togglePlay} 
style={{
display: "inline-block",
marginTop: "25px",
padding: "10px 25px",
backgroundColor: isPlaying ? "#f32e07ff" : "#062ef4ff", 
color: "white",
border: "none",
borderRadius: "50px",
fontWeight: "bold",
cursor: "pointer",
fontSize: "1.2em",
transition: "background-color 0.3s ease",
}}
>
{isPlaying ? "Pause" : "Play Music"}
</button>
</header>

{/* SECTION 2: DETAIL LOGISTIK - VERSI INTERAKTIF */}
<section style={sectionContentStyle}>
<h2 style={{ textAlign: "center", color: "#01070eff", marginBottom: "10px" }}>INFORMASI PRESENTASI</h2>

{/* Komponen Interaktif dengan Kalender & Jam Analog */}
<MeetingInfoInteractive />
</section>

{/* SECTION 3: TEAM & INTERACTIVE PROFILES */}
<section style={sectionContentStyle}>
<h3 style={{ textAlign: "center", margin: 0,  color: "#007bff" }}>ANGGOTA KELOMPOK 2</h3>
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

<div
style={{
marginTop: "50px",
maxWidth: "800px",
margin: "50px auto 0 auto",
padding: "0 20px",
}}
>

{/* 🚀 EMBED SLIDE PRESENTASI */}
<div style={{ margin: "40px 0 30px 0" }}>
<h3 style={{ marginBottom: "15px", color: "#66aaff" }}>
SLIDE
</h3>
<div
style={{
position: "relative",
paddingBottom: "56.25%", 
height: 0,
overflow: "hidden",
maxWidth: "100%",
background: "black",
borderRadius: "8px",
}}
>
<iframe
width="100%"
height="100%"
src={SLIDE_EMBED_URL}
title="Slide Presentasi FGD"
frameBorder="0"
allowFullScreen
style={{
position: "absolute",
top: 0,
left: 0,
border: "2px solid #007bff",
}}
></iframe>
</div>
</div>

{/* 📄 EMBED ARTIKEL LENGKAP */}
<div style={{ margin: "40px 0 30px 0" }}>
<h3 style={{ marginBottom: "15px", color: "#66aaff" }}>
ARTIKEL
</h3>
<div
style={{
position: "relative",
paddingBottom: "120%", 
height: 0,
overflow: "hidden",
maxWidth: "100%",
background: "white",
borderRadius: "8px",
}}
>
<iframe
width="100%"
height="100%"
src={ARTIKEL_EMBED_URL}
title="Artikel Lengkap FGD"
frameBorder="0"
allowFullScreen
style={{
position: "absolute",
top: 0,
left: 0,
border: "2px solid #28a745",
}}
></iframe>
</div>

{/* Tautan Unduh opsional */}
<p style={{ margin: "25px 0 10px 0", fontSize: "1em", fontWeight: "bold", color: "white" }}>
Download Artikel
</p>
<a
href={ARTIKEL_LINK_DOWNLOAD}
target="_blank"
rel="noopener noreferrer"
style={{
display: "inline-block",
margin: "10px auto",
padding: "10px 20px",
backgroundColor: "#28a745",
color: "white",
textDecoration: "none",
borderRadius: "5px",
width: "fit-content",
fontWeight: "500",
}}
>
download
</a>
</div>
</div>
</section>
</div>
);
};

export default FGDPage;