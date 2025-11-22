// File: src/components/Calendar.jsx

import React, { useState, useEffect } from 'react'; 
import LiveClock from './LiveClock'; // Pastikan LiveClock ada di folder ini

// Konstanta Nama Bulan dan Hari
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const WEEK_DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Fungsi Pembantu: Mendapatkan jumlah hari dalam sebulan
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Fungsi Pembantu: Mendapatkan hari pertama dalam sebulan (0=Minggu, 6=Sabtu)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// =========================================================
// KOMPONEN UTAMA CALENDAR
// =========================================================
const Calendar = ({ meetingDate, meetingMonth, meetingYear, zoomLink }) => {
  const [currentDate] = useState(new Date());
  
  // 1. Dapatkan data Hari Ini (Today)
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const meetingMonthIndex = meetingMonth;
  const daysInMeetingMonth = getDaysInMonth(meetingYear, meetingMonthIndex);
  const firstDayOfMonth = getFirstDayOfMonth(meetingYear, meetingMonthIndex);

  // Buat array hari dalam bulan (termasuk offset hari kosong)
  const calendarDays = [];
  
  // Tambahkan hari kosong untuk offset
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Tambahkan tanggal
  for (let i = 1; i <= daysInMeetingMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div style={styles.container}>
      {/* Kolom Kiri: Jam Analog & Meeting Info */}
      <div style={styles.leftColumn}>
        <div style={styles.clockWrapper}>
          <LiveClock />
        </div>
        
        <div style={styles.meetingInfo}>
          <h3>Waktu Pertemuan</h3>
          <p>
            Tanggal : {meetingDate} {MONTH_NAMES[meetingMonthIndex]} {meetingYear}
          </p>
          <a
            href={zoomLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.zoomButton}
          >
            {zoomLink ? "Gabung ke Zoom Meeting" : " join zoom sekarang "}
          </a>
          <p style={{ marginTop: '10px', fontSize: '0.85em', color: '#ccc' }}>
            {zoomLink ? 'Klik untuk bergabung tepat waktu.' : ''}
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Kalender Sederhana */}
      <div style={styles.rightColumn}>
        <h3 style={styles.calendarHeader}>
          📅 {MONTH_NAMES[meetingMonthIndex]} {meetingYear}
        </h3>
        
        <div style={styles.calendarGrid}>
          {/* Header Hari (Min, Sen, ... Sab) */}
          {WEEK_DAYS.map(day => (
            <div key={day} style={styles.dayHeader}>
              {day}
            </div>
          ))}
          
          {/* Tanggal-tanggal */}
          {calendarDays.map((day, index) => {
             // Cek apakah hari ini (Hanya jika kalender yang ditampilkan adalah bulan dan tahun saat ini)
             const isToday = day === currentDay && 
                             meetingMonthIndex === currentMonth && 
                             meetingYear === currentYear;

             // Cek apakah hari pertemuan
             const isMeetingDay = day === meetingDate;

             return (
               <div
                 key={index}
                 style={{
                   ...styles.dayCell,
                   // Tandai Hari Ini (Today)
                   ...(isToday ? styles.todayStyle : {}), 
                   // Tandai Hari Pertemuan (Dominan jika hari ini adalah hari pertemuan)
                   ...(isMeetingDay ? styles.highlightedDay : {}), 
                   ...(index % 7 === 0 ? styles.sundayColor : {}), 
                 }}
               >
                 {day || ""}
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

// Gaya
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        margin: '0 auto',
        padding: '20px',
        //backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        //boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    },
    leftColumn: {
        flex: '1 1 300px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    clockWrapper: {
        marginBottom: '20px',
    },
    meetingInfo: {
        padding: '2px',
        //backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '8px',
        width: '100%',
       // boxShadow: '0 4px 10px rgba(0, 123, 255, 0.5)',
    },
    zoomButton: {
        display: 'inline-block',
        backgroundColor: '#21d405ff',
        color: 'black',
        padding: '10px 10px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.3s',
        //boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    },
    rightColumn: {
        flex: '1 1 350px',
        //backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        //boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
    },
    calendarHeader: {
        padding: '15px',
        backgroundColor: '#007bff', 
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.5)',
        border: 'none',
        marginBottom: '15px',
        borderRadius: '8px',

    },
    calendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        textAlign: 'center',
    },
    dayHeader: {
        fontWeight: 'bold',
        color: 'black',
        padding: '3px 0',
        backgroundColor: '#e6f7ff',
        borderRadius: '1px 1px 0 0',

    },
    dayCell: {
        padding: '2px 0',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        fontSize: '1em',
    },
    // Gaya untuk menandai HARI INI
    todayStyle: {
        backgroundColor: '#e6f7ff', 
        border: '2px solid #007bff',
        fontWeight: 'bold',
        color: '#007bff'
    },
    // Gaya untuk menandai HARI PERTEMUAN
    highlightedDay: {
        backgroundColor: '#ffc107', 
        color: 'black',
        fontWeight: 'bold',
        transform: 'scale(1)',
        boxShadow: '0 0 8px rgba(255, 193, 7, 0.7)',
        border: 'none',
    },
    sundayColor: {
        color: '#dc3545', 
    }
};


export default Calendar;