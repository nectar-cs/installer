//@flow
import React, {Fragment} from 'react'
import { Checklist, Layout, LeftHeader, Loader, ModalButton, Text, TextOverLineSubtitle } from '@nectar-cs/js-common';
import ConfigStep from '../../lib/ConfigSequence/base/ConfigStep';
import OptionsForm from './OptionsForm';
import OneOrManyLines from '../../widgets/OneOrManyLines/OneOrManyLines';
import { Redirect } from 'react-router';

export default class StepDetail extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      isStepReady: false,
      isVerifying: false,
      didExecSucceed: false,
      didSucceed: false,
      commands: [],
      output: '',
      verifications: {},
      formBundle: {},
      isRedirecting: false
    };
    this.stepForLastCmd = null;
    this.runStep = this.runStep.bind(this);
    this.onFormValueChanged = this.onFormValueChanged.bind(this);
    this.initiateRedirect = this.initiateRedirect.bind(this);
  }

  async componentDidMount(): void {
    this.prepareStep()
  }

  // noinspection JSCheckFunctionSignatures
  async componentDidUpdate(prevProps): void {
    const oldStepName = prevProps.step.name();
    const newStepName = this.step().name();
    if(oldStepName !== newStepName){
      console.log(`New Step? ${oldStepName} --> ${newStepName}`);
      this.prepareStep()
    }
  }

  render(){
    return(
      <Fragment>
        { this.renderRedirect() }
        { this.renderHeader() }
        { this.renderTopLoader() }
        { this.renderExplanation() }
        { this.renderOptions() }
        { this.renderTerminal() }
        { this.renderOutcome() }
        { this.renderButton() }
      </Fragment>
    )
  }

  renderHeader(){
    const { stepIndex } = this.props;
    return(
      <LeftHeader
        graphicType='icon'
        graphicName='play_circle_outline'
        title={`Step ${stepIndex + 1}: ${this.step().name()}`}
        subtitle='Preview and Execution'
      />
    )
  }

  renderRedirect(){
    const { isRedirecting } = this.state;
    if(!isRedirecting) return null;
    return <Redirect to={'/activities'}/>
  }

  renderTopLoader(){
    if(this.isRunning() || this.isPreparing())
      return <Loader.TopRightSpinner/>;
    else return null;
  }

  renderOptions() {
    const options = this.step().produceOptions();
    const { formBundle } = this.state;
    if (options.length < 1) return null;

    return(
      <OptionsForm
        options={options}
        notifyFormValueChanged={this.onFormValueChanged}
        {...formBundle}
      />
    )
  }

  renderExplanation(){
    return(
      <Layout.Div top={3}>
        <TextOverLineSubtitle text='Plan / Options / Execution'/>
        <OneOrManyLines text={this.step().summary()}/>
      </Layout.Div>
    )
  }

  renderTerminal(){
    const { commands } = this.state;
    return(
      <Layout.BigCodeViewer maxHeight='200px'>
        <OneOrManyLines text={commands} el={Text.Code}/>
        { this.formattedOutput() }
      </Layout.BigCodeViewer>
    )
  }

  async runStep(){
    this.stepForLastCmd = this.step().name();
    const { runningCallback, ranCallback } = this.props;
    runningCallback();
    const stepResult = await this.step().run();

    this.setState(s => ({...s,
      output: stepResult.output,
      didExecSucceed: stepResult.success
    }));

    this.setState(s => ({...s, isVerifying: true}));
    const verifications = await this.step().verify();
    this.setState(s => ({...s,
      isVerifying: false,
      didSucceed: this.step().didSucceed(),
      verifications
    }));

    ranCallback();
  }

  renderOutcome(){
    const { output } = this.state;
    if(!(this.wasRun() || output)) return null;
    return this.renderOutcomeVer();
  }

  renderOutcomeVer(){
    const { verifications } = this.state;
    const verConstants = this.step().verificationConstants();
    const doneStatus = ver => verifications[ver.key] ? 'done' : 'failed';
    const decideStatus = s => this.isVerifying() ? 'working' : doneStatus(s);
    const mapper = ver => ({ ...ver, status: decideStatus(ver) });
    const checkItems = verConstants.map(mapper);

    return(
      <Layout.Div top={2}>
        <TextOverLineSubtitle text='Verification'/>
        <Checklist items={checkItems}/>
      </Layout.Div>
    )
  }

  formattedOutput(): string {
    const isFromCrtStep = this.stepForLastCmd === this.step().name();
    if(this.stepOutput() && isFromCrtStep) {
      return(
        <Fragment>
          <Text.Code>---</Text.Code>
          <OneOrManyLines el={Text.Code} text={this.stepOutput()}/>
        </Fragment>
      )
    } else return null;
  }

  buttonText(){
    const { isLast } = this.props;
    if(this.wasRun()){
      if(this.didSucceed()) {
        return isLast ? "Finish" : "Next";
      } else return "Try Again";
    } else return this.isRunning() ? "Running" : "Run";
  }

  buttonAction(){
    const { nextCallback, isLast } = this.props;
    if(this.wasRun()){
      if(this.didSucceed()) {
        return isLast ? this.initiateRedirect : nextCallback;
      } else return this.runStep;
    } else return this.runStep;
  }

  renderButton(){
    return(
      <ModalButton
        isEnabled={!this.isRunning()}
        title={this.buttonText()}
        callback={this.buttonAction()}
      />
    )
  }

  async prepareStep(){
    this.setState(s => ({...s, isStepReady: false}));
    await this.step().prepare();
    this.setState(s => ({...s,
      isStepReady: true,
      isVerifying: false,
      commands: this.step().produceCommand(),
      output: '',
      verifications: {},
      didSucceed: false,
      didExecSucceed: false,
      formBundle: this.step().bundle
    }));
  }

  onFormValueChanged(key, value){
    this.step().update({[key]: value});
    this.setState(s => ({
      ...s,
      formBundle: {...s.formBundle, [key]: value},
      commands: this.step().produceCommand(),
    }));
  }

  initiateRedirect(){
    this.setState(s => ({...s, isRedirecting: true}));
  }

  isVerifying(): boolean {
    const { isVerifying } = this.state;
    return isVerifying;
  }

  isPreparing(): boolean {
    const { isStepReady } = this.state;
    return !isStepReady;
  }

  isRunning(): boolean {
    const { phase } = this.props;
    return phase === 'running';
  }

  wasRun(): boolean {
    const { phase } = this.props;
    return phase === 'ran';
  }

  didSucceed(){
    const { didSucceed } = this.state;
    return didSucceed;
  }

  step(): ConfigStep {
    return this.props.step;
  }

  stepOutput(){
    if(this.wasRun() || this.isRunning()){
      const { output } = this.state;
      return output;
    }
  }
}

type Props = {
  step: ConfigStep,
  runningCallback: void => void,
  nextCallback: void => void,
  ranCallback: void => void,
  phase: 'idle' | 'running' | 'ran',
}
