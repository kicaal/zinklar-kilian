interface Commit {
  sha: string;
  url: string;
}

interface GithubRepositoryBranchesToDTO {
  name: string;
  commit: Commit;
  protected: boolean;
}

export interface GithubRepositoryBranchesFromDTO {
  name: string;
}

export const GithubRepositoryBranchesDTO: GithubRepositoryBranchesFromDTO = ({
  name,
}: GithubRepositoryBranchesToDTO) => ({
  name,
});
