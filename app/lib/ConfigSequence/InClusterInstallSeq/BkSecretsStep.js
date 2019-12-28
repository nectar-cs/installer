import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';
import ConfigOption from '../base/ConfigOption';

export default class BkSecretsStep extends ConfigStep {

  async generateInitialBundle(): { string: string } {
    const { keyAttrEnc, keySecBase } = this.config();
    return {
      [keyAttrEnc]: 'abc',
      [keySecBase]: '123'
    }
  }

  produceCommand(): Array<string> {
    const { keyAttrEnc, keySecBase } = this.config();
    let command = `create secret generic ${this.config().secretName} `;
    command += `${this.secretLiteral(keySecBase)} `;
    command += `${this.secretLiteral(keyAttrEnc)}`;
    command = this.kmd(command, 'nectar');
    return [command];
  }

  async performVerifications() {
    const { keyAttrEnc, keySecBase } = this.config();
    return {
      exists: (await this.verifySecretExists()),
      secBasePresent: (await this.verifySecret(keyAttrEnc)),
      attrEncPresent: (await this.verifySecret(keySecBase))
    };
  }

  produceOptions(): Array<ConfigOption> {
    const { keyAttrEnc, keySecBase } = this.config();
    return [
      ConfigOption.free(keySecBase),
      ConfigOption.free(keyAttrEnc)
    ]
  }

  key() { return "bkSecrets" }
  defaults() {return defaults}
  store() { return constants }
}
