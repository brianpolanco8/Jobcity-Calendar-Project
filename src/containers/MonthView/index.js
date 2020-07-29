import React, { useState, useEffect } from "react";
import HeaderMonth from "components/HeaderMonth";
import HeaderWeekDays from "components/HeaderWeekDays";
import Day from "components/Day";
import moment from "moment";
import "./index.css";

const MonthView = (props) => {
  const [curMonth, setCurMonth] = useState({});
  const [nextMonth, setNextMonth] = useState({});
  const [prevMonth, setPrevMonth] = useState({});
  const weekdays = moment.weekdays();

  useEffect(() => {
    createState(props);
  }, []);

  useEffect(() => {
    createState(props);
  }, [props]);

  const createState = (props) => {
    const curMonth =
      props.match.params.year && props.match.params.month
        ? `${props.match.params.year}-${props.match.params.month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(curMonth).add(1, "M").format("YYYY-MM");

    const prevMonth = moment(curMonth).subtract(1, "M").format("YYYY-MM");

    setCurMonth({
      date: curMonth,
      name: moment(curMonth).format("MMMM YYYY"),
      days: moment(curMonth).daysInMonth(),
      editDay: null,
    });

    setNextMonth({
      date: nextMonth,
      slug: nextMonth.replace("-", "/"),
    });

    setPrevMonth({
      date: prevMonth,
      slug: prevMonth.replace("-", "/"),
    });
  };

  const handleSetEditDay = (day) => {
    setCurMonth({
      ...curMonth,
      editDay: day,
    });
  };

  const buildDays = () => {
    const days = [];
    const props = {
      editDay: curMonth.editDay,
      handleSetEditDay: handleSetEditDay,
    };

    for (let i = 1; i <= curMonth.days; i++) {
      let date = `${curMonth.date}-${("0" + i).slice(-2)}`;
      props["date"] = date;
      props["day"] = i;

      if (i === 1) {
        props["firstDayIndex"] = moment(date).startOf("month").format("d");
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<Day key={i} {...props} />);
    }

    return days;
  };

  const days = buildDays();

  return (
    <div className="month">
      <HeaderMonth
        curMonth={curMonth}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <HeaderWeekDays days={weekdays} />
      <section className="days">{days}</section>
    </div>
  );
};

export default MonthView;
