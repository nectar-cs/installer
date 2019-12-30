//@flow
import React, {Fragment} from  'react'
import S from './WelcomeStyles'
import { Layout, Text, Button, ModestLink } from 'nectar-cs-js-common';
import Utils from '../../utils/Utils';
import {version} from './../../package'

export default class Welcome extends React.Component<>{

  render() {
    const image = Utils.image('nectar_mark_light.png');

    return(
      <Layout.ThemePage>
        <S.Content>
          <S.TitleBox>
            <S.TitleLogo src={image} alt={'Nectar'} />
            <S.TitleText>mosaic</S.TitleText>
          </S.TitleBox>
          <S.Options>
            <Text.P2 emotion='contrastFont' center>
              Installation & Configuration Wizard {version}
            </Text.P2>
          </S.Options>
          <Button.SpicyButton>
            <ModestLink to='/activities'>
              <Text.P2 emotion='contrastFont' center>Start</Text.P2>
            </ModestLink>
          </Button.SpicyButton>
        </S.Content>
      </Layout.ThemePage>
    );
  }
}

