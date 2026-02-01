export const personalInfo = {
  name: 'Riddhiman Raut',
  role: 'Forward Deployed Engineer',
  tagline: 'Simulations & Physics AI',
  bio: 'Building the future of computational engineering through physics-informed machine learning and high-performance simulations.',
  email: 'rik.raut98@gmail.com',
  workEmail: 'riddhiman@luminarycloud.com',
  location: 'San Francisco Bay Area',
  education: 'Ph.D. Mechanical Engineering (SciML) | Penn State',
};

export const socialLinks = {
  github: 'https://github.com/RiddhimanRaut',
  linkedin: 'https://www.linkedin.com/in/riddhiman-raut-21321b130/',
  googleScholar: 'https://scholar.google.com/citations?user=KLyNq24AAAAJ&hl=en',
};

export const aboutContent = {
  paragraphs: [
    "I'm a Forward Deployed Engineer at Luminary Cloud, where I work at the intersection of cloud computing and computational physics. My work focuses on making complex engineering simulations accessible and efficient through modern infrastructure.",
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
    company: 'Luminary Cloud',
    role: 'Forward Deployed Engineer',
    period: 'Jan 2026 - Present',
    location: 'San Mateo, CA',
    current: true,
    logo: '/images/logos/luminary-v2.png',
    description: [
      'Leading customer-facing technical implementations for cloud-based CFD/FEA simulations',
      'Developing custom simulation workflows and integrations for enterprise clients',
      'Bridging the gap between complex physics simulations and production engineering systems',
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
    id: 'gnn-lpbf',
    title: 'Scalable GNNs for Additive Manufacturing',
    period: 'Oct 2023 - Jul 2024',
    description:
      'Built graph convolutional networks for scan-path optimization in laser powder bed fusion. Demonstrated scalability and generalizability for 2x, 3x, and 4x domains using transfer learning.',
    tags: ['GNN', 'Additive Manufacturing', 'Transfer Learning'],
    publication: true,
    link: 'https://www.sciencedirect.com/science/article/abs/pii/S095219762500898X',
    images: ['/images/projects/lpbf-fig3.jpeg', '/images/projects/lpbf-fig1.png'],
  },
  {
    id: 'multiscale-gnn',
    title: 'Multiscale GNNs for Turbulence',
    period: 'Aug 2024 - May 2025',
    description:
      'Developed GNN architecture for modeling steady-state turbulent flow around turbine pin-fins, showing 10x improvement over GCNs, GraphSAGE, and MeshGraphNets.',
    tags: ['Multiscale', 'CFD', 'Turbulence'],
    publication: true,
    link: 'https://arxiv.org/abs/2509.04463',
    images: ['/images/projects/multiscale-fig3.png', '/images/projects/multiscale-fig2.jpeg'],
  },
  {
    id: 'fignn',
    title: 'FIGNN: Interpretable GNN Surrogates',
    period: 'Dec 2024 - May 2025',
    description:
      'Built feature-specific interpretability module for multiscale message-passing graph neural networks, exposing physically meaningful spatial patterns.',
    tags: ['Interpretability', 'GNN', 'Surrogate Models'],
    publication: true,
    link: 'https://arxiv.org/abs/2506.11398',
    images: ['/images/projects/fignn-schematic.png', '/images/projects/fignn-masks.png'],
  },
];

export const skills = {
  programming: {
    label: 'Programming',
    items: ['Python', 'C++', 'Julia', 'MATLAB', 'Fortran'],
  },
  ml: {
    label: 'Machine Learning',
    items: ['PyTorch', 'JAX', 'GNNs', 'Neural Operators', 'Transformers', 'LLMs'],
  },
  hpc: {
    label: 'HPC & Cloud',
    items: ['CUDA', 'MPI', 'OpenMP', 'Slurm', 'Azure ML', 'AWS'],
  },
  simulation: {
    label: 'Simulation & CAE',
    items: ['ANSYS', 'OpenFOAM', 'OpenRadioss', 'ANSA', 'COMSOL', 'Netfabb'],
  },
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
