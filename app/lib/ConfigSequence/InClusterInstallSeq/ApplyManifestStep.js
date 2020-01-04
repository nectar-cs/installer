//@flow
import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class ApplyManifestStep extends ConfigStep {

  produceCommand(): Array<string> {
    const { yamlUrl } = this.config();
    return [
      this.kmd(`apply -f ${yamlUrl}`)
    ];
  }

  async performVerifications() {
    const { crName, crbName } = this.config();
    const { pvcCount, depCount, svcCount } = this.config();

    return {
      nsExists: (await this.verifyResPres("ns", "nectar")),
      saExists: (await this.verifyResPres("sa", "nectar")),
      rbExists: (await this.verifyResPres("clusterrole", crName)),
      crbExists: (await this.verifyResPres("clusterrolebinding", crbName)),
      depsExist: (await this.verifyResCount("deploy", depCount)),
      svcsExist: (await this.verifyResCount("svc", svcCount)),
      pvcExists: (await this.verifyResCount("pvc", pvcCount))
    };
  }

  defaults() { return defaults }
  key(){ return "applyManifest"; }
  store() { return constants }
}
