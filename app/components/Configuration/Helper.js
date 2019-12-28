//@flow
import InClusterSequence from '../../lib/ConfigSequence/InClusterInstallSeq/InClusterSequence';
import UninstallSeq from '../../lib/ConfigSequence/UninstallSeq/UninstallSeq';

export default class Helper {

  static sequenceClass(name: string): ?Class {
    switch (name) {
      case "local-web": return InClusterSequence;
      case 'uninstall': return UninstallSeq;
      default: return null;
    }
  }
}
