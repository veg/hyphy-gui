const methodSpecificInfo = {
  absrel: {
    name: "aBSREL",
    description:
      "An adaptive branch-site REL test for episodic diversification",
    branchSelection: true
  },
  busted: {
    name: "BUSTED",
    description:
      "Branch-site Unrestricted Statistical Test for Episodic Diversification",
    branchSelection: true
  },
  fel: {
    name: "FEL",
    description: "Fixed Effects Likelihood",
    branchSelection: true
  },
  fubar: {
    name: "FUBAR",
    description:
      "A Fast, Unconstrained Bayesian AppRoximation for Inferring Selection",
    branchSelection: false
  },
  gard: {
    name: "GARD",
    description: "A Genetic Algorithm for Recombination Detection",
    branchSelection: false
  },
  meme: {
    name: "MEME",
    description:
      "Detect Individual Sites Subject to Episodic Diversifying Selection",
    branchSelection: false
  },
  relax: {
    name: "RELAX",
    description:
      "Detect relaxed selection in a codon-based phylogenetic framework",
    branchSelection: true
  },
  slac: {
    name: "SLAC",
    description: "Single-Likelihood Ancestor Counting",
    branchSelection: true
  }
};

module.exports = methodSpecificInfo;
