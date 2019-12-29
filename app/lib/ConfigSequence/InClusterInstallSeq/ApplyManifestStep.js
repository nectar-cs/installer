//@flow
import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class ApplyManifestStep extends ConfigStep {

  produceCommand(): Array<string> {
    const { yamlUrl } = this.config();
    return [`kubectl apply -f ${yamlUrl}`];
  }

  async performVerifications() {
    const { crName, crbName } = this.config();
    return {
      nsExists: (await this.verifyResPres("ns", "nectar")),
      saExists: (await this.verifyResPres("sa", "nectar")),
      rbExists: (await this.verifyResPres("clusterrole", crName)),
      crbExists: (await this.verifyResPres("clusterrolebinding", crbName)),
      depsExist: (await this.verifyResCount("deploy", 5)),
      svcsExist: (await this.verifyResCount("svc", 5)),
      pvcExists: (await this.verifyResCount("pvc", 1))
    };
  }

  defaults() { return defaults }
  key(){ return "applyManifest"; }
  store() { return constants }
}
