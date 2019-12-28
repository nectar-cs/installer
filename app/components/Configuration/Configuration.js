//@flow
import React, {Fragment} from 'react'
import { Layout } from '@nectar-cs/js-common';
import StepListView from './StepListView';
import StepDetail from './StepDetail';
import Helper from './Helper';

export default class Configuration extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = { stepIndex: 0 };
    const sequenceKey = props.match.params['seq'];
    const SequenceClass = Helper.sequenceClass(sequenceKey);
    this.sequence = new SequenceClass();
    this.onStepNext = this.onStepNext.bind(this);
  }

  render(){
    return(
      <Fragment>
        { this.renderLeftSide() }
        { this.renderRightSide() }
      </Fragment>
    )
  }

  renderLeftSide(){
    return(
      <Layout.LeftPanel>
        <StepListView
          sequence={this.sequence}
          stepIndex={this.state.stepIndex}
        />
      </Layout.LeftPanel>
    )
  }

  renderRightSide(){
    const { stepIndex } = this.state;
    const isLast = stepIndex === this.sequence.steps().length - 1;

    return(
      <Layout.RightPanel>
        <StepDetail
          stepIndex={stepIndex}
          step={this.currentStep()}
          isLast={isLast}
          nextCallback={this.onStepNext}
        />
      </Layout.RightPanel>
    )
  }

  onStepNext(){
    const stepIndex = this.state.stepIndex + 1;
    this.setState(s => ({...s, stepIndex}));
  }

  currentStep(){
    const { stepIndex } = this.state;
    return this.sequence.steps()[stepIndex];
  }
}

type Props = {
  sequenceClass: string
};

type State = {
  stepIndex: number,
}
