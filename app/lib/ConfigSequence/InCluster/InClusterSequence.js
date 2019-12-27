import ConfigSequence from '../base/ConfigSequence';
import ConfigStep from '../base/ConfigStep';
import ApplyManifestStep from './ApplyManifestStep';
import PgSecretsStep from './PgSecretsStep';
import BkSecretsStep from './BkSecretsStep';

export default class InClusterSequence extends ConfigSequence {

  constructor() {
    super({
      name: "MOSAIC Web In Cluster",
    })
  }

  steps(): Array<ConfigStep> {
    return [
      // new ApplyManifestStep(),
      // new PgSecretsStep(),
      new BkSecretsStep()
    ]
  }
}
