import React from "react";
import TimePicker from "rc-time-picker";
import ColorPicker from "rc-color-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";
import "./index.css";

const reminderForm = ({
  reminder,
  handleSetColor,
  handleSetEditDay,
  handleCreateUpdateReminder,
  defaultColor,
}) => {
  const time = reminder.time
    ? moment(reminder.time, "HH:mm a")
    : moment().hour(0).minute(0);

  return (
    <form
      method="post"
      onSubmit={(e) => handleCreateUpdateReminder(e, reminder)}
      className="reminder-form"
    >
      <textarea
        className="description"
        placeholder="Reminder"
        maxLength="30"
        defaultValue={reminder.description}
      />

      <select className="city" placeholder="City" defaultValue={reminder.city}>
        {CITIES.map((city, i) => (
          <option key={i} value={city}>
            {city}
          </option>
        ))}
      </select>

      <TimePicker
        showSecond={false}
        defaultValue={time}
        format="h:mm a"
        use12Hours
        inputReadOnly
      />

      <ColorPicker
        className="color-picker"
        animation="slide-up"
        color={reminder.color || defaultColor}
        onClose={handleSetColor}
      />

      <button className="btn-submit">Submit</button>

      <button className="btn-cancel" onClick={() => handleSetEditDay(null)}>
        Cancel
      </button>
    </form>
  );
};

export default reminderForm;

const CITIES = [
  "New York",
  "Buffalo",
  "Rochester",
  "Yonkers",
  "Syracuse",
  "Albany",
  "New Rochelle",
  "Mount Vernon",
  "Schenectady",
  "Utica",
  "White Plains",
  "Hempstead",
  "Troy",
  "Niagara Falls",
  "Binghamton",
  "Freeport",
  "Valley Stream",
];
