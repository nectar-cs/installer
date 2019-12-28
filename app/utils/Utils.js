import React from 'react';

const GCP_BASE = 'https://storage.googleapis.com/';
const IMG_BASE = GCP_BASE + 'nectar-mosaic-public/images';

export default class Utils {

  static arrayOfHashesOptions(options){
    return options.map(option => (
      <option key={option['value']} value={option['value']}>
        { option['show'] }
      </option>
    ));
  }

  static arrayOptions(options){
    return options.map(option => (
      <option key={option} value={option}>
        { option }
      </option>
    ));
  }

  static hashOptions(options){
    return Object.keys(options).map((key) => (
      <option key={key} value={key}>
        { options[key] }
      </option>
    ));
  }

  static tor(op, def=null){
    try{
      return op
    }
    catch (e) {
      return def;
    }
  }

  static image(name) {
    return `${IMG_BASE}/${name}`;
  }
}
