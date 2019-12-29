//@flow

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Welcome from '../../../app/components/Navigation/Welcome';
import { Button } from 'nectar-cs-js-common';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const component = shallow(<Welcome/>);
  return {
    component,
    button: component.find(Button.SpicyButton)
  };
}

describe('Counter component', () => {
  it('should should display count', () => {
    const { button } = setup();
    console.log("The butt");
    console.log(button);
    expect(button).to.have
  });

  // it('should second button should call decrement', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(1).simulate('click');
  //   expect(actions.decrement.called).toBe(true);
  // });
});
