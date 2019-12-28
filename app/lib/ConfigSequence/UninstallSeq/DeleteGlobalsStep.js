//@flow
import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class DeleteGlobalsStep extends ConfigStep {

  produceCommand(): Array<string> {
    const { cr, crb } =  this.config();
    return [
      this.kmd(`delete clusterrole ${cr}`),
      this.kmd(`delete clusterrolebinding ${crb}`),
    ]
  }

  async performVerifications() {
    const { cr, crb } =  this.config();
    return {
      crGone: (await this.verifyResGone("clusterrole", cr, null)),
      crbGone: (await this.verifyResGone("clusterrolebinding", crb, null)),
    };
  }

  defaults() { return defaults }
  key(){ return "deleteGlobals"; }
  store() { return constants }
}
