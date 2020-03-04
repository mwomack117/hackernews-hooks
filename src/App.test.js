import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";
import { unmountComponentAtNode } from "react-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  test("button element renders", () => {
    const wrapper = shallow(<Button />);

    expect(wrapper);
  });
});
