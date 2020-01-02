//@flow
import React from  'react'
import S from './WelcomeStyles'
import { Layout, Text, Button, ModestLink, Loader } from 'nectar-cs-js-common';
import Utils from '../../utils/Utils';
import {version} from './../../package'
import { Redirect } from 'react-router';

export default class Welcome extends React.Component<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      phase: 'checking'
    };
    this.initiateRedirect = this.initiateRedirect.bind(this);
  }

  async componentDidMount(): void {
    const { success, output } = await Utils.shellExec("kubectl");
    console.log("RES");
    console.log(success);
    console.log(output);
    console.log(!!success && !!output);
    const phase = !!success && !!output ? 'passed' : 'failed';
    this.setState(s => ({...s, phase}));
  }

  render() {
    return(
      <Layout.ThemePage>
        <S.Content>
          { this.renderRedirect() }
          { this.renderTitleBox() }
          { this.renderVersionNumber() }
          { this.renderLoader() }
          { this.renderErrorMessage() }
          { this.renderButton() }
        </S.Content>
      </Layout.ThemePage>
    );
  }

  renderRedirect(){
    const { phase } = this.state;
    if(phase !== 'redirecting') return null;
    return <Redirect to='/activities'/>;
  }

  renderTitleBox(){
    const image = Utils.image('nectar_mark_light.png');
    return(
      <S.TitleBox>
        <S.TitleLogo src={image} alt={'Nectar'} />
        <S.TitleText>mosaic</S.TitleText>
      </S.TitleBox>
    );
  }

  renderVersionNumber(){
    const { phase } = this.state;
    if(phase === 'checking') return null;

    return(
      <S.Options>
        <Text.P2 emotion='contrastFont' center>
          Installation & Configuration Wizard {version}
        </Text.P2>
      </S.Options>
    )
  }

  renderLoader(){
    const { phase } = this.state;
    if(phase !== 'checking') return null;
    return <Loader.CenteredSpinner emotion='contrastColor'/>;
  }

  renderErrorMessage(){
    const { phase } = this.state;
    if(phase !== 'failed') return null;

    return(
      <Text.P2 bottom={-2} emotion='warn' center>
        Failed to invoke kubectl
      </Text.P2>
    )
  }

  renderButton(){
    const { phase } = this.state;
    if(phase === 'checking') return null;

    return(
      <Button.SpicyButton
        onClick={this.initiateRedirect}
        disabled={phase !== 'passed'}>
        <Text.P2 emotion='contrastFont' center>Start</Text.P2>
      </Button.SpicyButton>
    )
  }

  initiateRedirect(){
    this.setState(s => ({...s, phase: 'redirecting'}));
  }
}

type Props = {};

type State = {
  phase: 'checking' | 'passed' | 'failed' | 'redirecting'
}
