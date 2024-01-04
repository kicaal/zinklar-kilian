import { useExtensionList } from "./hooks/useExtensionList";

export const ExtensionList = () => {
  const { orderedTrees, handleOrderByQuantity, isLoading } = useExtensionList();

  if (isLoading) return <p>Cargando extensiones...</p>;

  if (!orderedTrees.length) return;

  return (
    <>
      <div className="flex gap-2">
        <button
          className="rounded-md p-2 bg-[#3B3B3B]"
          onClick={() => handleOrderByQuantity(0)}
        >
          Ordenar de menor a mayor
        </button>
        <button
          className="rounded-md p-2 bg-[#3B3B3B]"
          onClick={() => handleOrderByQuantity(1)}
        >
          Ordenar de mayor a menor
        </button>
        <button
          className="rounded-md p-2 bg-[#3B3B3B]"
          onClick={() => handleOrderByQuantity(2)}
        >
          Dejar como estaba
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Extensiones</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          {orderedTrees.map((tree, index) => {
            return (
              <tr data-testid="table-row" key={index}>
                <td data-testid="extension">{tree.extension}</td>
                <td data-testid="count">{tree.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
