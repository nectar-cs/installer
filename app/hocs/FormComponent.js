//@flow
import React from "react";
import {In, TagPool} from "nectar-cs-js-common";

export default class FormComponent {
  static compose(InnerComponent)  {
    return class extends React.Component<Props>{

      valueDefaults: {string: any};

      constructor(props){
        super(props);
        this.makeSelect = this.makeSelect.bind(this);
        this.makeInput = this.makeInput.bind(this);
        this.makeSelectItem = this.makeSelectItem.bind(this);
        this.makeInputItem = this.makeInputItem.bind(this);
        this.makeLine = this.makeLine.bind(this);
        this.makeTagPool = this.makeTagPool.bind(this);

        this.valueDefaults = {};
      }

      makeLine(title, builders){
        return(
          <In.InputLine>
            <In.LineLabel size='large'>{title}</In.LineLabel>
            { builders.map(b => b()) }
          </In.InputLine>
        )
      }

      makeSelectItem(field, choices){
        const callback = (e) => { this.parentCallback(field, e.target.value); };
        return(
          <In.LineInput
            key={field}
            as='select'
            value={this.getValue(field)}
            onChange={(e) => callback(e)}>
            { choices }
          </In.LineInput>
        )
      }

      makeInputItem(field, placeholder){
        const callback = (e) => { this.parentCallback(field, e.target.value); };
        return(
          <In.LineInput
            key={field}
            as='input'
            value={this.getValue(field) || ''}
            onChange={(e) => callback(e)}
            placeholder={placeholder}
          />
        )
      }

      makeSelect(title, field, choices){
        return(
          <In.InputLine key={field}>
            <In.LineLabel size='large'>{title}</In.LineLabel>
            { this.makeSelectItem(field, choices) }
          </In.InputLine>
        )
      }

      makeTagPoolItem(field, choices){
        const callback = optionKeys => this.parentCallback(field, optionKeys);
        return(
          <TagPool
            optionsHash={choices}
            defaultsArray={this.getDefault(field)}
            callback={callback}
          />
        )
      }

      makeTagPool(title, field, choices){
        return(
          <In.InputLine>
            <In.LineLabel size='large'>{title}</In.LineLabel>
            { this.makeTagPoolItem(field, choices) }
          </In.InputLine>
        )
      }

      makeInput(title, field, placeholder){
        return(
          <In.InputLine key={field}>
            <In.LineLabel size='large'>{title}</In.LineLabel>
            { this.makeInputItem(field, placeholder) }
          </In.InputLine>
        )
      }

      render(){
        return(
          <InnerComponent
            makeSelect={this.makeSelect}
            makeInput={this.makeInput}
            makeSelectItem={this.makeSelectItem}
            makeInputItem={this.makeInputItem}
            makeTagPool={this.makeTagPool}
            makeLine={this.makeLine}
            {...this.props}
          />
        )
      }

      getValue(field){
        if(this.props.retriever){
          return this.props.retriever(this.props, field);
        } else return this.props[field];
      }

      getDefault(field){
        if(this.valueDefaults[field] == null)
          this.valueDefaults[field] = this.getValue(field);
        return this.valueDefaults[field];
      }

      parentCallback(field, value) {
        this.props.notifyFormValueChanged(field, value);
      }
    }
  }
}

type Props = {
  notifyFormValueChanged: (string, string) => void,
  retriever: string => any
}
