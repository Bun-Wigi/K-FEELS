import React from "react";
import Card from "./components/Card";
import DramaGrid from "./components/DramaGrid";
import Navbar from '../k-feels-vite/src/Navbar';

function App() {
  return (
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: 24,
      }}
    >
      <Navbar />
      <h1>K-Feels</h1>

      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <Card title="By mood" />
        <Card title="By Character" />
        <Card title="Random" />
      </div>
      <DramaGrid />
    </div>
  );
}

export default App;
