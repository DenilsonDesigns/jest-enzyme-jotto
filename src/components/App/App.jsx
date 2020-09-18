import React, { Component } from "react";
import { connect } from "react-redux";
import Congrats from "../Congrats/Congrats";
import GuessedWords from "../GuessedWords/GuessedWords";
import "./App.css";
import { getSecretWord } from "../../actions/index";
import Input from "../Input/Input";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <Input />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
