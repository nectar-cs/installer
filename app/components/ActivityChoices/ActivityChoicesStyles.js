import React from 'react'
import styled from 'styled-components';

function selectedWidth(p){
  return p.selected ? "3px" : "1.5px";
}

function selectedColor(p){
  const {colors: c} = p.theme;
  return p.selected ? c.primaryColor : c.contentBackgroundColor;
}

const CenterGrid = styled.div`
  width: 800px;
  height: 200px;
  margin: 200px auto 0 auto;
  display: flex;
`;

const Separator = styled.div`
  background: ${p => p.theme.colors.primaryColor};
  height: 1px;
  width: 90%;
  margin: 12px auto 12px auto;
`;

const ChoiceItem = styled((props) => (
  <div {...props}>
    { props.children[0] }
    <Separator/>
    { props.children[1] }
  </div>
))`
  width: 200px;
  height: 140px;
  border-color: ${p => selectedColor(p)};
  border-width: 3px;
  border-style: solid;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  cursor: ${p => p.selected ? 'default' : 'pointer'};
  &:not(:first-child){
    margin-left: 20px;
  }
`;


const S = {
  CenterGrid,
  ChoiceItem
};

export default S;
