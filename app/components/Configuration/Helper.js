//@flow
import InClusterSequence from '../../lib/ConfigSequence/InCluster/InClusterSequence';

export default class Helper {

  static sequenceClass(name){
    switch (name) {
      case "local-web": return InClusterSequence;
      default: return null;
    }
  }
}
