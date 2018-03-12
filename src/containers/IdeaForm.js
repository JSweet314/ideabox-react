import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/IdeaForm.css';

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      isDisabled: true,
      titleChars: 120,
      bodyChars: 120
    };
    this.handleNewIdea = props.handleNewIdea;
  }

  updateInput = (e) => {
    const {name, value} = e.target;
    const waitingForUserInput = value && 
    this.state[name === 'title' ? 'body' : 'title'];

    this.setState({
      [name]: value,
      isDisabled: !waitingForUserInput,
      [`${name}Chars`]: 120 - value.length
    });
  }

  createIdea = (event) => {
    event.preventDefault();
    const idea = {
      title: this.state.title,
      body: this.state.body,
      id: Date.now(),
      quality: 'swill'
    };

    this.handleNewIdea(idea);
    this.setState({
      title: '',
      body: '',
      titleChars: 120,
      bodyChars: 120,
      isDisabled: true
    });
  }

  render() {
    return (
      <form onSubmit={this.createIdea}>
        <h1><span>idea</span>box</h1>
        <input 
          aria-label="idea title input"
          className="titleInput"
          type="text"
          placeholder="Idea Title"
          maxLength="120"
          name="title"
          value={this.state.title}
          onChange={this.updateInput}
        />
        <p>Characters remaining: {this.state.titleChars}</p>
        <input 
          aria-label="idea body input"
          className="bodyInput"
          type="text"
          placeholder="Idea Body"
          maxLength="120"
          name="body"
          value={this.state.body}
          onChange={this.updateInput}
        />
        <p>Characters remaining: {this.state.bodyChars}</p>
        <button 
          type="submit"
          disabled={this.state.isDisabled}>
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