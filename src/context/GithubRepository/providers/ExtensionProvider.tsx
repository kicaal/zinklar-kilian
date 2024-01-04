import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";
import { getBranchesFromRepo } from "../../../modules/GithubRepository/application/getBranchesFromRepo";
import {
  Branch,
  Owner,
  Repo,
} from "../../../modules/GithubRepository/domain/GithubRepository";
import { GithubRepositoryApi } from "../../../modules/GithubRepository/infrastructure/GithubRepositoryApi";
import { GithubRepositoryBranchesFromDTO } from "../../../modules/GithubRepository/domain/GithubRepositoryBranches";
import { getTreesByBranchFromRepo } from "../../../modules/GithubRepository/application/getTreesByBranchFromRepo";
import { GithubRepositoryTreeFromDTO } from "../../../modules/GithubRepository/domain/GithubRepositoryTrees";

interface ExtensionContextProps {
  getBranchesFromByRepo: (owner: Owner, repo: Repo) => Promise<void>;
  getTreesByBranchRepo: (
    owner: Owner,
    repo: Repo,
    branchSelected: Branch
  ) => Promise<void>;
  branches: GithubRepositoryBranchesFromDTO[];
  trees: Trees[];
  setBranches: React.Dispatch<
    React.SetStateAction<GithubRepositoryBranchesFromDTO[]>
  >;
  setTrees: React.Dispatch<React.SetStateAction<Trees[]>>;
  isLoading: boolean;
}

const defaultValue: ExtensionContextProps = {
  getBranchesFromByRepo: async () => {},
  getTreesByBranchRepo: async () => {},
  setBranches: () => {},
  setTrees: () => {},
  branches: [],
  trees: [],
  isLoading: false,
};

export const ExtensionContext =
  createContext<ExtensionContextProps>(defaultValue);

export interface Trees {
  extension: string;
  count: number;
}

export const ExtensionProvider = ({ children }: { children: ReactNode }) => {
  const [branches, setBranches] = useState<GithubRepositoryBranchesFromDTO[]>(
    []
  );
  const [trees, setTrees] = useState<Trees[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBranchesFromByRepo = async (owner: Owner, repo: Repo) => {
    getBranchesFromRepo({
      owner,
      repo,
      GithubRepositoryApi: GithubRepositoryApi(),
    })
      .then((res) => {
        setBranches(res);
      })
      .catch((error: Error) => {
        toast.error(error.message);
        setBranches([]);
      });
  };

  const getTreesByBranchRepo = async (
    owner: Owner,
    repo: Repo,
    branchSelected: Branch
  ) => {
    setIsLoading(true);
    getTreesByBranchFromRepo({
      owner,
      repo,
      branch: branchSelected,
      GithubRepositoryApi: GithubRepositoryApi(),
    })
      .then((res) => {
        setTrees(processRepoData(res.tree));
      })
      .catch((error: Error) => {
        toast.error(error.message);
        setTrees([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const processRepoData = (tree: GithubRepositoryTreeFromDTO[]): Trees[] => {
    type AccType = {
      [key: string]: number;
    };

    const extensionCounts = tree.reduce((acc: AccType, item) => {
      if (item.type === "blob") {
        const extension = item.path.split(".").pop();
        if (extension) {
          acc[extension] = (acc[extension] ? acc[extension] : 0) + 1;
        }
      }
      return acc;
    }, {});

    return Object.entries(extensionCounts).map(([extension, count]) => {
      return { extension, count };
    });
  };

  return (
    <ExtensionContext.Provider
      value={{
        getBranchesFromByRepo,
        getTreesByBranchRepo,
        setBranches,
        setTrees,
        branches,
        trees,
        isLoading,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};
