export const handleNewIdea = (idea) => {
  const ideas = [idea, ...this.state.ideas];
  
  localStorage.setItem(
    'ideabox',
    JSON.stringify(ideas)
  );
  
  return {
    ideas,
    visibleIdeas: ideas
  };
};

export const removeIdea = (e, id) => {
  e.preventDefault();
  const filteredIdeas = this.state.ideas.filter(idea => {
    return idea.id !== id;
  });
  
  localStorage.setItem('ideabox', JSON.stringify(filteredIdeas));
  
  return {
    ideas: filteredIdeas,
    visibleIdeas: filteredIdeas
  };
};

export const updateIdeaQuality = (event, id) => {
  const { idea, index } = this.state.ideas.reduce((obj, idea, index) => {
    if (idea.id === id) {
      obj = { idea, index };
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
  
  return {
    ideas,
    visibleIdeas: [...this.state.visibleIdeas]
  };
};

export const searchIdeas = (searchValue) => {
  let results = this.state.ideas.filter(idea => {
    return idea.title.includes(searchValue)
    || idea.body.includes(searchValue);
  });
  
  return {
    visibleIdeas: results
  };
};