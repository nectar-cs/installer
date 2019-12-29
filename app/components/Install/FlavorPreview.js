//@flow
import React, {Fragment} from 'react'
import defaults from './defaults';
import { Text, Layout, LeftHeader, ModalButton, Tables, TextOverLineSubtitle } from 'nectar-cs-js-common';

export default class FlavorPreview extends React.Component<Props>{

  render(){
    return(
      <Fragment>
        { this.renderHeader() }
        { this.renderOverview() }
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
        subtitle='This is how things will look with this flavor.'
      />
    )
  }

  renderOverview(){
    const { summary } = this.flavorBundle();
    return(
      <Layout.Div>
        <TextOverLineSubtitle text='Overview'/>
        <Text.P2>{summary}</Text.P2>
      </Layout.Div>
    )
  }

  renderExplanation(){
    const { components } = this.flavorBundle();
    const text = defaults.explanations.comps;

    const Each = _ => Object.keys(components).map(compKey => {
      const bundle = components[compKey];
      return(
        <Layout.Div top={2} key={compKey}>
          <Text.P2>
            <b>{text[compKey].title(bundle)}. </b>
            {text[compKey].detail(bundle)}
          </Text.P2>
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
      <th><p>Deployments In Your Cluster</p></th>
      <th><p>Location</p></th>
      <th><p>Stores Data</p></th>
    </tr>
  )
}

function CompRow(props){
  const { comp, name } = props;

  return(
    <tr>
      <td><Text.P2>{name}</Text.P2></td>
      <td><Text.P2>{comp.deployment}</Text.P2></td>
      <td><Text.P2>{comp.location}</Text.P2></td>
      <td><Text.P2>{comp.storage}</Text.P2></td>
    </tr>
  )
}

type Props = {
  flavorId: string,
  callback: void => void
}
