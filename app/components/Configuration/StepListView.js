//@flow
import React, {Fragment} from 'react'
import ConfigSequence from '../../lib/ConfigSequence/base/ConfigSequence';
import { EasyListItem, Layout, LeftHeader, TextOverLineSubtitle } from 'nectar-cs-js-common';

export default class StepListView extends React.Component<Props>{
  render(){
    return(
      <Fragment>
        { this.renderHeader() }
        { this.renderStepsList() }
      </Fragment>
    )
  }

  renderStepsList(){
    const { stepIndex } = this.props;
    const Steps = () => this.sequence().steps().map((step, i) => (
      <EasyListItem
        key={i}
        callback={null}
        title={step.name()}
        subtitle={step.summary()[0]}
        isSelected={stepIndex === i}
        iconName='play_circle_outline'
      />
    ));

    return(
      <Layout.Div top={3}>
        <TextOverLineSubtitle text='Laundry List'/>
        <Steps/>
      </Layout.Div>
    )
  }

  renderHeader(){
    return(
      <LeftHeader
        graphicType='icon'
        graphicName='list'
        title={`Sequence: ${this.sequence().name()}`}
        subtitle='Step by step installation wizard'
      />
    )
  }

  sequence(): ConfigSequence{
    return this.props.sequence;
  }

}

type Props = {
  sequence: ConfigSequence,
  stepIndex: number
}
