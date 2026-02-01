export interface AboutTextVariants {
  conciseCasual: string;
  conciseTechnical: string;
  detailedCasual: string;
  detailedTechnical: string;
}

export const aboutParagraph1Variants: AboutTextVariants = {
  conciseCasual:
    "I'm an engineer at Luminary Cloud working on cloud-based physics simulations. I help companies run complex engineering simulations faster and more efficiently.",

  conciseTechnical:
    "Forward Deployed Engineer at Luminary Cloud, specializing in cloud-native CFD/FEA infrastructure. Building scalable simulation workflows with HPC integration and ML-accelerated solvers.",

  detailedCasual:
    "I'm a Forward Deployed Engineer at Luminary Cloud, where I work at the intersection of cloud computing and computational physics. My role involves helping companies move their engineering simulations to the cloud, making complex physics calculations accessible and efficient. I work directly with customers to understand their needs and build custom solutions.",

  detailedTechnical:
    "As a Forward Deployed Engineer at Luminary Cloud, I architect and deploy cloud-native computational physics infrastructure. My work spans the full stack of simulation technology: from HPC cluster orchestration and GPU-accelerated solvers to customer-facing APIs and integration pipelines. I specialize in translating complex CFD/FEA workflows into scalable, production-ready systems.",
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
