//@flow
import ConfigStep from '../base/ConfigStep';
import ConfigOption from '../base/ConfigOption';
import { constants, defaults } from './defaults';

const crypto = require("crypto");

export default class PgSecretsStep extends ConfigStep {

  async generateInitialBundle(): {string: string}{
    const password = crypto.randomBytes(20).toString('hex');

    return({
      [this.config().keyUser]: 'cluster',
      [this.config().keyPw]: password
    })
  }

  produceCommand(): Array<string> {
    const { secretName, keyUser, keyPw } = this.config();
    let command = `create secret generic ${secretName} `;
    command += `${this.secretLiteral(keyUser)} `;
    command += `${this.secretLiteral(keyPw)}`;
    command = this.kmd(command, 'nectar');
    return [command];
  }

  async performVerifications() {
    const { keyUser, keyPw } = this.config();
    return {
      exists: (await this.verifySecretExists()),
      userPresent: (await this.verifySecret(keyUser)),
      passwordPresent: (await this.verifySecret(keyPw))
    };
  }

  produceOptions(): Array<ConfigOption> {
    const { keyUser, keyPw } = this.config();
    return[
      ConfigOption.free(keyUser),
      ConfigOption.free(keyPw),
    ]
  }

  defaults() { return defaults }
  key(){ return "pgSecrets"; }
  store() { return constants }
}
