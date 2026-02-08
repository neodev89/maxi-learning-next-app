interface techStructure {
    id: string;
    name: string;
    description: string;
}

interface techList {
    technologies: Array<techStructure>;
    IDE: Array<techStructure>;
    versioning: Array<techStructure>;
}

export type {
    techStructure,
    techList,
}