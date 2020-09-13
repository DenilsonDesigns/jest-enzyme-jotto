import { correctGuess, actionTypes } from "./index";

describe("correctGuess", () => {
  test('returns an action with type "CORRECT_GUESS"', () => {
    const action = correctGuess();
    // *** for mutable type use toEqual
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
