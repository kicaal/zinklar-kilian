import { useExtensionForm } from "./hooks/useExtensionForm";

export const ExtensionForm = () => {
  const {
    branches,
    owner,
    repo,
    branchSelected,
    setBranches,
    setTrees,
    setOwner,
    setRepo,
    setBranchSelected,
  } = useExtensionForm();

  return (
    <div className="flex flex-col gap-4">
      <input
        className="rounded-md p-2"
        placeholder="Owner"
        value={owner}
        onChange={(e) => {
          setOwner(e.target.value);
          setBranches([]);
          setTrees([]);
          setBranchSelected(undefined);
        }}
      />
      <input
        className="rounded-md p-2"
        placeholder="Repo"
        value={repo}
        onChange={(e) => {
          setRepo(e.target.value);
          setBranches([]);
          setTrees([]);
          setBranchSelected(undefined);
        }}
      />
      {branches.length > 0 && (
        <select
          data-testid="branch-select"
          className="rounded-md p-2"
          value={branchSelected}
          onChange={(e) => setBranchSelected(e.target.value)}
        >
          <option value={undefined}>Selecciona una rama</option>
          {branches.map((branch, index) => {
            return (
              <option key={index} value={branch.name}>
                {branch.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};
