import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import App from '../containers/App.js';

describe('app', () => {
  let app, event, idea1, idea2;

  beforeEach(() => {
    event = {
      target: {
        className: 'upVoteBtn'
      }
    };

    idea1 = {
      id: 1234,
      title: 'Hello',
      body: 'World!',
      quality: 'plausible'
    };

    idea2 = {
      id: 4321,
      title: 'New App!',
      body: 'Woo Hoo',
      quality: 'genius'
    };

    localStorage.clear();

    app = shallow(<App />);
  });

  it('should render our good friend, App', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
  });

  it('should render an IdeaForm and a CardContainer', () => {
    expect(app).toMatchSnapshot();

    app = mount(<App />);

    expect(app).toMatchSnapshot();
  });  

  it('should hold an array of ideas in state', () => {
    expect(app.state('ideas')).toEqual([]);
  });

  it('should be able to add a new idea to its array of ideas', () => {
    expect(app.state('ideas')).toEqual([]);
    
    app.instance().handleNewIdea(idea1);

    expect(app.state('ideas')).toEqual([idea1]);
  });

  it('should allow for multiple ideas', () => {
    expect(app.state('ideas')).toEqual([]);

    app.instance().handleNewIdea(idea1);

    expect(app.state('ideas')).toEqual([idea1]);

    app.instance().handleNewIdea(idea2);

    expect(app.state('ideas')).toEqual([idea2, idea1]);
  });

  it('should store ideas in localStorage for latter', () => {
    expect(app.state('ideas')).toEqual([]);

    app.instance().handleNewIdea(idea1);

    expect(app.state('ideas')).toEqual([idea1]);
    expect(JSON.parse(localStorage.getItem('ideabox')).length).toEqual(1);

    app.instance().handleNewIdea(idea2);

    expect(app.state('ideas')).toEqual([idea2, idea1]);
    expect(JSON.parse(localStorage.getItem('ideabox')).length).toEqual(2);
  });

  it('should be able to remove an idea from its array', () => {
    app.instance().handleNewIdea(idea1);

    expect(app.state('ideas')).toEqual([idea1]);
    
    app.instance().removeIdea(1234);

    expect(app.state('ideas')).toEqual([]);
  });

  it('should allow the user to update the quality of an idea in the ideas array', () => {
    app.instance().handleNewIdea(idea1);

    expect(app.state('ideas')[0].quality).toEqual('plausible');

    app.instance().updateIdeaQuality(event, 1234);

    expect(app.state('ideas')[0].quality).toEqual('genius');

    event.target.className = 'downVoteBtn';
    app.instance().updateIdeaQuality(event, 1234);

    expect(app.state('ideas')[0].quality).toEqual('plausible');
  });

  it('should be able to search through and display specific ideas', () => {
    app.instance().handleNewIdea(idea1);
    app.instance().handleNewIdea(idea2);

    expect(app.state('visibleIdeas')).toEqual([idea2, idea1]);

    app.instance().searchIdeas('New App!');

    expect(app.state('visibleIdeas')).toEqual([idea2]);

    app.instance().searchIdeas('World!');

    expect(app.state('visibleIdeas')).toEqual([idea1]);

    app.instance().searchIdeas('');

    expect(app.state('visibleIdeas')).toEqual([idea2, idea1]); 
  });

  it('should be able to display ideas by quality', () => {
    app.instance().handleNewIdea(idea1);
    app.instance().handleNewIdea(idea2);
    app.instance().filterByQuality('genius');

    expect(app.state('visibleIdeas')).toEqual([idea2]);

    app.instance().filterByQuality('plausible');

    expect(app.state('visibleIdeas')).toEqual([idea1]);
  });

  it('should retrieve ideas from localStorage if available', () => {
    expect(app.state('ideas')).toEqual([]);
    
    localStorage.setItem('ideabox', JSON.stringify([idea2, idea1]));
    app = shallow(<App />);

    expect(app.state('ideas')).toEqual([idea2, idea1]);
  });
});