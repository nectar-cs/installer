import ConfigStep from '../base/ConfigStep';
import ConfigOption from '../base/ConfigOption';
import { constants, defaults } from './defaults';
import Utils from '../../../utils/Utils';

export default class SetContextStep extends ConfigStep{

  async generateInitialBundle(): {string: string}{
    const kConfig = await this.jExecute(this.jKmd("config view"));
    if(kConfig && kConfig.contexts){

      const available = kConfig.contexts.map(c => c.name);
      let current = kConfig['current-context'] || available[0];
      this.kConfig = kConfig;
      return {
        [this.keyContext()]: current
      }
    } else {
      return { [this.keyContext()]: '' };
    }
  }

  produceCommand(): Array<string> {
    const context = this.bundle[this.keyContext()];
    return [
      this.kmd(`config use-context ${context}`)
    ];
  }

  validate(): Array<string> {
    const errors = [];
    super.validatePresence(errors, this.keyContext());
    return errors;
  }

  async performVerifications() {
    const newConfig = await this.jExecute(this.jKmd("config view"));
    const expected = this.bundle[this.keyContext()];
    const actual = newConfig['current-context'];

    return {
      contextChanged: actual === expected
    }
  }

  produceOptions(): Array<ConfigOption> {
    const ctxHash = this.kConfig.contexts.reduce((w, c) => {
      const { user, cluster } = c['context'];
      const text = `${c.name}: [user: ${user}), cluster: ${cluster}]`;
      return {...w, [c.name]: text};
    }, {});
    const ctxOptions = Utils.hashOptions(ctxHash);
    return [
      ConfigOption.list(this.keyContext(), ctxOptions)
    ];
  }

  keyContext(){
    return this.config().keyContext;
  }

  defaults() { return defaults; }
  key() { return "setContext"; }
  store() { return constants }
}
