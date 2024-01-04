import { useEffect, useState } from "react";
import { Trees } from "../../../providers/ExtensionProvider";
import { useExtensionContext } from "../../../providers/ExtensionContext";

export const useExtensionList = () => {
  const { trees, isLoading } = useExtensionContext();

  const [orderedTrees, setOrderedTrees] = useState<Trees[]>(trees);

  useEffect(() => {
    setOrderedTrees([...trees]);
  }, [trees]);

  const handleOrderByQuantity = (mostQuantity = 0) => {
    if (mostQuantity === 0 || mostQuantity === 1) {
      const sortedTrees = [...orderedTrees];

      sortedTrees.sort((a, b) =>
        mostQuantity === 0 ? a.count - b.count : b.count - a.count
      );
      setOrderedTrees(sortedTrees);
    }

    if (mostQuantity === 2) {
      setOrderedTrees([...trees]);
    }
  };

  return {
    orderedTrees,
    handleOrderByQuantity,
    isLoading,
  };
};
