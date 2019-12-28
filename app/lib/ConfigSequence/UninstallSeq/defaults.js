export const constants = {
  deleteNs: {
  },
  deleteGlobals: {
    cr: 'nectar-cluster-wide-role',
    crb: 'nectar-permissions'
  }
};

export const defaults = {
  deleteNs: {
    name: "Delete Namespace",
    summary: [
      "Delete 'nectar' and its resources.",
      "This can take up to a minute."
    ],
    verifications: {
      nsGone: "Namespace nectar gone",
      depsGone: "No deployments remaining",
      svcsGone: "No services remaining",
      saGone: "ServiceAccount gone",
    }
  },
  deleteGlobals: {
    name: "Delete Globals",
    summary: [
      "Delete global resources.",
      "The commands will delete the RBACs used to authorize MOSAIC."
    ],
    verifications: {
      crGone: "ClusterRole gone",
      crbGone: "ClusterRoleBinding gone",
    }
  }
};
