import React, { useState, useRef, useEffect } from "react";
import MemberCard from "./components/MemberCard";
import { lecturer, members } from "./data/fgdMembers";

const BACKGROUND_IMAGE_URL =
"https://unsia.ac.id/wp-content/uploads/2023/10/pic10.jpg";

const YOUTUBE_VIDEO_ID = "_VfAP45O3_w";
const BGM_YOUTUBE_ID = "WhqEGF5LoDk"; 
const BGM_PLAYER_ID = "bgm-youtube-player";

const SLIDE_EMBED_URL = ""; 
const ARTIKEL_EMBED_URL = ""; 
const ARTIKEL_LINK_DOWNLOAD = "";


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
videoId: BGM_YOUTUBE_ID, // ⬅️ Menggunakan ID BGM AMAN
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
// Cleanup function: memastikan pemain dihentikan dan dihapus saat komponen dilepas
return () => {
if (playerRef.current) {
playerRef.current.destroy();
}
};
}, []); 

// Fungsi untuk menangani pemutaran/jeda musik (Sudah benar)
const togglePlay = () => {
if (playerRef.current && window.YT) {
const isCurrentlyPlaying = playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING;
if (isCurrentlyPlaying || isPlaying) {
// Jeda
playerRef.current.pauseVideo();
setIsPlaying(false);
} else {
// Putar
playerRef.current.playVideo();
setIsPlaying(true);
}
}
};


// Gaya untuk container utama (Sudah benar)
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

// Gaya untuk Header (Sudah benar)
const headerStyle = {
textAlign: "center",
padding: "50px 20px",
marginBottom: "30px",
backgroundColor: "rgba(0, 0, 0, 0.65)",
color: "white",
};
// Gaya untuk konten di tengah (Sudah benar)
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
<h3 style={{ margin: 0 }}>FOCUS GROUP DISCUSSION</h3>
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
backgroundColor: isPlaying ? "#dc3545" : "#28a745", 
color: "white",
border: "none",
borderRadius: "50px",
fontWeight: "bold",
cursor: "pointer",
fontSize: "0.8em",
transition: "background-color 0.3s ease",
}}
>
{isPlaying ? "⏸️ JEDA MUSIK" : "▶️ PUTAR MUSIK"}
</button>
</header>

{/* SECTION 2: DETAIL LOGISTIK */}
<section style={sectionContentStyle}>
<h2 style={{ textAlign: "center", color: "#007bff" }}>KELOMPOK 2 PENDIDIKAN AGAMA</h2>
<div
style={{
display: "flex",
justifyContent: "space-around",
textAlign: "center",
marginTop: "20px",
}}
>
<div>
<h3>🗓️</h3>
<p>Jumat, 22 November 2025</p>
</div>
<div>
<h3>⏰</h3>
<p>14.00 - 16.00 WIB</p>
</div>
<div>
<h3>📍</h3>
<p>Ruang Rapat Digital</p>
</div>
</div>

</section>

{/* SECTION 3: TEAM & INTERACTIVE PROFILES */}
<section style={sectionContentStyle}>

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

{/* 🚀 START: EMBED SLIDE PRESENTASI */}
<div style={{ margin: "40px 0 30px 0" }}>
<h3 style={{ marginBottom: "15px", color: "#66aaff" }}>
SLIDE PRESENTASI
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
src={SLIDE_EMBED_URL} // ⬅️ Menggunakan konstanta yang benar
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
{/* 🏁 END: EMBED SLIDE PRESENTASI */}


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
src={ARTIKEL_EMBED_URL} // ⬅️ Menggunakan konstanta yang harus diisi URL Publikasi
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

{/* Tautan Unduh opsional di bawah embed */}
<p style={{ margin: "25px 0 10px 0", fontSize: "1em", fontWeight: "bold", color: "white" }}>

</p>
<a
href={ARTIKEL_LINK_DOWNLOAD} // ⬅️ Menggunakan konstanta yang benar
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