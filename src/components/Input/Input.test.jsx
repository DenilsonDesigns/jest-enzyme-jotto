import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../../test/testUtils";
import Input, { UnconnectedInput } from "./Input";
import { UnconnectedApp } from "../App/App";

const setup = (initialState = {}) => {
  // *** using store factory so we don't need wrapping provider component
  const store = storeFactory(initialState);
  //   *** the dive method 'dives' down to the React component
  // ie: will not return the wrapping Context Provider that Redux provides.
  return shallow(<Input store={store} />)
    .dive()
    .dive();
};

describe("up", () => {});

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as props", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("'guessWord' action creator is a function prop", () => {
    const wrapper = setup();
    // *** check if a function is a prop
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("guessWord action creator call", () => {
  let guessWordMock, wrapper;
  const guessedWord = "train";

  beforeEach(() => {
    guessWordMock = jest.fn();

    const props = {
      guessWord: guessWordMock,
    };
    wrapper = shallow(<UnconnectedInput {...props} />);

    // add value to input box
    wrapper.setState({ currentGuess: guessedWord });

    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("calls guessWord when button is clicked", () => {
    const guessWordCallCount = guessWordMock.mock.calls.length;

    expect(guessWordCallCount).toBe(1);
  });

  test("calls guessWord with input value as argument", () => {
    const guessedWordArg = guessWordMock.mock.calls[0][0];
    expect(guessedWordArg).toBe(guessedWord);
  });

  test("input box clears on submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
