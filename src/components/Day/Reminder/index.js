import React from "react";
import "./index.css";

const reminder = ({ reminder, handleSetEdit, handleDeleteReminder }) => (
  <article className="reminder" style={{ background: reminder.color }}>
    <div className="tools">
      <button onClick={() => handleDeleteReminder(reminder.id)}>
        <i className="fas fa-trash-alt" />
      </button>
      <button onClick={() => handleSetEdit(reminder)}>
        <i className="fas fa-edit" />
      </button>
    </div>
    <strong>{reminder.description}</strong>
    <strong>{reminder.city}</strong>
    <strong>{reminder.weather} °C</strong>
    <time>{reminder.time}</time>
  </article>
);

export default reminder;
