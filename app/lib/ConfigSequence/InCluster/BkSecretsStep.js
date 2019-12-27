import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';

export default class BkSecretsStep extends ConfigStep {

  produceCommand(): Array<string> {
    let command = `create secret generic ${this.config().secretName} `;
    command += `${this.secretLiteral(this.config().keySecBase)} `;
    command += `${this.secretLiteral(this.config().keyAttrEnc)}`;
    command = this.kmd(command, 'nectar');
    return [command];
  }

  async generateInitialBundle(): { string: string } {
    return {
      [this.config().keyAttrEnc]: 'abc',
      [this.config().keySecBase]: '123'
    }
  }

  async performVerifications() {
    const { keyAttrEnc, keySecBase } = this.config();
    return {
      exists: (await this.verifySecretExists()),
      secBasePresent: (await this.verifySecret(keyAttrEnc)),
      attrEncPresent: (await this.verifySecret(keySecBase))
    };
  }

  key() { return "bkSecrets" }
  defaults() {return defaults}
  store() { return constants }
}
