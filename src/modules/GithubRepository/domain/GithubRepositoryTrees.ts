interface GithubRepositoryTreeToDTO {
  path: string;
  type: string;
  mode: string;
  sha: string;
  size: number;
  url: string;
}

interface GithubRepositoryTreesToDTO {
  sha: string;
  url: string;
  tree: GithubRepositoryTreeToDTO[];
}

export interface GithubRepositoryTreeFromDTO {
  path: string;
  type: string;
  sha: string;
}

export interface GithubRepositoryTreesFromDTO {
  tree: GithubRepositoryTreeFromDTO[];
}

const GithubRepositoryTreeDTO = ({
  path,
  type,
  sha,
}: GithubRepositoryTreeToDTO): GithubRepositoryTreeFromDTO => ({
  path,
  type,
  sha,
});

export const GithubRepositoryTreesDTO = ({
  tree,
}: GithubRepositoryTreesToDTO): GithubRepositoryTreesFromDTO => ({
  tree: tree.map(GithubRepositoryTreeDTO, []),
});
