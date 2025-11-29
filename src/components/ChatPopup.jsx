// src/components/ChatPopup.jsx

import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; // Import Firestore dari file konfigurasi Anda
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot, 
    serverTimestamp 
} from "firebase/firestore";

// Import data anggota untuk identifikasi
import { members } from '../data/fgdMembers'; 

// URL Grup WhatsApp Anda
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/CcOoJYu2aJ1HfUakX7sXKw";

// Helper untuk membersihkan nomor WA
const formatWaNumber = (wa) => {
    if (!wa) return '';
    let cleaned = wa.replace(/[\s-]/g, ''); 
    if (cleaned.startsWith('0')) {
        return '62' + cleaned.substring(1);
    }
    return cleaned;
};

// --- Komponen Utama ---
const LiveChatPopup = () => {
    const [isOpen, setIsOpen] = useState(true); 
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ name: 'Tamu', wa: '' });
    const [loginInput, setLoginInput] = useState('');
    const [loginError, setLoginError] = useState('');
    const messagesEndRef = useRef(null);

    // Otomatis Gulir ke Bawah
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    // Cek Session Storage untuk Login & Inisialisasi Firebase Listener
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('chatUser'));
        if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
        }
        
        // Listener Firebase (Hanya aktif jika sudah login)
        if (storedUser || isLoggedIn) {
            const q = query(
                collection(db, "chats"), 
                orderBy("createdAt", "asc")
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setChatMessages(messages);
            });

            return () => unsubscribe();
        }
    }, [isLoggedIn]); // Re-run saat status login berubah

    // --- FUNGSI LOGIN ---
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        const inputCleaned = loginInput.trim();
        
        // Coba cari berdasarkan Nama ATAU WA
        const foundMember = members.find(member => 
            member.name.toLowerCase() === inputCleaned.toLowerCase() ||
            formatWaNumber(member.wa) === formatWaNumber(inputCleaned)
        );

        if (foundMember) {
            const userData = { 
                name: foundMember.name, // Ambil nama depan saja
                wa: formatWaNumber(foundMember.wa) 
            };
            setUser(userData);
            sessionStorage.setItem('chatUser', JSON.stringify(userData));
            setIsLoggedIn(true);
        } else {
            setLoginError('Nama atau Nomor WA tidak ditemukan di data anggota.');
        }
    };

    // --- FUNGSI KIRIM PESAN FIREBASE ---
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() !== '' && isLoggedIn) {
            try {
                await addDoc(collection(db, "chats"), {
                    text: message.trim(),
                    user: user.name, // Gunakan nama depan user yang sudah login
                    createdAt: serverTimestamp(),
                });
                setMessage('');
            } catch (error) {
                console.error("Error saat mengirim pesan:", error);
            }
        }
    };

    const handleOpenWa = () => {
        window.open(WHATSAPP_GROUP_URL, '_blank');
    }

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // --- RENDER UTAMA ---

    // Jika belum login, tampilkan layar login
    if (isOpen && !isLoggedIn) {
        return (
            <div style={styles.chatContainer}>
                <div style={styles.chatHeader}>
                    Kelompok 2 - Verifikasi
                    <button onClick={toggleChat} style={styles.closeButton}>X</button>
                </div>
                <div style={styles.loginBody}>
                    <p style={{marginBottom: '10px'}}>
                        Masukkan Nomor WA
                    </p>
                    <form onSubmit={handleLogin} style={styles.loginForm}>
                        <input
                            type="text"
                            value={loginInput}
                            onChange={(e) => setLoginInput(e.target.value)}
                            placeholder="08xxxx"
                            style={styles.inputField}
                        />
                        {loginError && <p style={styles.loginError}>{loginError}</p>}
                        <button type="submit" style={styles.loginButton}>Masuk Chat</button>
                    </form>
                    <button onClick={handleOpenWa} style={styles.waButtonSmall}>Akses Grup WA</button>
                </div>
            </div>
        );
    }


    // Jika sudah login, tampilkan ruang chat
    return (
        <>
            {isOpen && isLoggedIn && (
                <div style={styles.chatContainer}>
                    <div style={styles.chatHeader}>
                        Chat {user.name}
                        <button onClick={toggleChat} style={styles.closeButton}>X</button>
                    </div>
                    
                    <div style={styles.chatBody}>
                        {chatMessages.length === 0 && (
                            <p style={styles.initialMessage}>
                                Mulai koordinasi, semua anggota yang login akan melihat pesan ini secara *real-time*.
                            </p>
                        )}
                        {chatMessages.map(msg => (
                             <div 
                                key={msg.id} 
                                style={{
                                    ...styles.messageRow,
                                    // Style pesan Anda sendiri (opsional)
                                    backgroundColor: msg.user === user.name ? '#C8E6C9' : '#E0E0E0', 
                                    marginLeft: msg.user === user.name ? 'auto' : 'unset',
                                    textAlign: msg.user === user.name ? 'right' : 'left',
                                }}
                            >
                                {/*<span style={styles.messageUser}>
                                    {msg.user === user.name ? 'Anda' : msg.user}
                                </span>*/}
                                <span style={styles.messageText}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div style={styles.waLinkContainer}>
                        <button onClick={handleOpenWa} style={styles.waButton}>
                            Akses Grup WA
                        </button>
                    </div>

                    <form onSubmit={handleSendMessage} style={styles.chatFooter}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={`Kirim pesan sebagai ${user.name}...`}
                            style={styles.inputField}
                            disabled={!isLoggedIn}
                        />
                        <button type="submit" style={styles.sendButton} disabled={!isLoggedIn}>Kirim</button>
                    </form>
                </div>
            )}
            
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    style={styles.toggleButton}
                    title="Buka Chat Koordinasi"
                >
                    💬 Chat
                </button>
            )}
        </>
    );
};

