import {
  Branch,
  GithubRepository,
  Owner,
  Repo,
} from "../domain/GithubRepository";
import {
  GithubRepositoryBranchesDTO,
  GithubRepositoryBranchesFromDTO,
} from "../domain/GithubRepositoryBranches";
import {
  GithubRepositoryTreesDTO,
  GithubRepositoryTreesFromDTO,
} from "../domain/GithubRepositoryTrees";

const BASE_URL = "https://api.github.com/repos";

const TOKEN = import.meta.env.VITE_API_URL;

export const GithubRepositoryApi = (): GithubRepository => {
  return {
    getBranchesFromRepo,
    getTreesByBranchFromRepo,
  };

  async function getBranchesFromRepo({
    owner,
    repo,
  }: {
    owner: Owner;
    repo: Repo;
  }): Promise<GithubRepositoryBranchesFromDTO[]> {
    const response = await fetch(`${BASE_URL}/${owner}/${repo}/branches`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data.map(GithubRepositoryBranchesDTO, []);
  }

  async function getTreesByBranchFromRepo({
    owner,
    repo,
    branch,
  }: {
    owner: Owner;
    repo: Repo;
    branch: Branch;
  }): Promise<GithubRepositoryTreesFromDTO> {
    const response = await fetch(
      `${BASE_URL}/${owner}/${repo}/git/trees/${branch}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return GithubRepositoryTreesDTO(data);
  }
};
