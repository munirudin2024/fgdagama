// src/main.jsx (Versi Integrasi Chat Pop-up)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ChatPopup from "./components/ChatPopup.jsx"; // Import komponen chat

// Merender aplikasi utama (App.jsx) ke #root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// --- START: Rendering Chat Pop-up ke Portal Terpisah ---

// Dapatkan elemen container untuk chat
const chatPortalRoot = document.getElementById("chat-portal");

if (chatPortalRoot) {
  // Buat root terpisah untuk ChatPopup
  ReactDOM.createRoot(chatPortalRoot).render(
    <React.StrictMode>
      <ChatPopup /> 
    </React.StrictMode>
  );
}
// --- END: Rendering Chat Pop-up ke Portal Terpisah ---