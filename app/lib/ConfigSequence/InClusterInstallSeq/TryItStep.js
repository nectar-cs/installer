import ConfigStep from '../base/ConfigStep';
import { defaults, constants } from './defaults';

export default class TryItStep extends ConfigStep {

  produceCommand(): Array<string> {
    const { commands } = this.config();
    return commands;
  }

  defaults() { return defaults }
  key(){ return "tryIt"; }
  store() { return constants }
}
