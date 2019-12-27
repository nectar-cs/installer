export const constants = {
  applyManifest: {
    rbName: "nectar-cluster-wide-role",
    crbName: "nectar-permissions"
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
  }
};

const { applyManifest: am, pgSecrets: pg, bkSecrets: bk } = constants;

export const defaults = {

  applyManifest: {
    name: "Apply Manifest",
    summary: [
      "Create the MOSAIC resources in the nectar namespace.",
      "Note that things won't work at this point because secrets are missing."
    ],
    verifications: {
      nsExists: "Namespace nectar exists",
      saExists: "ServiceAccount nectar exists",
      rbExists: `RoleBinding ${am.rbName} exists`,
      crbExists: `ClusterRoleBinding ${am.crbName} exists`,
      depsExist: `5/5 deployments in nectar namespace exist`,
      svcsExist: `5/5 services in nectar namespace exist`
    }
  },

  pgSecrets: {
    name: "Create Database Secret",
    summary: [
      "Create a Secrets object for the locally hosted database.",
      "This is a postgres database. The password below is randomly generated."
    ],
    verifications: {
      exists: "Secret mosaic-pg now exists",
      userPresent: `Secret field ${pg.secretName}.${pg.keyUser} is non-empty`,
      passwordPresent: `Secret field ${pg.secretName}.${pg.keyPw} is non-empty`
    }
  },

  bkSecrets: {
    name: "Create Backend Secret",
    summary: [
      "Create a Secrets object for the locally hosted backend.",
      "The secret-key-base is the standard crypto key for Rails apps. " +
      "It's not recommended to keep a copy.",
      "The attr-encrypt-key is used encrypt/decrypt database values. " +
      "It's not recommended to keep a copy."
    ],
    verifications: {
      exists: `Secret ${bk.secretName} now exists`,
      attrEncPresent: `Secret field ${bk.secretName}.${bk.keyAttrEnc} is non-empty`,
      secBasePresent: `Secret field ${bk.secretName}.${bk.keySecBase} is non-empty`
    }
  }
};
