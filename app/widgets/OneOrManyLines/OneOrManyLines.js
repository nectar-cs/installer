import React from 'react'
import { Text } from 'nectar-cs-js-common';

export default function OneOrManyLines({text, el, ...props}: Props){
  const TextElement = el || Text.P2;
  return [text || ''].flat().map((line, i) => (
    <TextElement
      key={i}
      top={1}
      {...props}>
      {line}
    </TextElement>
  ));
}

type Props = {
  text: string,
  el: ?*,
}
