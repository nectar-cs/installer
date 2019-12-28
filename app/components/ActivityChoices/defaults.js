const defaults = {
  header: {
    title: "MOSAIC Setup Wizard",
    subtitle: "Choose an activity to begin with"
  },

  sections: [
    {
      id: 'install',
      title: "Install",
      subtitle: "Setup an instance of MOSAIC in your cluster or on the cloud.",
      ready: true
    },
    {
      id: 'uninstall',
      title: "Uninstall",
      subtitle: "Purge an instance of MOSAIC from your cluster or on the cloud.",
      ready: true,
      redirect: `/configure/uninstall`
    },
    {
      id: 'configure',
      title: "Configure",
      subtitle: "Change MOSAIC Resources, Env Variables, and Secrets."
    },
    {
      id: 'migrate',
      title: "Migrate",
      subtitle: "Move instances of MOSAIC between clusters and the cloud."
    }
  ]
};


export default defaults;
