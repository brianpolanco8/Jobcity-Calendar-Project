import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import ReminderForm from "./ReminderForm";
import Reminder from "./Reminder";
import _sortBy from "lodash/sortBy";
import "./index.css";
import Api from "api";

const defaultColor = "#000";

const Day = (props) => {
  const [editReminder, setEditReminder] = useState({
    id: null,
    time: null,
    description: null,
    color: defaultColor,
    city: null,
    weather: null,
  });
  const dispatch = useDispatch();
  const reminderSelector = useSelector((state) => state);

  const handleSetColor = (data) => {
    setEditReminder({
      ...editReminder,
      color: data.color,
    });
  };

  const handleSetEdit = (reminder) => {
    props.handleSetEditDay(props.day);

    setEditReminder({
      ...editReminder,
      ...reminder,
    });
  };

  const handleCreateUpdateReminder = async (e, update) => {
    e.preventDefault();

    const form = e.target;
    const description = form.querySelector(".description").value.trim();
    const selectedCity = form.querySelector(".city");
    let weather = {};

    try {
      const response = await Api.getWeatherByCity(
        selectedCity.options[selectedCity.selectedIndex].value || "New York"
      );
      weather = response.data.main.temp;
    } catch (error) {
      console.log(error);
    }

    if (description.length) {
      const payload = {
        date: props.date,
        time: form.querySelector(".rc-time-picker-input").value,
        description: description,
        color: editReminder.color || defaultColor,
        city:
          selectedCity.options[selectedCity.selectedIndex].value || "New York ",
        weather: weather,
      };

      if (update.id) {
        payload["id"] = update.id;
        dispatch(actions.updateReminder(payload));
        // props.updateReminder(payload);
      } else {
        dispatch(actions.createReminder(payload));
        // props.createReminder(payload);
      }

      props.handleSetEditDay(null);

      setEditReminder({});
    }
  };

  const handleDeleteReminder = (id) => {
    dispatch(actions.deleteReminder(props.date, id));
    // props.deleteReminder(props.date, id);
  };

  const reminders = _sortBy(reminderSelector[props.date], "time") || [];

  const cssClasses = props.firstDayIndex
    ? `day first-index-${props.firstDayIndex}`
    : "day";

  return (
    <article className={cssClasses}>
      {!props.editDay && (
        <button
          className="btn-new-reminder"
          onClick={() => props.handleSetEditDay(props.day)}
        >
          <i className="fas fa-plus-circle" />
        </button>
      )}

      {props.editDay === props.day ? (
        <ReminderForm
          reminder={editReminder}
          handleSetColor={handleSetColor}
          handleSetEditDay={props.handleSetEditDay}
          handleCreateUpdateReminder={handleCreateUpdateReminder}
          defaultColor={defaultColor}
        />
      ) : (
        <React.Fragment>
          <header>{props.day}</header>

          {reminders.length
            ? reminders.map((reminder, i) => {
                return (
                  <Reminder
                    key={i}
                    reminder={reminder}
                    handleSetEdit={handleSetEdit}
                    handleDeleteReminder={handleDeleteReminder}
                  />
                );
              })
            : null}
        </React.Fragment>
      )}
    </article>
  );
};

export default Day;
