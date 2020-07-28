import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReminderForm from "components/Day/ReminderForm";
import reminder from "components/Day/Reminder";
import { useSelector, useDispatch } from "react-redux";

configure({ adapter: new Adapter() });

describe("Form Validation", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
