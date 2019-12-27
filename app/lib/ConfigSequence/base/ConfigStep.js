//@flow
import { exec } from 'child_process';
import ConfigOption from './ConfigOption';


export default class ConfigStep {
  constructor() {
    const { name, summary } = this.config();
    this._name = name;
    this._summary = summary;
    this.context = null;
    this.bundle = {};
    this._runResult = null;
    this.verifications = [];
  }

  async prepare(){
    this.bundle = await this.generateInitialBundle();
  }

  async generateInitialBundle(): {string: string} {
    return {}
  }

  update(bundle: {string: string}){
    this.bundle = {...this.bundle, ...bundle};
  }

  async verify() {
    this.verifications = await this.performVerifications();
    return this.verifications;
  }

  didRunSucceed(){
    return this._runResult && this._runResult.success;
  }

  didVerificationSucceed(){
    const booleans = Object.values(this.verifications);
    return !booleans.includes(false);
  }

  didSucceed(){
    if(this.verificationConstants().length > 0)
      return this.didVerificationSucceed();
    else return this.didRunSucceed();
  }

  async performVerifications(){
    return {};
  }

  verificationConstants(){
    const dictForm = this.config().verifications;
    return Object.keys(dictForm).map(key => (
      { key: key, name: dictForm[key] }
    ));
  }

  produceCommand(): Array<string> {
    return [];
  }

  produceOptions(): Array<ConfigOption> {
    return [];
  }

  jKmd(cmd, ns): string {
    return this.kmd(`${cmd} -o json`, ns);
  }

  secretLiteral(key): string {
    return `--from-literal=${key}=${this.bundle[key]}`;
  }

  kmd(cmd, ns): string {
    const nsPart = (ns && `-n ${ns}`) || '';
    return `kubectl ${cmd} ${nsPart}`;
  }

  name(): string {
    return this._name;
  }

  summary(): string[] {
    return this._summary;
  }

  decideCommandsSuccess(results: ExecResult[]){
    return results.reduce((w, c) => w && c.success, true);
  }

  formatCommandsOutputs(results: ExecResult[]): string{
    return results.map(r => r.output).join("\n\n")
  }

  async execute(cmd) {
    return await executeCommand(cmd);
  }

  async jExecute(cmd, parseAnyway=false) {
    const { output, success } = await executeCommand(cmd);
    if(success || parseAnyway) {
      const parsed = JSON.parse(output);
      const parsedList = parsed['items'];
      return parsedList != null ? parsedList : parsed;
    }
    return null;
  }

  async run(): ExecResult {
    const cmds = this.produceCommand();
    const results = await Promise.all(cmds.map(async cmd =>
      await this.execute(cmd)
    ));
    this._runResult = {
      success: this.decideCommandsSuccess(results),
      output: this.formatCommandsOutputs(results)
    };
    return this._runResult;
  }

  async verifySecretExists(){
    const cmd = this.jKmd("get secret", "nectar");
    const secrets = (await this.jExecute(cmd)) || [];
    return !!secrets.find(s => s.metadata.name === this.config().secretName);
  }

  async verifySecret(field){
    const cmd = this.jKmd(`get secret ${this.config().secretName}`, "nectar");
    const secret = (await this.jExecute(cmd)) || {};
    return !!secret['data'][field];
  }

  key() { return null; }
  defaults() { return null }
  store() { return null }

  config() {
    return {
      ...this.defaults()[this.key()],
      ...this.store()[this.key()],
    }
  }
}

async function executeCommand(cmd){
  return new Promise(resolve => {
    exec(cmd, (err, stdout, stderr) => {
      const success = !err;
      const output = success ? stdout : (stderr || 'internal error');
      resolve({success, output});
    });
  });
}

type ExecResult = {
  success: boolean,
  output: string
};
