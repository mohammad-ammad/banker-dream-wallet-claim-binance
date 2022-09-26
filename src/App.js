import Landing from "./components/Landing";
import { InstanceProvider } from "./Context/InstanceContext";

function App() {
  return (
    <>
    <InstanceProvider>
      <Landing/>
    </InstanceProvider>
    </>
  );
}

export default App;
