import React from "react";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Input from "./components/Input";
import useVouch from "../../package"

export default function App() {
  const KarmaVouch = useVouch("0x295FaF0D270De6d5e9ACDFe287B6844D2335590B")

  return (
    <div>
      <Navbar />
      <Title />
      <Input />
      <KarmaVouch.VouchButton />
      <KarmaVouch.JoinDAO />
      <KarmaVouch.ExitDAO />
    </div>
  );
}
