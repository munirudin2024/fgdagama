import React, { useState, useRef, useEffect } from "react";
import MemberCard from "./components/MemberCard";
import { lecturer, members } from "./data/fgdMembers";

const BACKGROUND_IMAGE_URL =
"https://unsia.ac.id/wp-content/uploads/2023/10/pic10.jpg";

const YOUTUBE_VIDEO_ID = "_VfAP45O3_w"; // Video Record Presentasi
const BGM_YOUTUBE_ID = "WhqEGF5LoDk";//pop
//const BGM_YOUTUBE_ID = "gKmd_iOGNVI"; //religi (BGM)
const BGM_PLAYER_ID = "bgm-youtube-player";

const SLIDE_EMBED_URL = "https://docs.google.com/presentation/d/1yyYywV0y3Le0_zQnHrWglACl1Z7mIr1l/edit?usp=drive_link&ouid=101195429996281074479&rtpof=true&sd=true"; 
const ARTIKEL_EMBED_URL = "https://docs.google.com/document/d/17EdMmsnIo_dvue0GOgu1-xo5dyGXHGZZbyTpx-Je9vI/edit?usp=sharing"; 
const ARTIKEL_LINK_DOWNLOAD = "https://docs.google.com/document/d/17EdMmsnIo_dvue0GOgu1-xo5dyGXHGZZbyTpx-Je9vI/edit?usp=sharing"; 


// ===== KOMPONEN JAM ANALOG HIDUP (LIVE CLOCK) =====
const LiveClock = () => {
  // State untuk menyimpan waktu saat ini
  const [time, setTime] = useState(new Date());

  // useEffect untuk memperbarui waktu setiap 1 detik
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update setiap 1000 milidetik (1 detik)

    // Cleanup function: Hentikan interval ketika komponen dilepas
    return () => clearInterval(timerId);
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  // Ambil jam, menit, dan detik
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Hitung Sudut Jarum (dikonversi dari 0 ke 360 derajat)
  const secondAngle = seconds * 6; 
  const minuteAngle = minutes * 6 + (seconds / 60) * 6; 
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; 

  return (
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
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          zIndex: 7
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
          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          zIndex: 8
        }}></div>

        {/* Jarum DETIK */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '2px',
          height: '80px',
          backgroundColor: '#dc3545',
          borderRadius: '1px',
          transformOrigin: 'bottom center',
          transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
          zIndex: 9
        }}></div>
      </div>
    </div>
  );
};


// ===== KOMPONEN MEETING INFO INTERAKTIF =====
const MeetingInfoInteractive = () => {
  // Tanggal rapat (STATIS)
  const meetingDate = 22;
  const meetingMonth = 10; // November (0-indexed)
  const meetingYear = 2025;
  
  // Tanggal saat ini (LIVE)
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Check apakah kalender yang ditampilkan adalah bulan/tahun saat ini
  const isCurrentMonthYear = currentMonth === meetingMonth && currentYear === meetingYear;
  
  // Link Zoom - GANTI DENGAN LINK ZOOM ANDA
  const zoomLink = "";

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


  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      padding: '0',
      marginTop: '30px'
    }}>
      
      {/* Kalender Interaktif */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        padding: '20px',
        flex: '1 1 280px',
        minWidth: '280px'
      }}>
        
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
          
          {days.map((day, index) => {
            const isMeetingDay = day === meetingDate;
            const isToday = day === currentDay && isCurrentMonthYear; 
            
            // Base style for any valid day
            let style = {
                textAlign: 'center',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '6px',
                color: day ? '#333' : 'transparent', 
                cursor: day ? 'pointer' : 'default',
                backgroundColor: day ? 'transparent' : 'transparent'
            };
            
            if (day) {
                if (isMeetingDay) {
                    // Style Tanggal Presentasi (Prioritas 1: Biru, Berkedip)
                    style = {
                        ...style,
                        background: 'linear-gradient(135deg,  #007bff 0%, #0056b3 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0,123,255,0.4)',
                        transform: 'scale(1.1)',
                        animation: 'pulse 2s infinite',
                        cursor: 'default'
                    };
                }
                
                // Style Hari Ini (Prioritas 2: Hijau, Garis tepi), diterapkan di atas jika bukan Hari Presentasi
                if (isToday && !isMeetingDay) {
                    style = {
                        ...style,
                        border: '2px solid #28a745', // Green border
                        backgroundColor: '#d4edda', // Light green background
                        color: '#155724',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    };
                } else if (!isMeetingDay && !isToday) {
                    // Style Hari Normal
                    style = {
                        ...style,
                        color: '#333',
                        cursor: 'pointer'
                    };
                }
            }

            return (
              <div
                key={index}
                style={style}
              >
                {day}
              </div>
            );
          })}
        </div>
        
  
      </div>

      {/* Jam Analog HIDUP (Live Clock) */}
      <div style={{
        //backgroundColor: 'white',
        borderRadius: '12px',
        //boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        padding: '25px',
        flex: '1 1 280px',
        minWidth: '280px'
      }}>

        
        {/* Panggil LiveClock di sini */}
        <LiveClock />
        
        <div style={{ textAlign: 'center', marginTop: '10px', }}>
          <p style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}>15:30 - 17:30</p>
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
            background: 'linear-gradient(135deg, #007bff 0%, #19e2e9ff 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(111,66,193,0.3)',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
          >
            <img 
                src="icon-kelompok2.png" 
                alt="UNSIA" 
                width="80" 
                height="80" 
                style={{ fill: 'white' }} 
              />
          </div>
          
          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            <p style={{ fontSize: '20px', fontWeight: '', color: '#212529', marginBottom: '8px' }}>ID:</p>
            <p style={{ fontSize: '20px', fontWeight: '', color: '#212529', marginBottom: '8px' }}>passcode:</p>
    
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

