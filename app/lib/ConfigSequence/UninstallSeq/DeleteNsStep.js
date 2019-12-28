//@flow
import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class DeleteNsStep extends ConfigStep {

  produceCommand(): Array<string> {
    return [
      `kubectl delete ns/nectar`
    ]
  }

  async performVerifications() {
    return {
      nsGone: (await this.verifyResCount("deploy", 0)),
      depsGone: (await this.verifyResCount("svc", 0)),
      svcsGone: (await this.verifyResCount("pvc", 0)),
      saGone: (await this.verifyResCount("sa", 0)),
    };
  }

  defaults() { return defaults }
  key(){ return "deleteNs"; }
  store() { return constants }
}
