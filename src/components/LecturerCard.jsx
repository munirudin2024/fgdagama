// File: src/components/LecturerCard.jsx (Disesuaikan untuk imagePlaceholder)

import React from 'react';

const LecturerCard = ({ lecturer }) => {
    // ⚠️ PERUBAHAN DI SINI: Menggunakan imagePlaceholder
    const imageUrl = lecturer.imagePlaceholder || "https://via.placeholder.com/120x120?text=Dosen"; 

    // 1. Gaya Dasar Kartu
    const cardStyle = {
        width: '620px',
        margin: '20px',
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        cursor: 'default',
        border: '3px solid #0056b3', 
    };

    // 2. Gaya untuk Gambar Profil
    const imageStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
        border: '5px solid #007bff', 
        boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
    };

    // 3. Gaya untuk Informasi Teks
    const titleStyle = {
        fontSize: '1em',
        fontWeight: '',
        color: '#0056b3', 
        marginBottom: '2px',
        //textTransform: 'uppercase',
    };

    const nameStyle = {
        fontSize: '1.8em',
        fontWeight: '900',
        color: '#343a40', 
        margin: '0 0 10px 0',
    };

    const descriptionStyle = {
        fontSize: '1em',
        color: '#6c757d', 
        marginBottom: '2px',
        fontStyle: 'italic',
    };

    const roleTagStyle = {
        display: 'inline-block',
        backgroundColor: '#ffc107', 
        color: '#343a40',
        padding: '5px 15px',
        borderRadius: '20px',
        fontWeight: 'normal',
        letterSpacing: '0.5px',
    };
    
    // 4. Efek Hover Interaktif
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.01)';
        e.currentTarget.style.boxShadow = '0 10px 32px rgba(0, 0, 0, 0.25)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    };


    return (
        <div 
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Foto Profil - MENGGUNAKAN imageUrl BARU */}
            {/*<img 
                src={imageUrl} 
                alt={lecturer.name} 
                style={imageStyle} 
            />*/}

            {/* Judul/Role */}
            <p style={titleStyle}>{lecturer.title}</p>
            
            {/* Nama Lengkap */}
            <h2 style={nameStyle}>{lecturer.name}</h2>
            
            {/* Keterangan */}
            <p style={descriptionStyle}>{lecturer.description}</p>
            
            {/* Tag Role Khusus */}
            {/*<div style={roleTagStyle}>
                {lecturer.role || 'Dosen Pengampu'}
            </div>*/}
            
        </div>
    );
};

export default LecturerCard;