export const constants = {
  applyManifest: {
    crName: "nectar-cluster-wide-role",
    crbName: "nectar-permissions",
    yamlUrl: "https://raw.githubusercontent.com/nectar-cs/mosaic/master/manifest.yaml",
    yamlPath: "$HOME/workspace/mosaic/installer/manifest.yaml",
    depCount: 5,
    svcCount: 5,
    pvcCount: 1
  },
  pgSecrets: {
    secretName: "mosaic-pg",
    keyUser: "db-user",
    keyPw: "db-password"
  },
  bkSecrets: {
    secretName: "mosaic-backend",
    keyAttrEnc: "attr-encrypt-key",
    keySecBase: "secret-key-base"
  },
  tryIt: {
    skips: true,
    commands: [
      'kubectl port-forward svc/frontend 9000:80 -n nectar',
      'kubectl port-forward svc/backend 3000:80 -n nectar',
      'kubectl port-forward svc/kapi 5000:80 -n nectar'
    ]
  }
};

const { applyManifest: am, pgSecrets: pg, bkSecrets: bk } = constants;

export const defaults = {

  setContext: {
    name: "Set Context",
    summary: [
      "Select a context from your kube config",
      "This will change the context system-wide, so you should change it back later."
    ],
    verifications: {
      contextChanged: "Context now selected value"
    }
  },

  applyManifest: {
    name: "Apply Manifest",
    summary: [
      "Create the MOSAIC resources in the nectar namespace.",
      "Note that things won't work at this point because secrets are missing."
    ],
    verifications: {
      nsExists: "Namespace nectar exists",
      saExists: "ServiceAccount nectar exists",
      rbExists: `ClusterRole ${am.crName} exists`,
      crbExists: `ClusterRoleBinding ${am.crbName} exists`,
      pvcExists: `${am.pvcCount}/${am.pvcCount} PersistentVolumeClaims exist`,
      depsExist: `${am.depCount}/${am.depCount} deployments in nectar namespace exist`,
      svcsExist: `${am.svcCount}/${am.svcCount} services in nectar namespace exist`
    }
  },

  pgSecrets: {
    name: "Create Database Secret",
    summary: [
      "Create a Secrets object for the locally hosted database.",
      "This is a postgres database. The password is randomly generated."
    ],
    verifications: {
      exists: `Secret ${pg.secretName} now exists`,
      userPresent: `Secret field ${pg.secretName}.${pg.keyUser} non-empty`,
      passwordPresent: `Secret field ${pg.secretName}.${pg.keyPw} non-empty`
    }
  },

  bkSecrets: {
    name: "Create Backend Secret",
    summary: [
      "Create a Secrets object for the locally hosted backend.",
      "The values below are randomly generated. It is not recommended to make copies.",
      "The secret-key-base is the standard 128 byte crypto key for Rails apps.",
      "The attr-encrypt-key is the 32 byte keys for encrypting/decrypting database values.",
    ],
    verifications: {
      exists: `Secret ${bk.secretName} now exists`,
      attrEncPresent: `Secret field ${bk.secretName}.${bk.keyAttrEnc} non-empty`,
      secBasePresent: `Secret field ${bk.secretName}.${bk.keySecBase} non-empty`
    }
  },

  tryIt: {
    name: "Test the Installation",
    summary: [
      "Run MOSAIC in your web browser.",
      "Copy the commands below in separate terminals.",
      "Then open a browser window at localhost:9000."
    ]
  }
};
