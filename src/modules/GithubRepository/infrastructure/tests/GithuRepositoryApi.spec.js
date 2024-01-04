import { GithubRepositoryApi } from "../GithubRepositoryApi";

describe("GithubRepositoryApi", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("getBranchesFromRepo returns data correctly", async () => {
    const mockBranchesData = [
      {
        name: "Test name",
        commit: {
          sha: "sha",
          url: "url",
        },
        protected: false,
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBranchesData),
    });

    const api = GithubRepositoryApi();
    const owner = "ownerName";
    const repo = "repoName";

    await expect(api.getBranchesFromRepo({ owner, repo })).resolves.toEqual([
      {
        name: "Test name",
      },
    ]);

    // WITH ERROR
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(api.getBranchesFromRepo({ owner, repo })).rejects.toEqual(
      new Error("Error: 404")
    );
  });

  it("getTreesByBranchFromRepo returns data correctly", async () => {
    const mockTreesData = {
      tree: [
        {
          path: "path1",
          type: "tree",
          sha: "otherSha",
          mode: "mode",
          size: 400,
          url: "url",
        },
        {
          path: "path2",
          type: "tree",
          sha: "otherSha",
          mode: "mode",
          size: 400,
          url: "url",
        },
        {
          path: "path4",
          type: "tree",
          sha: "otherSha",
          mode: "mode",
          size: 400,
          url: "url",
        },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTreesData),
    });

    const api = GithubRepositoryApi();
    const owner = "ownerName";
    const repo = "repoName";
    const branch = "branchName";

    await expect(
      api.getTreesByBranchFromRepo({ owner, repo, branch })
    ).resolves.toEqual({
      tree: [
        {
          path: "path1",
          type: "tree",
          sha: "otherSha",
        },
        {
          path: "path2",
          type: "tree",
          sha: "otherSha",
        },
        {
          path: "path4",
          type: "tree",
          sha: "otherSha",
        },
      ],
    });

    // WITH ERROR
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(api.getTreesByBranchFromRepo({ owner, repo })).rejects.toEqual(
      new Error("Error: 404")
    );
  });
});
