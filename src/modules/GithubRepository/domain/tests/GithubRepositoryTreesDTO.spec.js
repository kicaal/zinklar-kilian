import { GithubRepositoryTreesDTO } from "../GithubRepositoryTrees";

describe("GithubRepositoryTreesDTO", () => {
  it("should GithubRepositoryTreesDTO map data correctly", () => {
    const list = [
      {
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
      },
    ];

    const listParsed = list.map(GithubRepositoryTreesDTO);

    expect(listParsed).toEqual([
      {
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
      },
    ]);
  });
});
