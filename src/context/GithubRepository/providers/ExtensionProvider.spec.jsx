import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { ExtensionProvider } from "./ExtensionProvider";
import { ExtensionForm } from "../components/ExtensionForm/ExtensionForm";

import { getBranchesFromRepo } from "../../../modules/GithubRepository/application/getBranchesFromRepo";

jest.mock("../../../modules/GithubRepository/application/getBranchesFromRepo");
jest.mock(
  "../../../modules/GithubRepository/application/getTreesByBranchFromRepo"
);

describe("ExtensionProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    getBranchesFromRepo.mockResolvedValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  it("Should call getBranchesFromRepo", async () => {
    const { getByPlaceholderText } = render(
      <ExtensionProvider>
        <ExtensionForm />
      </ExtensionProvider>
    );

    const ownerInput = getByPlaceholderText("Owner");
    const repoInput = getByPlaceholderText("Repo");

    act(() => {
      fireEvent.change(ownerInput, { target: { value: "testOwner" } });
      fireEvent.change(repoInput, { target: { value: "testRepo" } });
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(getBranchesFromRepo).toHaveBeenCalled();
    });
  });

  it("Should call getBranchesFromRepo with error", async () => {
    const { getByPlaceholderText } = render(
      <ExtensionProvider>
        <ExtensionForm />
      </ExtensionProvider>
    );

    getBranchesFromRepo.mockRejectedValue(new Error("Error 404"));

    const ownerInput = getByPlaceholderText("Owner");
    const repoInput = getByPlaceholderText("Repo");

    act(() => {
      fireEvent.change(ownerInput, { target: { value: "testOwner" } });
      fireEvent.change(repoInput, { target: { value: "testRepo" } });
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(getBranchesFromRepo).toHaveBeenCalled();
    });
  });
});
