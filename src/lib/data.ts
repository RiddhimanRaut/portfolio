export const shiftCrashLinks = {
  pressRelease:
    'https://luminary.ai/resources/luminary-launches-shift-crash-first-physics-ai-model-for-full-vehicle-crash-prediction/',
  technicalPost:
    'https://luminary.ai/resources/shift-crash-bringing-physics-ai-to-full-vehicle-crashworthiness-prediction/',
  dataset: 'https://huggingface.co/datasets/luminary-shift/SHIFT-Crash',
  datasetSample: 'https://huggingface.co/datasets/luminary-shift/SHIFT-Crash-sample',
  demo: 'https://luminary.ai/demo/',
} as const;

export const personalInfo = {
  name: 'Riddhiman Raut',
  role: 'Forward Deployed Engineer (Simulation and Physics AI)',
  tagline: 'Simulations & Physics AI',
  bio: 'Building the future of computational engineering through physics-informed machine learning and high-performance simulations.',
  email: 'rik.raut98@gmail.com',
  workEmail: 'riddhiman@luminarycloud.com',
  location: 'San Francisco Bay Area',
  education: 'Ph.D. Mechanical Engineering (SciML) | Penn State',
  featuredHighlight: {
    label: 'Recently launched',
    title: 'SHIFT-Crash: the first Physics AI model for full-vehicle crash prediction',
    href: shiftCrashLinks.pressRelease,
  },
};

export const socialLinks = {
  github: 'https://github.com/RiddhimanRaut',
  linkedin: 'https://www.linkedin.com/in/riddhiman-raut-21321b130/',
  googleScholar: 'https://scholar.google.com/citations?user=KLyNq24AAAAJ&hl=en',
};

export const aboutContent = {
  paragraphs: [
    "I'm a Forward Deployed Engineer at Luminary, working at the intersection of computational physics and machine learning. Most recently I developed SHIFT-Crash, the first Physics AI model for full-vehicle crash prediction. I generated its 5,000-simulation training dataset, trained the model, and presented the work at SAE World Congress 2026.",
    'With a Ph.D. in Mechanical Engineering from Penn State, I specialized in Scientific Machine Learning (SciML), developing novel approaches to accelerate physics simulations using neural networks and graph-based architectures.',
  ],
  highlights: [
    { label: 'Physics AI', description: 'Neural surrogate models for CFD/FEA' },
    { label: 'SciML', description: 'Scientific machine learning research' },
    { label: 'GNNs', description: 'Graph neural networks for meshes' },
  ],
};

export const experiences = [
  {
    id: 'luminary',
    company: 'Luminary',
    role: 'Forward Deployed Engineer (Simulation and Physics AI)',
    period: 'Jan 2026 - Present',
    location: 'San Mateo, CA',
    current: true,
    logo: '/images/logos/luminary-v2.png',
    description: [
      'Developed SHIFT-Crash, the first Physics AI model for full-vehicle crash prediction, targeting the NHTSA NCAP 56 km/h full-frontal rigid barrier test. Predicts full-field deformations and stresses within 2–3% of simulation',
      'Curated and generated a 5,000-example training corpus of high-fidelity full-vehicle FE crash simulations (parameterized 2010 Toyota Yaris geometries in OpenRadioss), open-sourced on Hugging Face',
      'Validated for peak deceleration (<3%), firewall intrusion (<2%), and delta-V (<2%); achieved sub-element accuracy with only ~300 fine-tuning simulations, addressing the data-dependency question. Presented at SAE World Congress 2026',
      'Developing customer-facing, end-to-end Physics AI workflows that bridge research models with production engineering',
    ],
    links: [
      { label: 'Press Release', href: shiftCrashLinks.pressRelease },
      { label: 'Dataset', href: shiftCrashLinks.dataset },
      { label: 'Demo', href: shiftCrashLinks.demo },
    ],
  },
  {
    id: 'pasteur',
    company: 'Pasteur Labs',
    role: 'Simulation Intelligence Intern',
    period: 'May 2025 - Aug 2025',
    location: 'New York, NY',
    current: false,
    logo: '/images/logos/pasteur.jpg',
    description: [
      'Improved rollout stability in autoregressive surrogates by 40% for reliable long-horizon predictions',
      'Cut training time by 45% and compute needs by 87% using pushforward and temporal bundling',
      'Deployed production-ready GNNs for steady-state modeling, expanding surrogate portfolio',
    ],
  },
];

export const education = [
  {
    id: 'pennstate',
    institution: 'The Pennsylvania State University',
    degree: 'Ph.D. in Mechanical Engineering',
    field: 'Minor in Computational Science',
    period: 'Aug 2022 - Dec 2025',
    location: 'State College, PA',
    logo: '/images/logos/pennstate.png',
  },
  {
    id: 'jadavpur',
    institution: 'Jadavpur University',
    degree: 'B.E. in Mechanical Engineering',
    field: '',
    period: '2016 - 2020',
    location: 'Kolkata, India',
    logo: '/images/logos/jadavpur.webp',
  },
];

