import { GithubRepository, Owner, Repo } from "../domain/GithubRepository";

export const getBranchesFromRepo = ({
  owner,
  repo,
  GithubRepositoryApi,
}: {
  owner: Owner;
  repo: Repo;
  GithubRepositoryApi: GithubRepository;
}) => {
  return GithubRepositoryApi.getBranchesFromRepo({ owner, repo });
};
