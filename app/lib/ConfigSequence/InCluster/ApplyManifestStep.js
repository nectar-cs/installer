//@flow
import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class ApplyManifestStep extends ConfigStep {

  produceCommand(): Array<string> {
    let root = require('electron').remote.app.getAppPath();
    root = root.replace("installer/app", "installer");
    return [
      `kubectl apply -f ${root}/manifest.yaml`
    ]
  }

  async verifyNsExists(){
    const ns = await this.jExecute(this.jKmd("get ns"));
    return ns.find(r => r.metadata.name === "nectar");
  }

  async saExists(){
    const sa = await this.jExecute(this.jKmd("get sa", "nectar"));
    return sa.find(r => r.metadata.name === "nectar");
  }

  async rbExists(){
    const cmd = this.jKmd("get clusterrole", "nectar");
    const rb = await this.jExecute(cmd);
    return rb.find(r => r.metadata.name === this.config().rbName);
  }

  async crbExists(){
    const cmd = this.jKmd("get clusterrolebinding", "nectar");
    const crb = await this.jExecute(cmd);
    return crb.find(r => r.metadata.name === this.config().crbName);
  }

  async depsExist(){
    const deps = await this.jExecute(this.jKmd("get deploy", "nectar"));
    return deps.length === 5;
  }

  async svcsExist(){
    const svcs = await this.jExecute(this.jKmd("get svc", "nectar"));
    return svcs.length === 5;
  }

  async performVerifications() {
    return {
      nsExists: (await this.verifyNsExists()),
      saExists: (await this.saExists()),
      rbExists: (await this.rbExists()),
      crbExists: (await this.crbExists()),
      depsExist: (await this.depsExist()),
      svcsExist: (await this.svcsExist())
    };
  }

  defaults() { return defaults }
  key(){ return "applyManifest"; }
  store() { return constants }
}
