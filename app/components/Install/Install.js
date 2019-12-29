//@flow
import React, {Fragment} from 'react'
import { Layout } from 'nectar-cs-js-common';
import FlavorsList from './FlavorsList';
import FlavorPreview from './FlavorPreview';
import defaults from './defaults';
import { Redirect } from 'react-router';

export default class Install extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedFlavor: defaults.flavors[0].id,
      isRedirecting: false
    };
    this.onFlavorSelected = this.onFlavorSelected.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render(){
    return(
      <Fragment>
        { this.renderLeftSide() }
        { this.renderRightSide() }
        { this.renderRedirect() }
      </Fragment>
    )
  }

  renderLeftSide(){
    const { selectedFlavor, isRedirecting } = this.state;
    if(isRedirecting) return null;
    return(
      <Layout.LeftPanel>
        <FlavorsList
          flavorId={selectedFlavor}
          callback={this.onFlavorSelected}
        />
      </Layout.LeftPanel>
    )
  }

  renderRightSide(){
    const { selectedFlavor, isRedirecting } = this.state;
    const bundle = defaults.flavors.find(b => b.id === selectedFlavor);
    if(isRedirecting) return null;
    return(
      <Layout.RightPanel>
        <FlavorPreview
          flavorId={selectedFlavor}
          callback={this.onSubmit}
          isAvailable={!!bundle.ready}
        />
      </Layout.RightPanel>
    )
  }

  renderRedirect(){
    const { selectedFlavor, isRedirecting } = this.state;
    if(!isRedirecting) return null;
    return(
      <Redirect
        to={`/configure/${selectedFlavor}`}
      />
    )
  }

  onFlavorSelected(selectedFlavor){
    this.setState(s => ({...s, selectedFlavor}));
  }

  onSubmit(){
    this.setState(s => ({...s, isRedirecting: true}));
  }
}
