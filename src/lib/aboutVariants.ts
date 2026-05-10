export interface AboutTextVariants {
  conciseCasual: string;
  conciseTechnical: string;
  detailedCasual: string;
  detailedTechnical: string;
}

export const aboutParagraph1Variants: AboutTextVariants = {
  conciseCasual:
    "I'm an engineer at Luminary working on Physics AI for engineering simulations. I help companies run complex simulations faster and more efficiently.",

  conciseTechnical:
    "Forward Deployed Engineer (Simulation and Physics AI) at Luminary, specializing in Physics AI surrogates and cloud-native CFD/FEA infrastructure. Building scalable simulation workflows with HPC integration and ML-accelerated solvers.",

  detailedCasual:
    "I'm a Forward Deployed Engineer (Simulation and Physics AI) at Luminary, where I work at the intersection of cloud computing, computational physics, and machine learning. Most recently I developed SHIFT-Crash — Luminary's first Physics AI model for full-vehicle crash prediction — and I work directly with customers to translate complex simulation problems into Physics AI solutions.",

  detailedTechnical:
    "As a Forward Deployed Engineer (Simulation and Physics AI) at Luminary, I architect and deploy cloud-native computational physics infrastructure and Physics AI surrogates. I recently developed SHIFT-Crash — the first Physics AI model for full-vehicle crash prediction, targeting the NHTSA NCAP 56 km/h full-frontal rigid barrier test — by generating a 5,000-simulation training dataset of parameterized 2010 Toyota Yaris geometries in OpenRadioss, training the model on the GeoTransolver architecture, and presenting the work at SAE World Congress 2026. My broader work spans HPC orchestration, GPU-accelerated solvers, customer-facing APIs, and integration of ML-accelerated surrogates into production CFD/FEA workflows.",
};

export const aboutParagraph2Variants: AboutTextVariants = {
  conciseCasual:
    "I have a PhD from Penn State where I researched using AI to speed up physics simulations. I'm particularly interested in graph neural networks for mesh-based problems.",

  conciseTechnical:
    "PhD in Mechanical Engineering (Penn State) with focus on Scientific Machine Learning. Research on GNN-based neural surrogates achieving 10-100x speedup over traditional solvers while maintaining physical consistency.",

  detailedCasual:
    "I earned my PhD in Mechanical Engineering from Penn State, where I specialized in Scientific Machine Learning. My research focused on developing new ways to use neural networks to accelerate physics simulations. Instead of running expensive calculations that take hours or days, I built AI models that can predict the results in seconds. I worked a lot with graph neural networks, which are great for handling the complex mesh structures used in engineering simulations.",

  detailedTechnical:
    "My PhD research at Penn State focused on Scientific Machine Learning (SciML), specifically developing graph neural network architectures for physics simulation acceleration. Key contributions include: multiscale GNN frameworks achieving 10x improvement over baseline architectures for turbulent flow prediction, interpretable feature modules for exposing learned physics representations, and transfer learning strategies enabling domain generalization across mesh resolutions. Publications span applications in CFD, additive manufacturing, and structural analysis.",
};

export const aboutHighlightVariants = {
  physicsAI: {
    conciseCasual: "AI models for engineering simulations",
    conciseTechnical: "Neural surrogate models for CFD/FEA with physics-informed constraints",
    detailedCasual: "Building AI models that can predict the results of complex engineering simulations like fluid dynamics and structural analysis",
    detailedTechnical: "Developing differentiable neural surrogates for computational physics, incorporating physics-informed loss functions, symmetry equivariance, and conservation constraints",
  },
  sciml: {
    conciseCasual: "Using ML for scientific problems",
    conciseTechnical: "Scientific Machine Learning research and applications",
    detailedCasual: "Applying machine learning techniques to solve scientific and engineering problems, bridging the gap between traditional simulation and modern AI",
    detailedTechnical: "Research in Scientific Machine Learning spanning neural operators, physics-informed neural networks, and hybrid numerical-ML solvers for PDEs",
  },
  gnns: {
    conciseCasual: "Neural networks for mesh data",
    conciseTechnical: "Graph neural networks for unstructured mesh geometries",
    detailedCasual: "Using graph neural networks to work with the complex mesh structures used in engineering simulations, enabling AI to understand geometry",
    detailedTechnical: "Multiscale message-passing GNNs for unstructured meshes, with applications in transient dynamics, steady-state prediction, and autoregressive rollout",
  },
};

export function getAboutText(
  variants: AboutTextVariants,
  verbosity: number,
  technicalLevel: number
): string {
  const isVerbose = verbosity >= 0.5;
  const isTechnical = technicalLevel >= 0.5;

  if (!isVerbose && !isTechnical) return variants.conciseCasual;
  if (!isVerbose && isTechnical) return variants.conciseTechnical;
  if (isVerbose && !isTechnical) return variants.detailedCasual;
  return variants.detailedTechnical;
}

export function getHighlightText(
  highlight: keyof typeof aboutHighlightVariants,
  verbosity: number,
  technicalLevel: number
): string {
  const variants = aboutHighlightVariants[highlight];
  const isVerbose = verbosity >= 0.5;
  const isTechnical = technicalLevel >= 0.5;

  if (!isVerbose && !isTechnical) return variants.conciseCasual;
  if (!isVerbose && isTechnical) return variants.conciseTechnical;
  if (isVerbose && !isTechnical) return variants.detailedCasual;
  return variants.detailedTechnical;
}