// --- STYLES (DIPERBAIKI UNTUK LAYAR LOGIN) ---
const baseColors = {
    primary: '#066cfbff', // Biru Cerah
    accent: '#FF5722',   // Oranye
    wa: '#25D366',       // Hijau WA
    bgLight: '#F7F7F7',
    bgWhite: '#FFFFFF',
    textDark: '#333',
};

const styles = {
    // Tombol Pembuka (Saat chat tertutup)
    toggleButton: { 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999, 
        padding: '6px 12px',
        backgroundColor: baseColors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        display: 'flex',
        alignItems: 'center',
    },

    // Posisi dan Ukuran Chat Container
    chatContainer: {
        position: 'fixed',
        bottom: '20px', 
        right: '20px',
        width: '350px', 
        height: '480px',
        backgroundColor: baseColors.bgWhite,
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 99998,
        overflow: 'hidden',
    },

    // Header Chat
    chatHeader: {
        padding: '12px 15px',
        backgroundColor: baseColors.primary,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: 'white',
        opacity: 0.8,
        transition: 'opacity 0.2s',
    },

    // BADAN CHAT (AREA PESAN)
    chatBody: {
        flexGrow: 1,
        padding: '15px',
        overflowY: 'auto',
        backgroundColor: baseColors.bgLight,
        fontSize: '14px',
    },
    initialMessage: {
        color: '#A0A0A0',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: '20px'
    },
    messageRow: {
        maxWidth: '80%',
        marginBottom: '10px',
        wordWrap: 'break-word',
        padding: '8px 12px',
        borderRadius: '10px',
        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
        lineHeight: '1.4',
    },
    messageUser: {
        fontWeight: '700',
        color: baseColors.textDark,
        display: 'block',
        fontSize: '11px',
        marginBottom: '2px',
    },
    messageText: {
        color: baseColors.textDark,
        fontSize: '14px',
    },
    
    // AREA LINK WA
    waLinkContainer: {
        padding: '10px 15px',
        borderTop: '1px solid #E0E0E0',
        backgroundColor: baseColors.bgWhite,
    },
    waButton: {
        width: '100%',
        padding: '8px',
        backgroundColor: baseColors.wa,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
    waButtonSmall: { // Untuk layar login
        width: '100%',
        padding: '8px',
        backgroundColor: '#757575',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'normal',
        fontSize: '14px',
        marginTop: '10px',
    },

    // AREA LOGIN
    loginBody: {
        padding: '20px 15px',
        textAlign: 'left',
        flexGrow: 1,
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '15px',
    },
    loginButton: {
        padding: '10px',
        backgroundColor: baseColors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    loginError: {
        color: 'red',
        fontSize: '12px',
        textAlign: 'center',
    },
    
    // AREA INPUT DAN KIRIM
    chatFooter: {
        display: 'flex',
        padding: '10px 15px',
        borderTop: '1px solid #E0E0E0',
        backgroundColor: baseColors.bgWhite,
    },
    inputField: {
        flexGrow: 1,
        padding: '10px',
        border: '1px solid #D1D1D1',
        borderRadius: '20px 0 0 20px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    sendButton: {
        padding: '10px 15px',
        backgroundColor: baseColors.primary,
        color: 'white',
        border: 'none',
        borderRadius: '0 20px 20px 0',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    }
};

export default LiveChatPopup;