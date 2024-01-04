import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ExtensionForm } from "../ExtensionForm";
import { ExtensionProvider } from "../../../providers/ExtensionProvider";
import { useExtensionContext } from "../../../providers/ExtensionContext";

jest.mock("../../../providers/ExtensionContext");

const mockSetBranches = jest.fn();
const mockSetTrees = jest.fn();

const mockGetBranchesFromByRepo = jest.fn();
const mockGetTreesByBranchRepo = jest.fn();

describe("ExtensionForm component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("ExtensionForm should call mockGetBranchesFromByRepo when inputs are filled", async () => {
    useExtensionContext.mockReturnValue({
      setBranches: mockSetBranches,
      setTrees: mockSetTrees,
      branches: [],
      getBranchesFromByRepo: mockGetBranchesFromByRepo,
      getTreesByBranchRepo: jest.fn(),
    });

    const { getByPlaceholderText } = render(
      <ExtensionProvider>
        <ExtensionForm />
      </ExtensionProvider>
    );

    const ownerInput = getByPlaceholderText("Owner");
    const repoInput = getByPlaceholderText("Repo");

    fireEvent.change(ownerInput, { target: { value: "testOwner" } });
    fireEvent.change(repoInput, { target: { value: "testRepo" } });

    expect(mockSetBranches).toHaveBeenCalled();
    expect(mockSetTrees).toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(mockGetBranchesFromByRepo).toHaveBeenCalled();
  });

  it("ExtensionForm load select when has branches and call mockGetTreesByBranchRepo when select one", async () => {
    useExtensionContext.mockReturnValue({
      branches: [{ name: "branch" }],
      getTreesByBranchRepo: mockGetTreesByBranchRepo,
    });

    const { getByRole } = render(
      <ExtensionProvider>
        <ExtensionForm />
      </ExtensionProvider>
    );

    const branchSelect = getByRole("combobox");
    expect(branchSelect).toBeInTheDocument();

    fireEvent.change(branchSelect, { target: { value: "branch" } });

    expect(mockGetTreesByBranchRepo).toHaveBeenCalled();
  });
});
