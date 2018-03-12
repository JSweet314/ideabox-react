import React, { Component } from 'react';
import IdeaForm from './IdeaForm.js';
import IdeaCards from '../components/IdeaCards.js';
import QualityFilter from '../components/QualityFilter';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      searchValue: '',
      qualityFilter: ''
    };
  }

  componentDidMount() {
    let ideas = [];
    let previousBox = localStorage.getItem('ideabox');

    if (previousBox) {
      ideas = JSON.parse(previousBox);
    }
    
    this.setState({ideas});
  }

  handleNewIdea = (idea) => {
    const ideas = [idea, ...this.state.ideas];

    localStorage.setItem('ideabox', JSON.stringify(ideas));
    this.setState({ideas});
  }

  removeIdea = (id) => {
    const ideas = this.state.ideas.filter(idea => {
      return idea.id !== id;
    });

    localStorage.setItem('ideabox', JSON.stringify(ideas));

    this.setState({ideas});
  }

  updateIdeaQuality = (event, id) => {
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

  searchIdeas = (searchValue) => {
    this.setState({searchValue});
  }

  filterByQuality = (qualityFilter) => {
    if (qualityFilter === 'all') {
      qualityFilter = '';
    }

    this.setState({qualityFilter});
  }

  render() {
    return (
      <div className="app">
        <IdeaForm handleNewIdea={this.handleNewIdea} />
        <QualityFilter 
          filterByQuality={this.filterByQuality}
          searchIdeas={this.searchIdeas}
        />
        <IdeaCards 
          ideas={this.state.ideas}
          searchValue={this.state.searchValue}
          qualityFilter={this.state.qualityFilter}
          updateIdeaQuality={this.updateIdeaQuality}
          removeIdea={this.removeIdea}
        />
      </div>
    );
  }
}

export default App;