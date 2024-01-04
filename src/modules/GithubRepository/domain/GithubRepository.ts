import { GithubRepositoryBranchesFromDTO } from "./GithubRepositoryBranches";
import { GithubRepositoryTreesFromDTO } from "./GithubRepositoryTrees";

export type Owner = string;
export type Repo = string;
export type Branch = string;

export interface GithubRepository {
  getBranchesFromRepo: ({
    owner,
    repo,
  }: {
    owner: Owner;
    repo: Repo;
  }) => Promise<GithubRepositoryBranchesFromDTO[]>;
  getTreesByBranchFromRepo: ({
    owner,
    repo,
    branch,
  }: {
    owner: Owner;
    repo: Repo;
    branch: Branch;
  }) => Promise<GithubRepositoryTreesFromDTO>;
}
