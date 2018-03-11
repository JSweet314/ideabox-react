import React from 'react';
import { shallow, mount } from 'enzyme';
import IdeaForm from '../containers/IdeaForm.js';

describe('IdeaForm', () => {
  let ideaForm, event1, event2, event3;
  
  beforeEach(() => {
    event1 = {
      target: {
        value: "Woo Hoo!"
      }
    };

    event2 = {
      target: {
        value: "Hello World!"
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
      titleInput: '',
      bodyInput: '',
      saveDisabled: true
    });
  });

  it('should be able to update the title and body in state', () => {
    expect(ideaForm.state('titleInput')).toEqual('');
    expect(ideaForm.state('bodyInput')).toEqual('');

    ideaForm.instance().updateTitleInput(event1);
    ideaForm.instance().updateBodyInput(event2);

    expect(ideaForm.state('titleInput')).toEqual('Woo Hoo!');
    expect(ideaForm.state('bodyInput')).toEqual('Hello World!');
  });

  it('should update title and body as the user types', () => {
    expect(ideaForm.state('titleInput')).toEqual('');
    expect(ideaForm.state('bodyInput')).toEqual('');

    const titleInput = ideaForm.find('.titleInput');
    const bodyInput = ideaForm.find('.bodyInput');

    titleInput.simulate('change', event1);
    bodyInput.simulate('change', event2);

    expect(ideaForm.state('titleInput')).toEqual('Woo Hoo!');
    expect(ideaForm.state('bodyInput')).toEqual('Hello World!');
  });

  it('should enable to save button when both the title and body input fields are completed', () => {
    expect(ideaForm.state('saveDisabled')).toEqual(true);
    
    ideaForm.instance().updateTitleInput(event1);

    expect(ideaForm.state('saveDisabled')).toEqual(true);

    ideaForm.instance().updateBodyInput(event2);

    expect(ideaForm.state('saveDisabled')).toEqual(false);

    event1.target.value = '';
    ideaForm.instance().updateTitleInput(event1);

    expect(ideaForm.state('saveDisabled')).toEqual(true);
  });

  it('should call its create idea method when the save button is clicked', () => {
    ideaForm = mount(<IdeaForm handleNewIdea={jest.fn()} />);
    ideaForm.instance().updateTitleInput(event1);
    ideaForm.instance().updateBodyInput(event2);
    ideaForm.instance().createIdea = jest.fn();

    const saveBtn = ideaForm.find('form button');

    saveBtn.simulate('click');

    expect(ideaForm.instance().createIdea).toHaveBeenCalledTimes(1);
  });

  it('should call the handleNewIdea method when the save button is clicked', () => {
    ideaForm = mount(<IdeaForm handleNewIdea={jest.fn()} />);
    ideaForm.instance().updateTitleInput(event1);
    ideaForm.instance().updateBodyInput(event2);
    const saveBtn = ideaForm.find('form button');

    saveBtn.simulate('click', event3);
    
    expect(ideaForm.props().handleNewIdea).toHaveBeenCalledTimes(1);
    expect(ideaForm.state()).toEqual({
      titleInput: '',
      bodyInput: '',
      saveDisabled: true
    });
  });
});
