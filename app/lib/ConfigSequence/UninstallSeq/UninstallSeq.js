import ConfigSequence from '../base/ConfigSequence';
import ConfigStep from '../base/ConfigStep';
import SetContextStep from '../Common/SetContextStep';
import DeleteNsStep from './DeleteNsStep';
import DeleteGlobalsStep from './DeleteGlobalsStep';

export default class UninstallSeq extends ConfigSequence {

  constructor() {
    super({
      name: "Uninstall MOSAIC",
    })
  }

  steps(): Array<ConfigStep> {
    return [
      new SetContextStep(),
      new DeleteNsStep(),
      new DeleteGlobalsStep()
    ]
  }
}
