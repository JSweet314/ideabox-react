import React from 'react';
import { shallow, mount } from 'enzyme';
import IdeaForm from '../containers/IdeaForm.js';

describe('IdeaForm', () => {
  let ideaForm, event1, event2, event3;
  
  beforeEach(() => {
    event1 = {
      target: {
        value: "Woo Hoo!",
        name: 'title'
      }
    };

    event2 = {
      target: {
        value: "Hello World!",
        name: 'body'
      }
    };

    event3 = {
      preventDefault: jest.fn()
    };

    ideaForm = shallow(<IdeaForm handleNewIdea={jest.fn()} />);
  });
  
  it('should render a form to obtain user input', () => {
    expect(ideaForm).toMatchSnapshot();
  });
  
  it('should store the values of the title input and body input and whether the save button is disabled in its state', () => {
    expect(ideaForm.state()).toEqual({
      title: '',
      titleChars: 120,
      body: '',
      bodyChars: 120,
      isDisabled: true
    });
  });

  it('should be able to update the title and body in state', () => {
    expect(ideaForm.state('title')).toEqual('');
    expect(ideaForm.state('body')).toEqual('');

    ideaForm.instance().updateInput(event1);
    ideaForm.instance().updateInput(event2);

    expect(ideaForm.state('title')).toEqual('Woo Hoo!');
    expect(ideaForm.state('body')).toEqual('Hello World!');
  });

  it('should update title and body as the user types', () => {
    expect(ideaForm.state('title')).toEqual('');
    expect(ideaForm.state('body')).toEqual('');

    const titleInput = ideaForm.find('.titleInput');
    const bodyInput = ideaForm.find('.bodyInput');

    titleInput.simulate('change', event1);
    bodyInput.simulate('change', event2);

    expect(ideaForm.state('title')).toEqual('Woo Hoo!');
    expect(ideaForm.state('body')).toEqual('Hello World!');
  });

  it('should keep track of the remaining characters for title and body', () => {
    expect(ideaForm.state('titleChars')).toEqual(120);
    expect(ideaForm.state('bodyChars')).toEqual(120);

    ideaForm.instance().updateInput(event1);
    ideaForm.instance().updateInput(event2);

    expect(ideaForm.state('titleChars')).toEqual(112);
    expect(ideaForm.state('bodyChars')).toEqual(108);
  });
});
