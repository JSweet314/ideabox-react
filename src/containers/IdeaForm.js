import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Idea from '../scripts/Idea.js';
import '../styles/IdeaForm.css';

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: '',
      bodyInput: '',
      saveDisabled: true,
      titleChars: 120,
      bodyChars: 120
    };
  }

  updateTitleInput(e) {
    const waitingForUserInput = e.target.value && this.state.bodyInput;

    this.setState({
      titleInput: e.target.value,
      saveDisabled: !waitingForUserInput,
      titleChars: 120 - e.target.value.length
    });
  }

  updateBodyInput(e) {
    const waitingForUserInput = e.target.value && this.state.titleInput;

    this.setState({
      bodyInput: e.target.value,
      saveDisabled: !waitingForUserInput,
      bodyChars: 120 - e.target.value.length
    });
  }

  createIdea(event) {
    event.preventDefault();
    const idea = new Idea(this.state.titleInput, this.state.bodyInput);

    this.props.handleNewIdea(idea);
    this.setState({
      titleInput: '',
      bodyInput: '',
      saveDisabled: true
    });
  }

  render() {
    return (
      <form>
        <h1><span>idea</span>box</h1>
        <input 
          aria-label="idea title input"
          className="titleInput"
          type="text"
          placeholder="Idea Title"
          maxLength="120"
          value={this.state.titleInput}
          onChange={(e) => this.updateTitleInput(e)}
        />
        <p>Characters remaining: {this.state.titleChars}</p>
        <input 
          aria-label="idea body input"
          className="bodyInput"
          type="text"
          placeholder="Idea Body"
          maxLength="120"
          value={this.state.bodyInput}
          onChange={(e) => this.updateBodyInput(e)}
        />
        <p>Characters remaining: {this.state.bodyChars}</p>
        <button 
          title="Save Idea"
          onClick={(e) => this.createIdea(e)}
          disabled={this.state.saveDisabled}>
          save
        </button>
      </form>
    );
  }
}

IdeaForm.propTypes = {
  handleNewIdea: PropTypes.func.isRequired
};

export default IdeaForm;