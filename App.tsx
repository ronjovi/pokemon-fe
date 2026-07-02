import { StatusBar } from "expo-status-bar";
import Pokedex from "./src/components/Pokedex";

export default function App() {
  return (
    <>
      <Pokedex />
      <StatusBar style="light" />
    </>
  );
}
