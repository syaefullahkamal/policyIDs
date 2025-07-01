export interface NFTProject {
  project: string;
  tags?: string[];
  policies: string[];
}

export interface ProjectFile {
  filename: string;
  content: NFTProject | NFTProject[];
}