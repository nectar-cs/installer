import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from '../../../app/components/Navigation/Welcome';
import { Button, Layout } from 'nectar-cs-js-common';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const component = shallow(<Welcome/>);
  return {
    component,
    button: component.find(Button.SpicyButton)
  };
}

describe('Welcome component', () => {
  it('should should have the start button enabled', () => {
    const { button } = setup();
    expect(button.exists()).toBeTruthy();
    expect(button.prop('disabled')).toBeFalsy();
  });
});
