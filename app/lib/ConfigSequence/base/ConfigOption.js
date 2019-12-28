//@flow

export default class ConfigOption {

  constructor(kind, key, choices=[]) {
    this._kind = kind;
    this._key = key;
    this._choices = choices;
  }

  possibilities(){
    return this._choices;
  }

  title() { return this.key(); }
  key(){ return this._key; }
  kind(){ return this._kind; }

  static list(key, choices){
    return new ConfigOption(this.LIST, key, choices)
  }

  static free(key){
    return new ConfigOption(this.FREE, key);
  }

  static LIST = 'list';
  static FREE = 'free';
}
