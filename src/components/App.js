import React, { Component } from 'react';
import '../App.css';
import IdeaForm from '../containers/IdeaForm';
import CardContainer from '../containers/CardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      visibleIdeas: []
    };

    this.handleNewIdea = this.handleNewIdea.bind(this);
    this.updateIdeaQuality = this.updateIdeaQuality.bind(this);
    this.removeIdea = this.removeIdea.bind(this);
    this.searchIdeas = this.searchIdeas.bind(this);
  }

  componentDidMount() {
    let ideas = [];
    let previousBox = localStorage.getItem('ideabox');

    if (previousBox) {
      ideas = JSON.parse(previousBox);
    }
    
    this.setState({
      ideas,
      visibleIdeas: ideas
    });
  }

  handleNewIdea(idea) {
    const ideas = [idea, ...this.state.ideas];

    localStorage.setItem(
      'ideabox',
      JSON.stringify(ideas)
    );
    this.setState({
      ideas,
      visibleIdeas: ideas
    });
  }

  removeIdea(e, id) {
    e.preventDefault();
    const filteredIdeas = this.state.ideas.filter(idea => {
      return idea.id !== id;
    });

    localStorage.setItem('ideabox', JSON.stringify(filteredIdeas));

    this.setState({
      ideas: filteredIdeas,
      visibleIdeas: filteredIdeas
    });
  }

  updateIdeaQuality(event, id) {
    const {idea, index} = this.state.ideas.reduce((obj, idea, index) => {
      if (idea.id === id) {
        obj = {idea, index};
      }
      return obj;
    }, {});
  
    switch (event.target.className) {
    case 'upVoteBtn':
      if (idea.quality === 'swill') {
        idea.quality = 'plausible';
      } else {
        idea.quality = 'genius';
      }
      break;        
    default:
      if (idea.quality === 'genius') {
        idea.quality = 'plausible';
      } else {
        idea.quality = 'swill';
      }
      break;
    }
    
    const ideas = [
      ...this.state.ideas.slice(0, index),
      idea,
      ...this.state.ideas.slice(index + 1)
    ];

    localStorage.setItem('ideabox', JSON.stringify(ideas));

    this.setState({
      ideas,
      visibleIdeas: [...this.state.visibleIdeas]
    });
  }

  searchIdeas(searchValue) {
    let results = this.state.ideas.filter(idea => {
      return idea.title.includes(searchValue) 
        || idea.body.includes(searchValue);
    });

    this.setState({
      visibleIdeas: results
    });
  }

  render() {
    return (
      <div className="app">
        <IdeaForm 
          handleNewIdea={this.handleNewIdea} 
        />
        <CardContainer 
          visibleIdeas={this.state.visibleIdeas}
          updateIdeaQuality={this.updateIdeaQuality}
          removeIdea={this.removeIdea}
          searchIdeas={this.searchIdeas}
        />
      </div>
    );
  }
}

export default App;