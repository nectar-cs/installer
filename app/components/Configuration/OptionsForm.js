//@flow
import React from 'react'
import ConfigOption from '../../lib/ConfigSequence/base/ConfigOption';
import FormComponent from '../../hocs/FormComponent';

class OptionsFormClass extends React.Component<Props> {

  render() {
    const { options } = this.props;
    return options.map(o => this.renderOption(o));
  }

  renderOption(option: ConfigOption){
    switch (option.kind()) {
      case(ConfigOption.FREE): return this.renderFree(option);
      case(ConfigOption.LIST): return this.renderSelect(option);
      default: return null;
    }
  }

  renderFree(option: ConfigOption){
    return this.props.makeInput(
      option.title(),
      option.key(),
      option.key()
    )
  }

  renderSelect(option: ConfigOption){
    return this.props.makeSelect(
      option.title(),
      option.key(),
      option.possibilities()
    )
  }
}

type Props = {
  options: Array<ConfigOption>
}

const OptionsForm = FormComponent.compose(
  OptionsFormClass
);

export default OptionsForm;
