//@flow
import React, {Fragment} from 'react'
import defaults from './defaults';
import { Layout, LeftHeader, ModalButton, Tables, TextOverLineSubtitle } from '@nectar-cs/js-common';

export default class FlavorPreview extends React.Component<Props>{

  render(){
    return(
      <Fragment>
        { this.renderHeader() }
        { this.renderExplanation() }
        { this.renderTable() }
        { this.renderButton() }
      </Fragment>
    )
  }

  renderHeader(){
    const { title, icon } = this.flavorBundle();

    return(
      <LeftHeader
        graphicName={icon}
        graphicType='icon'
        title={`Flavor Preview: ${title}`}
        subtitle='What a do'
      />
    )
  }

  renderExplanation(){
    const { components } = this.flavorBundle();
    const text = defaults.explanations.comps;

    const Each = _ => Object.keys(components).map(compKey => {
      const bundle = components[compKey];
      return(
        <Layout.Div top={2} key={compKey}>
          <p>
            <b>{text[compKey].title(bundle)}. </b>
            {text[compKey].detail(bundle)}
          </p>
        </Layout.Div>
      )
    });

    return(
      <Layout.Div top={2}>
        <TextOverLineSubtitle text='Components Info'/>
        <Each/>
      </Layout.Div>
    )
  }

  renderTable(){
    const { components } = this.flavorBundle();

    const CompRows = _ => Object.keys(components).map(key => (
      <CompRow
        key={key}
        name={defaults.explanations.comps[key].title(components[key])}
        comp={components[key]}
      />
    ));

    return(
      <Layout.Div top={5}>
        <TextOverLineSubtitle text='Components Summary'/>
        <Tables.Table>
          <tbody>
          <CompHeader/>
          <CompRows/>
          </tbody>
        </Tables.Table>
      </Layout.Div>
    )
  }

  renderButton(){
    const { isAvailable, callback } = this.props;
    const text = isAvailable ? "Begin" : "Coming Soon";
    return(
      <ModalButton
        callback={callback}
        title={text}
        isEnabled={isAvailable}
      />
    )
  }

  flavorBundle(){
    const { flavorId } = this.props;
    return defaults.flavors.find(flavor => flavor.id === flavorId);
  }
}

function CompHeader(){
  return(
    <tr>
      <th><p>Component</p></th>
      <th><p>Location</p></th>
      <th><p>Stores Data</p></th>
    </tr>
  )
}

function CompRow(props){
  const { comp, name, storage } = props;

  return(
    <tr>
      <td><p>{name}</p></td>
      <td><p>{comp.location}</p></td>
      <td><p>{comp.storage}</p></td>
    </tr>
  )
}

type Props = {
  flavorId: string,
  callback: void => void
}
