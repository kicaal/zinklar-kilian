import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ExtensionList } from "../ExtensionList";
import { ExtensionProvider } from "../../../providers/ExtensionProvider";
import { useExtensionContext } from "../../../providers/ExtensionContext";

jest.mock("../../../providers/ExtensionContext");

describe("ExtensionList component", () => {
  it("Should order list when click buttons", async () => {
    useExtensionContext.mockReturnValue({
      trees: [
        { extension: "json", count: 1 },
        { extension: "js", count: 2 },
      ],
      isLoading: false,
    });

    const { getAllByTestId, getByText } = render(
      <ExtensionProvider>
        <ExtensionList />
      </ExtensionProvider>
    );

    expect(getAllByTestId("table-row")).toHaveLength(2);

    const buttonOrderByMajor = getByText("Ordenar de mayor a menor");
    const buttonOrderByMinor = getByText("Ordenar de menor a mayor");
    const buttonDefault = getByText("Dejar como estaba");

    fireEvent.click(buttonOrderByMajor);

    const extension = getAllByTestId("extension");

    expect(extension[0].textContent).toBe("js");

    fireEvent.click(buttonOrderByMinor);

    expect(extension[0].textContent).toBe("json");

    fireEvent.click(buttonOrderByMajor);
    fireEvent.click(buttonDefault);

    expect(extension[0].textContent).toBe("json");
  });
});
