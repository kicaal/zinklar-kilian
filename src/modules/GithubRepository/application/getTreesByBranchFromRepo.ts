import {
  Branch,
  GithubRepository,
  Owner,
  Repo,
} from "../domain/GithubRepository";
import {
  GithubRepositoryTreeFromDTO,
  GithubRepositoryTreesFromDTO,
} from "../domain/GithubRepositoryTrees";

export const getTreesByBranchFromRepo = async ({
  owner,
  repo,
  branch,
  GithubRepositoryApi,
}: {
  owner: Owner;
  repo: Repo;
  branch: Branch;
  GithubRepositoryApi: GithubRepository;
}): Promise<GithubRepositoryTreesFromDTO> => {
  async function exploreTree(
    branchSha: string
  ): Promise<GithubRepositoryTreeFromDTO[]> {
    const treeData = await GithubRepositoryApi.getTreesByBranchFromRepo({
      owner,
      repo,
      branch: branchSha,
    });

    let allTrees: GithubRepositoryTreeFromDTO[] = [];

    if (!treeData) return [];

    for (const item of treeData.tree) {
      allTrees.push({ path: item.path, type: item.type, sha: item.sha });

      if (item.type === "tree") {
        const subtree = await exploreTree(item.sha);
        allTrees = [...allTrees, ...subtree];
      }
    }

    return allTrees;
  }

  const tree = await exploreTree(branch);

  return { tree };
};
