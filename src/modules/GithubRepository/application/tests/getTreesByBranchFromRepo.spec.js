import { getTreesByBranchFromRepo } from "../getTreesByBranchFromRepo";
import { GithubRepositoryApi } from "../../infrastructure/GithubRepositoryApi";

jest.mock("../../infrastructure/GithubRepositoryApi");

describe("getTreesByBranchFromRepo", () => {
  let mockGetTreesByBranchFromRepo;
  beforeEach(() => {
    GithubRepositoryApi.mockClear();

    mockGetTreesByBranchFromRepo = jest.fn();
    GithubRepositoryApi.mockImplementation(() => {
      return {
        getTreesByBranchFromRepo: mockGetTreesByBranchFromRepo,
      };
    });
  });

  it("should call getTreesByBranchFromRepo returns data", async () => {
    mockGetTreesByBranchFromRepo.mockImplementation((params) => {
      if (params.branch === "branch") {
        return Promise.resolve({
          tree: [
            { path: "path1", type: "tree", sha: "otherSha" },
            { path: "path2", type: "blob", sha: "blobSha" },
          ],
        });
      } else if (params.branch === "otherSha") {
        return Promise.resolve({
          tree: [{ path: "subPath1", type: "blob", sha: "otherBlob" }],
        });
      }
    });

    const mockOwner = "owner";
    const mockRepo = "repo";
    const mockBranch = "branch";
    const mockApi = GithubRepositoryApi();

    const result = await getTreesByBranchFromRepo({
      owner: mockOwner,
      repo: mockRepo,
      branch: mockBranch,
      GithubRepositoryApi: mockApi,
    });

    expect(mockApi.getTreesByBranchFromRepo).toHaveBeenCalledWith({
      owner: mockOwner,
      repo: mockRepo,
      branch: mockBranch,
    });

    expect(result).toEqual({
      tree: [
        { path: "path1", type: "tree", sha: "otherSha" },
        { path: "subPath1", type: "blob", sha: "otherBlob" },
        { path: "path2", type: "blob", sha: "blobSha" },
      ],
    });

    expect(mockApi.getTreesByBranchFromRepo).toHaveBeenCalledTimes(2);
  });

  it("should call getTreesByBranchFromRepo returns error", async () => {
    mockGetTreesByBranchFromRepo.mockImplementation(() =>
      Promise.reject(new Error("Error: 404"))
    );

    const mockOwner = "owner";
    const mockRepo = "repo";
    const mockBranch = "branch";
    const mockApi = GithubRepositoryApi();

    await getTreesByBranchFromRepo({
      owner: mockOwner,
      repo: mockRepo,
      branch: mockBranch,
      GithubRepositoryApi: mockApi,
    }).catch((error) => {
      expect(error.message).toBe("Error: 404");
    });
  });

  it("should call getTreesByBranchFromRepo returns empty data", async () => {
    mockGetTreesByBranchFromRepo.mockImplementation(() => Promise.resolve());

    const mockOwner = "owner";
    const mockRepo = "repo";
    const mockBranch = "branch";
    const mockApi = GithubRepositoryApi();

    await getTreesByBranchFromRepo({
      owner: mockOwner,
      repo: mockRepo,
      branch: mockBranch,
      GithubRepositoryApi: mockApi,
    });
  });
});
