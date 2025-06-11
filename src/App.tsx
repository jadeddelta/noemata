import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import SidebarContainer from "./components/sidebar/SidebarContainer";
import Grid from "./components/grid/Grid";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <ReactFlowProvider>
        <SidebarContainer />
        <Grid />
      </ReactFlowProvider>
    </main>
  );
}

export default App;
