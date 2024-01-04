import { GithubRepositoryBranchesDTO } from "../GithubRepositoryBranches";

describe("GithubRepositoryBranchesDTO", () => {
  it("should GithubRepositoryBranchesDTO map data correctly", () => {
    const list = [
      {
        name: "Test name",
        commit: {
          sha: "sha",
          url: "url",
        },
        protected: false,
      },
    ];

    const listParsed = list.map(GithubRepositoryBranchesDTO);

    expect(listParsed).toEqual([
      {
        name: "Test name",
      },
    ]);
  });
});