export const projects = [
  {
    id: 'shift-crash',
    title: 'SHIFT-Crash: Physics AI for Full-Vehicle Crash Prediction',
    period: 'Apr 2026',
    description:
      'Developed SHIFT-Crash, the first Physics AI model for full-vehicle crash prediction, targeting the NHTSA NCAP 56 km/h full-frontal rigid barrier test. Built on the GeoTransolver architecture with Geometry-Aware Latent Embedding (GALE), the model predicts full-field deformations and Von Mises stress within 2–3% of simulation in seconds, vs. 10–12 hours of traditional FEM (peak deceleration <3%, firewall intrusion <2%, delta-V sub-2%). Trained on a 5,000-simulation dataset of parameterized 2010 Toyota Yaris geometries simulated in OpenRadioss. Presented at SAE World Congress 2026.',
    tags: ['Physics AI', 'Crash Simulation', 'Full-Vehicle FEA'],
    links: [
      { label: 'Press Release', href: shiftCrashLinks.pressRelease },
      { label: 'Dataset', href: shiftCrashLinks.dataset },
      { label: 'Demo', href: shiftCrashLinks.demo },
    ],
  },
  {
    id: 'gnn-lpbf',
    title: 'Scalable GNNs for Additive Manufacturing',
    period: 'Oct 2023 - Jul 2024',
    description:
      'GNN surrogates predicting transient thermal evolution in laser powder bed fusion at 3.77% MAPE; transfer learning from 1× to 2×/3×/4× domains preserves accuracy while replacing ~4-hour FEA runs with near-instant inference.',
    tags: ['GNN', 'Additive Manufacturing', 'Transfer Learning'],
    publication: true,
    publicationTitle:
      'Scalable and transferable graph neural networks for predicting temperature evolution in laser powder bed fusion',
    publicationVenue: 'Eng. Applications of Artificial Intelligence (Elsevier, 2025)',
    link: 'https://www.sciencedirect.com/science/article/abs/pii/S095219762500898X',
    images: ['/images/projects/lpbf-fig3.jpeg', '/images/projects/lpbf-fig1.png'],
  },
  {
    id: 'multiscale-gnn',
    title: 'Multiscale GNNs for Turbulence',
    period: 'Aug 2024 - May 2025',
    description:
      '10× accuracy improvement over MeshGraphNets, GraphSAGE, and GCN baselines on steady-state turbulent flow-thermal prediction around complex pin-fin geometries via a multiscale GNN architecture.',
    tags: ['Multiscale', 'CFD', 'Turbulence'],
    publication: true,
    publicationTitle:
      'Multiscale Graph Neural Network for Turbulent Flow-Thermal Prediction Around a Complex-Shaped Pin-Fin',
    publicationVenue: 'arXiv:2509.04463 (2025)',
    link: 'https://arxiv.org/abs/2509.04463',
    images: ['/images/projects/multiscale-fig3.png', '/images/projects/multiscale-fig2.jpeg'],
  },
  {
    id: 'fignn',
    title: 'FIGNN: Interpretable GNN Surrogates',
    period: 'Dec 2024 - May 2025',
    description:
      'Feature-specific interpretability module for multiscale message-passing GNNs that exposes physically meaningful spatial patterns learned by the surrogate, enabling auditing of neural physics models.',
    tags: ['Interpretability', 'GNN', 'Surrogate Models'],
    publication: true,
    publicationTitle:
      'FIGNN: Feature-Specific Interpretability for Graph Neural Network Surrogate Models',
    publicationVenue: 'arXiv:2506.11398 (2025)',
    link: 'https://arxiv.org/abs/2506.11398',
    images: ['/images/projects/fignn-schematic.png', '/images/projects/fignn-masks.png'],
  },
];

export const pressFeatures = [
  {
    id: 'luminary-shift-crash',
    outlet: 'Luminary',
    title:
      'Luminary Launches SHIFT-Crash, First Physics AI Model for Full-Vehicle Crash Prediction',
    date: 'Apr 14, 2026',
    url: shiftCrashLinks.pressRelease,
  },
];

export const talks = [
  {
    id: 'sae-shift-crash-2026',
    title: 'SHIFT-Crash launch',
    venue: 'SAE World Congress 2026',
    date: 'Apr 2026',
  },
];

export const skills = {
  programming: {
    label: 'Programming',
    items: ['Python', 'C++', 'Julia', 'MATLAB', 'Fortran'],
  },
  ml: {
    label: 'Machine Learning',
    items: [
      'PyTorch',
      'JAX',
      'PhysicsNeMo',
      'Transolver',
      'DoMINO',
      'GNNs',
      'Neural Operators',
      'Transformers',
      'LLMs',
    ],
  },
  hpc: {
    label: 'HPC & Cloud',
    items: ['CUDA', 'MPI', 'OpenMP', 'Slurm', 'GCP', 'AWS', 'Azure ML', 'Argo Workflows'],
  },
  simulation: {
    label: 'Simulation & CAE',
    items: [
      'ANSYS',
      'OpenFOAM',
      'OpenRadioss',
      'ANSA',
      'COMSOL',
      'Netfabb',
      'Crashworthiness',
      'External Aerodynamics',
    ],
  },
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
