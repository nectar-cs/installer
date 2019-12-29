import ConfigStep from '../base/ConfigStep';
import { constants, defaults } from './defaults';
import ConfigOption from '../base/ConfigOption';
import crypto from 'crypto'

export default class BkSecretsStep extends ConfigStep {

  randomString(length){
    return crypto.randomBytes(length / 2).toString('hex');
  }

  validate(): Array<string> {
    const errors = [];
    const { keyAttrEnc, keySecBase } = this.config();
    this.validatePresence(errors, keyAttrEnc);
    this.validatePresence(errors, keySecBase);
    this.validateLength(errors, keyAttrEnc, 32);
    this.validateLength(errors, keySecBase, 128);
    return errors;
  }

  async generateInitialBundle(): { string: string } {
    const { keyAttrEnc, keySecBase } = this.config();
    return {
      [keyAttrEnc]: this.randomString(32),
      [keySecBase]: this.randomString(128)
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
