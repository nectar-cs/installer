//@flow
import React from 'react'
import { Layout, LeftHeader, ModalButton, Text } from 'nectar-cs-js-common';
import S from './ActivityChoicesStyles'
import defaults from './defaults';
import { Redirect } from 'react-router';

export default class ActivityChoices extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      selectedId: defaults.sections[0].id
    }
  }

  render(){
    return(
      <Layout.FullScreen>
        { this.renderRedirect() }
        { this.renderHeader() }
        { this.renderGrid() }
        { this.renderButton() }
      </Layout.FullScreen>
    )
  }

  renderRedirect(){
    const { isSubmitted } = this.state;
    if(!isSubmitted) return null;
    const section = this.selectedSection();
    const target = section.redirect || `/${section.id}`;
    return <Redirect to={target}/>
  }

  renderHeader(){
    const { title, subtitle } = defaults.header;
    const { isSubmitted } = this.state;
    if(isSubmitted) return null;
    return(
      <LeftHeader
        graphicName='explore'
        graphicType='icon'
        title={title}
        subtitle={subtitle}
      />
    )
  }

  renderGrid(){
    const { isSubmitted } = this.state;
    if(isSubmitted) return null;

    const bundles = defaults.sections;
    const Sections = () => bundles.map(bundle => (this.renderChoice(bundle)));
    return(
      <S.CenterGrid>
        <Sections/>
      </S.CenterGrid>
    )
  }

  renderChoice(bundle){
    const { selectedId, isSubmitted } = this.state;
    const { id, title, subtitle } = bundle;
    if(isSubmitted) return null;
    const callback = () => this.setState(s => ({...s, selectedId: id}));
    return(
      <S.ChoiceItem
        key={id}
        selected={id === selectedId}
        onClick={callback}>
        <Text.P2 top={1.1} weight='bold'>{title}</Text.P2>
        <Text.P2 center>{subtitle}</Text.P2>
      </S.ChoiceItem>
    )
  }

  renderButton(){
    const { isSubmitted } = this.state;
    if(isSubmitted) return null;
    const bundle = this.selectedSection();
    const callback = () =>  this.setState(s => ({...s, isSubmitted: true}));
    const text = bundle.ready ? "Begin" : "Coming Soon";

    return(
      <ModalButton
        callback={callback}
        title={text}
        isEnabled={!!bundle.ready}
      />
    )
  }

  selectedSection(){
    const { selectedId } = this.state;
    return defaults.sections.find(s => s.id === selectedId);
  }
}
