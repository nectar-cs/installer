//@flow

import ConfigStep from './ConfigStep';

export default class ConfigSequence {

  constructor(constants) {
    const { name } = constants;
    this._name = name;
  }

  steps(): Array<ConfigStep> {

  }

  name(): string {
    return this._name;
  }
}
