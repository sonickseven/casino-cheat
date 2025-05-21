'use client'

import { ReactElement } from "react"
import { Container } from "@/components/commons/containers/index"
import Button from "../commons/buttons/button"
import { useAppContext } from "@/store/appContext";
import { initialStateTypes } from "@/store/appContext/types";

export default function GameOver(): ReactElement {

    const { stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;

    function playAgain() {
        const credits= 10
        setUser(old => ({ ...old, isPlaying: true, score: credits }))
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('userName', user.name)
                window.localStorage.setItem('score', String(credits))
            }
        } catch {
            console.error('Error accessing localStorage:');
        }
    }


    if (!user.name) return <></>
    if (user.isPlaying) return <></>

    return <Container className="fixed gap-5 top-[15px] left-[15px] right-[15px] bottom-[15px] bg-gray-950 text-gray-50 flex flex-col items-center justify-center border-2 border-gray-900 rounded-md">
        <h2 className="mb-10 text-[2.5rem]">🙈🙉🙈🙉🙊</h2>
        <h2 className="mb-10 text-[2.5rem]">Game over</h2>
        <Button text="Play again" success onClick={playAgain} />
    </Container>
}