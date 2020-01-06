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
      nsGone: "nectar namespace and contents gone",
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
