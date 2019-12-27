//@flow

export default class ConfigOption {

  constructor(kind, key) {
    this._kind = kind;
    this._key = key;
  }

  possibilities(){
    return {};
  }

  key(){ return this._key; }
  kind(){ return this._kind; }

  static select(key){
    return new ConfigOption(this.LIST, key)
  }

  static free(key){
    return new ConfigOption(this.FREE, key);
  }

  static LIST = 'list';
  static FREE = 'free';
}
