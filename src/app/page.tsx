import { Container } from "@/components/commons/containers";
import GameMachineClient from "@/app/gameMachineClient";
import StartSession from "@/components/startSession";
import GameOver from "@/components/endGame";

export default function Home() {
  
  return (
    <div>
      <Container className="max-w-[800px] mx-auto">
        <h1 className="text-[2rem] text-center mb-[20px]">Casino game</h1>
        <StartSession/>
        <GameOver/>
        <GameMachineClient/>
      </Container>
    </div>
  );
}
