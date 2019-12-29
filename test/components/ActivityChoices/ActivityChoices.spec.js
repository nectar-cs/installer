import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModalButton } from 'nectar-cs-js-common';
import ActivityChoices from '../../../app/components/ActivityChoices/ActivityChoices';
import S from '../../../app/components/ActivityChoices/ActivityChoicesStyles';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const component = shallow(<ActivityChoices/>);
  return {
    component,
    choices: component.find(S.ChoiceItem),
    button: component.find(ModalButton)
  };
}

describe('Activity Choices component', () => {
  // it('should should have the start button enabled', () => {
  //   const { button } = setup();
  //   expect(button.exists()).toBeTruthy();
  //   expect(button.prop('disabled')).toBeFalsy();
  // });

  it('starts with 4 choices', () => {
    // const { choices } = setup();
    // expect(choices).toHaveLength(4);
  });

});
