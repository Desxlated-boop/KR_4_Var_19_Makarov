import React, { useState, useEffect } from "react";

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("weeklyTasks");
    if (saved) return JSON.parse(saved);
    const empty = {};
    days.forEach((day) => (empty[day.toLowerCase()] = []));
    return empty;
  });

  useEffect(() => {
    localStorage.setItem("weeklyTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (day, text) => {
    setTasks((prev) => ({
      ...prev,
      [day]: [...prev[day], text],
    }));
  };

  const removeTask = (day, index) => {
    setTasks((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Таблица дел на неделю</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {days.map((day) => (
              <th
                key={day}
                style={{
                  border: "2px solid #333",
                  padding: "12px 8px",
                  background: "#f4f4f4",
                  fontSize: "14px",
                  wordWrap: "break-word",
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {days.map((day) => {
              const key = day.toLowerCase();
              return (
                <td
                  key={day}
                  style={{
                    border: "2px solid #333",
                    padding: "12px",
                    verticalAlign: "top",
                    height: "300px",
                  }}
                >
                  <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px" }}>
                    {tasks[key].map((task, i) => (
                      <li
                        key={i}
                        style={{
                          margin: "6px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          wordWrap: "break-word",
                        }}
                      >
                        <span style={{ flex: 1 }}>{task}</span>
                        <button
                          onClick={() => removeTask(key, i)}
                          style={{
                            marginLeft: "8px",
                            color: "red",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                            padding: "0 4px",
                          }}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>

                  <input
                    type="text"
                    placeholder="Новая задача → Enter"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "15px",
                      border: "1px solid #999",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        addTask(key, e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
