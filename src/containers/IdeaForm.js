import React, {Component} from 'react';
import Idea from '../Idea.js';
import '../IdeaForm.css';
import PropTypes from 'prop-types';

class IdeaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: '',
      bodyInput: '',
      saveDisabled: true
    };
  }

  updateTitleInput(e) {
    const waitingForUserInput = e.target.value && this.state.bodyInput;

    this.setState({
      titleInput: e.target.value,
      saveDisabled: !waitingForUserInput
    });
  }

  updateBodyInput(e) {
    const waitingForUserInput = e.target.value && this.state.titleInput;

    this.setState({
      bodyInput: e.target.value,
      saveDisabled: !waitingForUserInput
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
          value={this.state.titleInput}
          onChange={(e) => this.updateTitleInput(e)}
        />
        <input 
          aria-label="idea body input"
          className="bodyInput"
          type="text"
          placeholder="Idea Body"
          value={this.state.bodyInput}
          onChange={(e) => this.updateBodyInput(e)}
        />
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