// Gaya untuk konten di tengah (tetap dengan maxWidth untuk konten non-embed)
const sectionContentStyle = {
maxWidth: "1200px",
margin: "30px auto",
padding: "20px", // Tambahkan padding lagi agar kalender/jam tidak terlalu mepet
borderRadius: "12px",
//backgroundColor: "rgba(255, 255, 255, 0.95)",
//boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

// Gaya khusus untuk konten yang ingin Full Width
const fullWidthSectionStyle = {
    textAlign: "center",
    padding: "40px 0",
    //backgroundColor: "rgba(52, 58, 64, 0.9)",
    color: "white",
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

{/* Call to Action Utama (Tombol Play/Pause BARU) */}

<button
    onClick={togglePlay} 
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "18px",
        padding: "15px", // Padding lebih besar agar ikon di tengah
        width: "60px", 
        height: "60px",
        backgroundColor: isPlaying ? "#f32e07ff" : "#062ef4ff", // Merah saat Pause, Biru saat Play
        color: "white",
        border: "2px solid white", // Garis putih tebal
        borderRadius: "50%", // Membuat tombol lingkaran sempurna
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "2em",
        transition: "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
        margin: "25px auto 0 auto", // Tengah
        boxShadow: "0 6px 15px rgba(0,0,0,0.4)"
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'; // Efek hover
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
    }}
>
    {/* Ikon Play (▶️) atau Pause (⏸️) */}
    {isPlaying ? (
        // Ikon Pause (Dua garis vertikal)
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
    ) : (
        // Ikon Play (Segitiga ke kanan)
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
        </svg>
    )}
</button>

</header>

{/* SECTION 2: DETAIL LOGISTIK - VERSI INTERAKTIF */}
<section style={sectionContentStyle}>
{/* Komponen Interaktif dengan Kalender & Jam Analog */}
<MeetingInfoInteractive />
</section>

{/* SECTION 3: TEAM & INTERACTIVE PROFILES */}
<section style={{sectionContentStyle, textAlign: "center"}}>
<h3 
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.65))',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
>ANGGOTA KELOMPOK 2</h3>
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

{/* SECTION 4: DOCUMENTATION - FULL WIDTH */}
<section
id="documentation"
style={fullWidthSectionStyle}
>

{/* Container disetel agar mengisi lebar 100% dari section, tapi tetap memiliki margin horizontal untuk tampilan responsif yang bagus */}
<div
style={{
    marginTop: "50px",
    maxWidth: "1200px", // Memastikan konten maksimal 1200px
    margin: "50px auto 0 auto", // Tengah otomatis
    padding: "0 20px", // Tambahkan padding horizontal agar tidak menempel di tepi HP
}}
>

{/* 📹 EMBED VIDEO YOUTUBE (Recording) */}
{/*  
<div style={{ margin: "40px 0 30px 0" }}>
    <h3 style={{ marginBottom: "15px", color: "#ff4500" }}>
    </h3>
    <div
        style={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9 Aspect Ratio
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
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Video Recording FGD"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "2px solid #ff4500", 
            }}
        ></iframe>
    </div>
</div>
*/}

{/* 🚀 EMBED SLIDE PRESENTASI */}
<div style={{ margin: "40px 0 30px 0" }}>
<h3 style={{ marginBottom: "15px", color: "#66aaff" }}>
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
</p>
<a
href={ARTIKEL_LINK_DOWNLOAD}
target="_blank"
rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.65))',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
>
download artkel
</a>
</div>
</div>
</section>
</div>
);
};

export default FGDPage;