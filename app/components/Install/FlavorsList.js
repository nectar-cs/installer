//@flow
import React, {Fragment} from 'react'
import defaults from './defaults';
import { EasyListItem, LeftHeader, Text } from 'nectar-cs-js-common';

export default class FlavorsList extends React.Component{

  render(){
    return(
      <Fragment>
        { this.renderHeader() }
        { this.renderExplanation() }
        { this.renderListItems() }
      </Fragment>
    )
  }

  renderHeader(){
    const { title, subtitle } = defaults.header;
    return(
      <LeftHeader
        graphicName='fastfood'
        graphicType='icon'
        title={title}
        subtitle={subtitle}
      />
    )
  }

  renderExplanation(){
    return <Text.P2 top={2}>{defaults.explanations.main}</Text.P2>
  }

  renderListItems(){
    const { flavorId, callback } = this.props;
    return defaults.flavors.map(meta => {
      return(
        <EasyListItem
          key={meta.id}
          callback={() => callback(meta.id)}
          title={meta.title}
          subtitle={meta.subtitle}
          isSelected={flavorId === meta.id}
          iconName={meta.icon}
        />
      )
    });
  }
}
