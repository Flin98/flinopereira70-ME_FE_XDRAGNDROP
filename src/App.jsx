import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (index) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...digits];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setDigits(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Drag &amp; Drop Digits</h1>
        <p className="subtitle">Drag the boxes to reorder the digits 0–9.</p>

        <div className="grid">
          {digits.map((digit, index) => {
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;

            return (
              <div
                key={digit}
                className={`box ${isDragging ? "dragging" : ""} ${
                  isDragOver ? "drag-over" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={() => handleDragLeave(index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                {digit}
              </div>
            );
          })}
        </div>

        <p className="tip-text">
          Tip: Try reordering to make <span className="highlight-tag">0123456789</span> or reverse it!
        </p>
      </div>
    </div>
  );
}