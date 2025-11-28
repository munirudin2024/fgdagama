import React, { useState, useRef, useEffect } from "react";
import MemberCard from "./components/MemberCard";
import LecturerCard from "./components/LecturerCard"; 
import { lecturer, members } from "./data/fgdMembers";
import Calendar from "./components/Calendar"; // 🔥 HANYA import Calendar 🔥

const BACKGROUND_IMAGE_URL =
"https://unsia.ac.id/wp-content/uploads/2023/10/pic10.jpg";

// ===================================================================
// KONSTANTA STATIS 
const meetingDate = 29;
const meetingMonth = 10; // November (0=jan 11=des)
const meetingYear = 2025;
const zoomLink = ""; // Link Zoom - GANTI DENGAN LINK ZOOM ANDA
// ===================================================================

const YOUTUBE_VIDEO_ID = "_VfAP45O3_w"; // Video Record Presentasi
//const BGM_YOUTUBE_ID = "WhqEGF5LoDk";
const BGM_YOUTUBE_ID = "C55zjPlqdYw";
const BGM_PLAYER_ID = "bgm-youtube-player";

const ARTIKEL_EMBED_URL = "https://docs.google.com/document/d/17EdMmsnIo_dvue0GOgu1-xo5dyGXHGZZbyTpx-Je9vI/edit?usp=sharing"; 
const ARTIKEL_LINK_DOWNLOAD = "https://docs.google.com/document/d/17EdMmsnIo_dvue0GOgu1-xo5dyGXHGZZbyTpx-Je9vI/edit?usp=sharing"; 

// ===== KOMPONEN UTAMA FGD PAGE =====
const FGDPage = () => {
    // 1. STATE UNTUK STATUS PEMUTARAN
    const [isPlaying, setIsPlaying] = useState(false);
    // 2. REF UNTUK MENYIMPAN OBJEK PEMAIN YOUTUBE
    const playerRef = useRef(null);

    // Fungsi untuk membuat objek pemain YouTube
    const createPlayer = () => {
        if (window.YT && document.getElementById(BGM_PLAYER_ID)) {
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
                        event.target.mute(); 
                        console.log("YouTube Player BGM berhasil dimuat."); 
                    },
                },
            });
        }
    };

    useEffect(() => {
        // Logika pemuatan YouTube Iframe API
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }
        
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
                setTimeout(() => {
                    playerRef.current.unMute();
                    playerRef.current.setVolume(25); 
                    playerRef.current.playVideo();
                    setIsPlaying(true);
                }, 10); 
            }
        } else {
            console.error("YouTube Player belum siap. Coba refresh halaman.");
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
        padding: "80px 10px",
        marginBottom: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        color: "white",
    };

    // Gaya untuk konten di tengah (tetap dengan maxWidth untuk konten non-embed)
    const sectionContentStyle = {
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px", 
        borderRadius: "12px",
    };

    // Gaya khusus untuk konten yang ingin Full Width
    const fullWidthSectionStyle = {
        textAlign: "center",
        padding: "40px 0",
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
                <h3 style={{ margin: 0}}>PENDIDIKAN AGAMA SI303</h3>
                <h3 style={{ margin: 0}}>KELOMPOK 2</h3>
                <h1 style={{ margin: "5px 0 10px 0", fontSize: "3em" }}>
                    Konsep Kerukunan Umat Beragama dan Implementasinya dalam Multi Konteks
                </h1>
                <p style={{ fontSize: "1.2em" }}>
                    Topik ini mengarah pada pembahasan tentang bagaimana nilai-nilai kerukunan umat beragama dipahami, diterapkan, dan dikembangkan dalam berbagai bidang kehidupan di Indonesia sebagai upaya memperkuat toleransi, moderasi beragama, dan persatuan nasional.
                </p>
            </header>

            {/* SECTION 2: DETAIL LOGISTIK - KALENDER, JAM, DAN ZOOM */}
            <section style={sectionContentStyle}>
                {/* Hanya memanggil Calendar yang sudah mengirim props */}
                <Calendar 
                    meetingDate={meetingDate}
                    meetingMonth={meetingMonth}
                    meetingYear={meetingYear}
                    zoomLink={zoomLink}
                />
            </section>

            {/* SECTION 3: TEAM & INTERACTIVE PROFILES */}
            <section style={{...sectionContentStyle, textAlign: "center"}}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: '-20px',
                        marginBottom: '-20px',
                    }}
                >
                    {/* Kartu Dosen */}
                    <LecturerCard key={lecturer.id} lecturer={lecturer} /> 
                </div>
            </section>

            <section style={{...sectionContentStyle, textAlign: "center"}}>
                {/*<h3 
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #0056b3, #007bff)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: '0 4px 15px rgba(0, 86, 179, 0.4)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        marginBottom: '30px',
                    }}
                >
                    ANGGOTA KELOMPOK 2
                </h3>*/}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        maxWidth: "100%",
                        margin: "0 auto",
                        padding: "0 10px",
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
                <div
                    style={{
                        marginTop: "50px",
                        maxWidth: "1200px", 
                        margin: "50px auto 0 auto",
                        padding: "0 20px", 
                    }}
                >
                    {/* Tautan Unduh Artikel */}
                    {/*
                    <div style={{ margin: "40px 0 30px 0" }}>
                        <p style={{ margin: "25px 0 10px 0", fontSize: "1em", fontWeight: "bold", color: "white" }}>
                        </p>
                        <a
                            href={ARTIKEL_LINK_DOWNLOAD}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.94))',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                marginTop: '-100px',
                                marginBottom: '-50px',
                                
                            }}
                        >
                            download artikel
                        </a>
                    </div> */}
                </div> 
            </section>

            {/* 🎶 TOMBOL MUTE/UNMUTE FIXED (Posisi tetap - KANAN ATAS) */}
            <button
                onClick={togglePlay} 
                style={{
                    position: 'fixed',
                    top: '15px',
                    right: '15px',
                    zIndex: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "3px",
                    width: "27px",
                    height: "27px",
                    backgroundColor: isPlaying ? "#03a10bff" : "#f32e07ff", 
                    color: "white",
                    border: "2px solid white", 
                    borderRadius: "50%", 
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.4)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'; 
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {isPlaying ? (
                    // Ikon Speaker Penuh (UNMUTE)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                ) : (
                    // Ikon Speaker Dicoret (MUTE)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="22" y1="9" x2="16" y2="15"></line>
                        <line x1="16" y1="9" x2="22" y2="15"></line>
                    </svg>
                )}
            </button>

        </div> 
    );
};

export default FGDPage;