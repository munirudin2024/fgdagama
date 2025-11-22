// File: src/components/LiveClock.jsx

import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(timerId);
  }, []); 

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondAngle = seconds * 6; 
  const minuteAngle = minutes * 6 + (seconds / 60) * 6; 
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; 

  return (
    // Container utama
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
      
      {/* Container Jam */}
      <div style={{
        position: 'relative',
        width: '240px', // Diperbesar
        height: '240px', // Diperbesar
        borderRadius: '50%',
        border: '10px solid #ffffff', 
        
        // 🔥 Desain Shadow Baru: Lebih dalam dan elegan 🔥
        boxShadow: '0 0 10px rgba(0,0,0,0.1), inset 0 0 15px rgba(0,0,0,0.1)', 
        background: 'linear-gradient(135deg, #f0f0f5 0%, #ffffff 100%)', // Latar belakang abu-abu muda/putih
      }}>
        
        {/* Angka jam */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const radius = 95; 
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={num}
              style={{
                position: 'absolute',
                fontSize: '16px', 
                fontWeight: '500', 
                color: '#495057', 
                transform: `translate(${x}px, ${y}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-8px',
                marginTop: '-10px'
              }}
            >
              {num}
            </div>
          );
        })}
        
        {/* Garis Penanda */}
        {Array.from({ length: 60 }).map((_, i) => {
            const length = i % 5 === 0 ? 10 : 5;
            const thickness = i % 5 === 0 ? 3 : 1;
            const color = i % 5 === 0 ? '#6c757d' : '#adb5bd';

            return (
                <div 
                    key={`mark-${i}`}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: `${thickness}px`,
                        height: `${length}px`,
                        backgroundColor: color,
                        transformOrigin: `0 ${length / 2}px`,
                        transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(-${105}px)`, 
                        zIndex: 5
                    }}
                />
            );
        })}


        {/* Titik tengah */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '18px', 
          height: '18px',
          backgroundColor: '#007bff', 
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(0, 123, 255, 0.5)',
          zIndex: 10
        }}></div>
        
        {/* Jarum jam */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '8px', 
          height: '60px', 
          backgroundColor: '#343a40', 
          borderRadius: '4px',
          transformOrigin: 'bottom center',
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          zIndex: 7,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}></div>
        
        {/* Jarum menit */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '6px', 
          height: '90px', 
          backgroundColor: '#495057', 
          borderRadius: '3px',
          transformOrigin: 'bottom center',
          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          zIndex: 8,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}></div>

        {/* Jarum DETIK */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '2px',
          height: '100px',
          backgroundColor: '#dc3545', 
          borderRadius: '1px',
          transformOrigin: 'bottom center',
          transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
          zIndex: 9
        }}></div>

        {/* Lingkaran penutup jarum */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '10px',
          height: '10px',
          backgroundColor: '#ffffff', 
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 11
        }}></div>
      </div>
      
      {/* Teks Jam Digital */}
      {/*
      <div style={{ 
          marginTop: '20px', 
          fontSize: '1.5em', 
          fontWeight: 'bold', 
          color: '#343a40',
          backgroundColor: '#ffffff',
          padding: '8px 15px',
          borderRadius: '6px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          letterSpacing: '2px',
      }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      */}

    </div>
  );
};

export default LiveClock;