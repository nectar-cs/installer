export const constants = {
  setContext: {
    keyContext: "context"
  },
};

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
};
