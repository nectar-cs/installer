
const localWebSummary = "The most secure option. Everything runs in your cluster " +
  "and you can only access the app via port-forward. Lacks desktop features like " +
  "live code syncing.";

const cloudWebSummary = "A.k.a the SaaS way, the easiest option. We help you create " +
  "a ServiceAccount in your cluster, you give us the token, and our remote backends " +
  "authenticate into your cluster. Users authenticate and consume the web app at " +
  "app.codenectar.com/mosaic";

const localDesktopSummary = "Identical to the first option, but the app is now a " +
  "desktop application. It has extra features, notably live code syncing between your" +
  "computer and cluster.";

const cloudDesktopSummary = "Identical to the second option except the app is now " +
  " a desktop application";

const localWebComps = {
  frontend: {
    location: "in-cluster",
    storage: "no",
    openness: "closed",
    deployment: "frontend"
  },
  kapi: {
    location: "in-cluster",
    storage: "no",
    openness: "closed",
    deployment: "kapi, dind"
  },
  backend: {
    location: "in-cluster",
    storage: "yes",
    openness: "closed",
    deployment: "backend, postgres"
  }
};

const cloudWebComps = {
  ...localWebComps,
  frontend: { ...localWebComps.frontend, location: 'cloud', deployment: 'none' },
  kapi: { ...localWebComps.kapi, location: 'cloud', deployment: 'none' },
  backend: { ...localWebComps.backend, location: 'cloud', deployment: 'none' },
};

const localDesktopComps = {
  ...localWebComps,
  frontend: { ...localWebComps.frontend, location: 'desktop', deployment: 'none' },
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
  let base = "The dashboard you interact with. ";
  if(bundle.location === 'in-cluster'){
    base += "Runs in your web browser, deployment lives in your cluster," +
      " accessible via port-forward, e.g localhost:9000/mosaic."
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
    ", receives DockerHub/GCR creds from frontend. ";
  if(bundle.location === 'in-cluster'){
    base += "Deployment lives in your cluster, along with dind " +
      "(docker-in-docker image used to build your git images inside your cluster).";
  }
  return base;
}

function backendDetail(bundle){
  let base = "Rails server for database logic and Git/Docker remotes interfacing";
  if(bundle.location === 'in-cluster'){
    base += ". Deployment lives in your cluster, along with postgres deployment " +
      "created during the setup phase."
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
        title: _ => "K8s Logic Backend",
        detail: bundle => kapiDetail(bundle)
      },
      backend: {
        title: _ =>  "Business Logic Backend",
        detail: bundle => backendDetail(bundle)
      }
    }
  },

  components: [
    { key: 'frontend', title: "Frontend/Desktop" } ,
    { key: 'kapi', title: "K8s Logic Backend" },
    { key: 'backend', title: "Business Logic Backend" }
  ],

  flavors: [
    {
      id: "local-web",
      icon: "web",
      title: "Your Cluster - Web",
      subtitle: "You host everything, port-forward to the MOSAIC web app.",
      components: localWebComps,
      summary: localWebSummary,
      ready: true
    },
    {
      id: "cloud-web",
      icon: "web",
      title: "Cloud - Web",
      subtitle: "We host everything, app at app.codenectar.com",
      components: cloudWebComps,
      summary: cloudWebSummary
    },
    {
      id: "local-desktop",
      icon: "computer",
      title: "Your Cluster - Desktop",
      subtitle: "You host everything, use the MOSAIC desktop application.",
      components: localDesktopComps,
      summary: localDesktopSummary
    },
    {
      id: "cloud-desktop",
      title: "Cloud - Desktop",
      icon: "computer",
      subtitle: "We host the backend, use the MOSAIC desktop application.",
      components: cloudDesktopComps,
      summary: cloudDesktopSummary
    }
  ]
};

export default defaults;
