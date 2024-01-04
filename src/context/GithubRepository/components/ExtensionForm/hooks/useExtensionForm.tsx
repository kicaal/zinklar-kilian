import { useEffect, useState } from "react";
import {
  Branch,
  Owner,
  Repo,
} from "../../../../../modules/GithubRepository/domain/GithubRepository";
import { useExtensionContext } from "../../../providers/ExtensionContext";

export const useExtensionForm = () => {
  const {
    setBranches,
    setTrees,
    branches,
    getBranchesFromByRepo,
    getTreesByBranchRepo,
  } = useExtensionContext();

  const [owner, setOwner] = useState<Owner>("");
  const [repo, setRepo] = useState<Repo>("");
  const [branchSelected, setBranchSelected] = useState<Branch | undefined>(
    undefined
  );

  useEffect(() => {
    if (owner && repo) {
      const timeoutId = setTimeout(async () => {
        await getBranchesFromByRepo(owner, repo);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [owner, repo]);

  useEffect(() => {
    branchSelected && getTreesByBranchRepo(owner, repo, branchSelected);
  }, [branchSelected]);

  return {
    branches,
    owner,
    repo,
    branchSelected,
    setBranches,
    setTrees,
    setOwner,
    setRepo,
    setBranchSelected,
  };
};
