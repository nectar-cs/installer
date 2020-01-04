//@flow
import ConfigOption from './ConfigOption';
import Utils from '../../../utils/Utils';


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

  validate(): Array<string>{
    return [];
  }

  validatePresence(errors, key){
    if(!this.bundle[key])
      errors.push(`${key} cannot be blank`);
  }

  validateLength(errors, key, length){
    if(this.bundle[key] && this.bundle[key].length !== length)
      errors.push(`${key} must have a length of ${length}`);
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
    console.log("FALSES");
    console.log(this.verifications);
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

  kmd(cmd, ns): string {
    const nsPart = (ns && ` -n ${ns}`) || '';
    return `echo $(kubectl ${cmd}${nsPart} 2>&1)`;
  }

  jKmd(cmd, ns): string {
    return this.kmd(`${cmd} -o json`, ns);
  }

  secretLiteral(key): string {
    return `--from-literal=${key}=${this.bundle[key]}`;
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
    return await Utils.shellExec(cmd);
  }

  async jExecute(cmd, parseAnyway=false) {
    let { output, success } = await Utils.shellExec(cmd);
    if(success || parseAnyway) {
      try{
        output = output.replace(/\s{2,}/g, ' ');
        output = output.replace(/\t/g, ' ');
        output = output.toString().trim().replace(/(\r\n|\n|\r)/g,"");
        const parsed = JSON.parse(output);
        const parsedList = parsed['items'];
        return parsedList != null ? parsedList : parsed;
      }catch(e){
        return null;
      }
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
    const secrets = await this.jExecute(cmd);
    return !!(secrets || []).find(s =>
      s.metadata.name === this.config().secretName
    );
  }

  async verifySecret(field){
    const cmd = this.jKmd(`get secret ${this.config().secretName}`, "nectar");
    const secret = await this.jExecute(cmd);
    return Utils.tor(_ => !!((secret || {})['data'][field]));
  }

  async verifyResCount(resName, count){
    const cmd = this.jKmd(`get ${resName}`, "nectar");
    const res = await this.jExecute(cmd);
    return (res || []).length === count;
  }

  async verifyResPres(resName, exp, ns='nectar'){
    const cmd = this.jKmd(`get ${resName}`, ns);
    const resList = (await this.jExecute(cmd)) || [];
    return !!resList.find(r => r.metadata.name === exp);
  }

  async verifyResGone(resName, exp, ns){
    const isPresent = await this.verifyResPres(resName, exp, ns);
    return !isPresent;
  }

  config() {
    return {
      ...this.defaults()[this.key()],
      ...this.store()[this.key()],
    }
  }

  key() { return null; }
  defaults() { return null }
  store() { return null }
}

type ExecResult = {
  success: boolean,
  output: string
};
