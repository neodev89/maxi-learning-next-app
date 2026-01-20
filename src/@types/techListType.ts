interface PropsTechTypes {
  id: string;
  name: string;
  description: string;
}

interface TechnologiesBlock {
  technologies: PropsTechTypes[];
}

interface IdeBlock {
  IDE: PropsTechTypes[];
}

interface VersioningBlock {
  versioning: PropsTechTypes[];
}

type TechListTypes = [
  TechnologiesBlock,
  IdeBlock,
  VersioningBlock
];

export type {
    PropsTechTypes,
    TechnologiesBlock,
    IdeBlock,
    VersioningBlock,
    TechListTypes,
}