import { Toaster } from "sonner";
import { ExtensionProvider } from "./context/GithubRepository/providers/ExtensionProvider";
import { ExtensionForm } from "./context/GithubRepository/components/ExtensionForm/ExtensionForm";
import { ExtensionList } from "./context/GithubRepository/components/ExtensionList/ExtensionList";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <ExtensionProvider>
        <div className="container max-w-2xl mx-auto p-8">
          <h1 className="text-xl">GitHub extension counter</h1>
          <div className="flex flex-col gap-4 mt-8">
            <ExtensionForm />
            <ExtensionList />
          </div>
        </div>
      </ExtensionProvider>
    </>
  );
}

export default App;
