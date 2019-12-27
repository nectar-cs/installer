const localWebComps = {
  frontend: {
    location: "in-cluster",
    storage: "no",
    openness: "closed"
  },
  kapi: {
    location: "in-cluster",
    storage: "no",
    openness: "closed"
  },
  backend: {
    location: "in-cluster",
    storage: "yes",
    openness: "closed"
  }
};

const cloudWebComps = {
  ...localWebComps,
  frontend: { ...localWebComps.frontend, location: 'cloud' },
  kapi: { ...localWebComps.kapi, location: 'cloud' },
  backend: { ...localWebComps.backend, location: 'cloud' },
};

const localDesktopComps = {
  ...localWebComps,
  frontend: { ...localWebComps.frontend, location: 'desktop' },
};

const cloudDesktopComps = {
  ...cloudWebComps,
  frontend: { ...cloudWebComps.frontend, location: 'desktop' },
};

function frontendTitle(bundle){
  if(bundle.location === 'desktop') return "Frontend";
  return "Frontend";
}

function frontendDetail(bundle){
  let base = "The dashboard you interact with. " +
    "Communicates with Backend and Secondary Backend";
  if(bundle.location === 'in-cluster'){
    base += "Runs in your web browser, deployment lives in your cluster," +
      " accessible via port-forward, " +
      "e.g localhost:9000/workspaces"
  }
  else if(bundle.location === 'desktop'){
    base += "A standalone desktop app for Linux and Mac." +
      "Identical to the browser version, plus extra features like" +
      "live local repo-cluster syncing."
  }
  else if(bundle.location === 'cloud'){
    base += "Runs in your web browser, hosted by us, accessible over HTTPS" +
      "e.g app.codenectar.com/workspaces";
  }
  return base;
}

function kapiDetail(bundle){
  let base = "Python server for all Kubernetes logic. Does not store data" +
    ", receives DockerHub/GCR creds from frontend.";
  if(bundle.location === 'in-cluster'){
    base += "Deployment lives in your cluster.";
  }
  return base;
}

function backendDetail(bundle){
  let base = "Rails server for database logic and Git/Docker remotes interfacing";
  if(bundle.location === 'in-cluster'){
    base += ". Deployment lives in your cluster, along with postgres deployment " +
      "created during the setup phase"
  }
  return base;
}

const defaults = {
  header: {
    title: "Choose a Flavor",
    subtitle: "Where should MOSAIC's components live?"
  },

  explanations: {
    main: "Click on a flavor below to see a preview on the right.",
    comps: {
      frontend: {
        title: bundle => frontendTitle(bundle),
        detail: bundle => frontendDetail(bundle)
      },
      kapi: {
        title: _ => "Backend",
        detail: bundle => kapiDetail(bundle)
      },
      backend: {
        title: _ =>  "Secondary Backend",
        detail: bundle => backendDetail(bundle)
      }
    }
  },

  components: [
    { key: 'frontend', title: "Frontend/Desktop" } ,
    { key: 'kapi', title: "Primary Backend" },
    { key: 'backend', title: "Secondary Backend" }
  ],

  flavors: [
    {
      id: "local-web",
      icon: "web",
      title: "Your Cluster - Web",
      subtitle: "You host everything, port-forward to the MOSAIC web app.",
      components: localWebComps,
      ready: true
    },
    {
      id: "cloud-web",
      icon: "web",
      title: "Cloud - Web",
      subtitle: "We host everything, app at app.codenectar.com",
      components: cloudWebComps
    },
    {
      id: "local-desktop",
      icon: "computer",
      title: "Your Cluster - Desktop",
      subtitle: "You host everything, use the MOSAIC desktop application.",
      components: localDesktopComps
    },
    {
      id: "cloud-desktop",
      title: "Cloud - Desktop",
      icon: "computer",
      subtitle: "We host the backend, use the MOSAIC desktop application.",
      components: cloudDesktopComps
    }
  ]
};

export default defaults;
