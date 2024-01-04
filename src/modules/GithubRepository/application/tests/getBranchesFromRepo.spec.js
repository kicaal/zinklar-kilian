import { getBranchesFromRepo } from "../getBranchesFromRepo";
import { GithubRepositoryApi } from "../../infrastructure/GithubRepositoryApi";

jest.mock("../../infrastructure/GithubRepositoryApi", () => {
  return {
    GithubRepositoryApi: jest.fn().mockImplementation(() => {
      return {
        getBranchesFromRepo: jest.fn(),
      };
    }),
  };
});

describe("getBranchesFromRepo", () => {
  it("should call getBranchesFromRepo with correct parameters", async () => {
    const mockOwner = "ownerName";
    const mockRepo = "repoName";
    const mockApi = GithubRepositoryApi();

    await getBranchesFromRepo({
      owner: mockOwner,
      repo: mockRepo,
      GithubRepositoryApi: mockApi,
    });

    expect(mockApi.getBranchesFromRepo).toHaveBeenCalledWith({
      owner: mockOwner,
      repo: mockRepo,
    });
  });
});
