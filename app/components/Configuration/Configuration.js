//@flow
import React, {Fragment} from 'react'
import { CenterAnnouncement, CenterCard, Layout } from '@nectar-cs/js-common';
import StepListView from './StepListView';
import StepDetail from './StepDetail';
import Helper from './Helper';

export default class Configuration extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    const sequenceKey = props.match.params['seq'];
    const SequenceClass = Helper.sequenceClass(sequenceKey);
    this.sequence = new SequenceClass();

    this.state = {
      stepIndex: 0,
      stepPhase: 'idle'
    };

    this.onStepRunning = this.onStepRunning.bind(this);
    this.onStepRan = this.onStepRan.bind(this);
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
    const { stepPhase, stepIndex } = this.state;
    const isLast = stepIndex === this.sequence.steps().length - 1;

    return(
      <Layout.RightPanel>
        <StepDetail
          step={this.currentStep()}
          stepIndex={stepIndex}
          isLast={isLast}
          phase={stepPhase}
          runningCallback={this.onStepRunning}
          ranCallback={this.onStepRan}
          nextCallback={this.onStepNext}
        />
      </Layout.RightPanel>
    )
  }

  onStepRunning(){
    this.setState(s => ({...s, stepPhase: 'running'}));
  }

  onStepRan(){
    this.setState(s => ({...s, stepPhase: 'ran'}));
  }

  onStepNext(){
    const stepIndex = this.state.stepIndex + 1;
    this.setState(s => ({...s, stepIndex, stepPhase: 'idle'}));
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
  stepPhase: 'idle' | 'running' | 'ran'
}
