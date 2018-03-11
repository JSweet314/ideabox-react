import React, { Component } from 'react';
import IdeaForm from './IdeaForm.js';
import IdeaCards from '../components/IdeaCards.js';
import '../styles/App.css';

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
    this.filterByQuality = this.filterByQuality.bind(this);
  }

  componentDidMount() {
    let ideas = [];
    let previousBox = localStorage.getItem('ideabox');

    if (previousBox) {
      ideas = JSON.parse(previousBox);
    }
    
    this.setState({ideas, visibleIdeas: ideas});
  }

  handleNewIdea(idea) {
    const ideas = [idea, ...this.state.ideas];

    localStorage.setItem('ideabox', JSON.stringify(ideas));
    this.setState({ideas, visibleIdeas: ideas});
  }

  removeIdea(id) {
    const filteredIdeas = this.state.ideas.filter(idea => {
      return idea.id !== id;
    });

    localStorage.setItem('ideabox', JSON.stringify(filteredIdeas));

    this.setState({ideas: filteredIdeas, visibleIdeas: filteredIdeas});
  }

  updateIdeaQuality(event, id) {
    const {idea, index} = this.state.ideas.reduce((data, idea, index) => {
      if (idea.id === id) {
        data = {idea, index};
      }
      return data;
    }, {});
  
    switch (event.target.className) {
    case 'upVoteBtn':
      idea.quality = idea.quality === 'swill' ? 'plausible' : 'genius';
      break;        
    default:
      idea.quality = idea.quality === 'genius' ? 'plausible' : 'swill';
      break;
    }
    
    const ideas = [
      ...this.state.ideas.slice(0, index),
      idea,
      ...this.state.ideas.slice(index + 1)
    ];

    localStorage.setItem('ideabox', JSON.stringify(ideas));

    this.setState({ideas});
  }

  searchIdeas(searchValue) {
    let visibleIdeas = this.state.ideas.filter(idea => {
      return (
        idea.title.includes(searchValue) || idea.body.includes(searchValue)
      );
    });
    
    this.setState({visibleIdeas});
  }

  filterByQuality(qualityFilter) {
    let visibleIdeas;

    if (qualityFilter === 'all') {
      visibleIdeas = this.state.ideas;
    } else {
      visibleIdeas = this.state.ideas.filter(idea => {
        return idea.quality === qualityFilter;
      });
    }

    this.setState({visibleIdeas, qualityFilter});
  }

  render() {
    return (
      <div className="app">
        <IdeaForm handleNewIdea={this.handleNewIdea} />
        <IdeaCards 
          visibleIdeas={this.state.visibleIdeas}
          updateIdeaQuality={this.updateIdeaQuality}
          removeIdea={this.removeIdea}
          searchIdeas={this.searchIdeas}
          filterByQuality={this.filterByQuality}
        />
      </div>
    );
  }
}

export default App;