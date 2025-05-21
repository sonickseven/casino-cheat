'use client'

import { initialrandomFruits, useAppContext } from "@/store/appContext/index";

import Button from "@/components/commons/buttons/button";
import { Container } from "@/components/commons/containers";
import { useEffect, useState } from "react";
import { initialStateTypes, userAccountEnum } from "@/store/appContext/types";
import FruitSlot from "@/components/especial/FruitSlot";
import { initialOptPageEnum } from "@/store/lists/optPage";
import { rerollChanceEnum } from "@/helpers/cheatsFunctions/types";
import { isEnabledCheat, reviewToCheat } from "@/helpers/cheatsFunctions/reviewCredits";
import { secuenceGetFruits } from "@/helpers/cheatsFunctions/secuenceGetFruits";
import ButtonCashOut from "@/components/especial/buttonCashOut";
import { sendGameTrack } from "@/app/requests";

import AudioApi from "@/helpers/audio/index";

export default function GameMachineClient() {

    const audioApi = AudioApi.getInstance('/sounds/slot-machine.mp3', true)


    const { stateRandomFruits: [randomFruits, setRandomFruits], stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;

    const [optPage, setOptPage] = useState(initialOptPageEnum)
    const [rerollChance, setRerollChance] = useState(rerollChanceEnum);

    function leaveGame() {
        setUser(userAccountEnum)
        localStorage.clear()
    }

    useEffect(() => {
        if (!randomFruits[0].character) return

        if (randomFruits[0].character === randomFruits[1].character && randomFruits[1].character === randomFruits[2].character) {

            const againRoll = isEnabledCheat(rerollChance.value)

            if (!againRoll) {
                setRerollChance(old => ({ ...old, again: false }))
                setUser(old => ({ ...old, score: old.score + randomFruits[0].score }))
                return
            }
            setRerollChance(old => ({ ...old, again: true }))
            runGame(true).catch(console.error)
        }
    }, [randomFruits])


    async function runGame(automatic = false) {
        if (user.score === 0) {
            setUser(old => ({ ...old, isPlaying: false }))
            return
        }
        await sendGameTrack(user)
        setOptPage(old => ({ ...old, isLoading: true }))
        setRandomFruits(initialrandomFruits)
        
        if (automatic) {
            setUser(old => ({ ...old, score: old.score - 1 }));
        }
        
        
        audioApi?.play()
        await secuenceGetFruits(setRandomFruits)
        reviewToCheat(user.score, setRerollChance)
        setOptPage(old => ({ ...old, isLoading: false }))

    }
    return <Container className="flex flex-col gap-8 w-[95%] mx-auto">
        <Container className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] font-bold">Welcome to the game {user.name}</h2>
            <h3 className="text-[1.2rem]">Credits: {user.score}</h3>
        </Container>
        <Container className="flex flex-row gap-4">
            <Container id="box-1" className="border-1 border-solid rounded-md border-white text-[5rem] w-[33%] text-center py-2 px-2 cursor-not-allowed">
                {randomFruits[0].character
                    ? randomFruits[0].character
                    : optPage.isLoading ? <FruitSlot isSpinning={optPage.isLoading ? true : false} interval={100} /> :
                        '❓'}
            </Container>
            <Container id="box-2" className="border-1 border-solid rounded-md border-white text-[5rem] w-[33%] text-center py-2 px-2 cursor-not-allowed">
                {randomFruits[1].character
                    ? randomFruits[1].character
                    : optPage.isLoading ? <FruitSlot isSpinning={optPage.isLoading ? true : false} interval={100} /> :
                        '❓'}
            </Container>
            <Container id="box-3" className="border-1 border-solid rounded-md border-white text-[5rem] w-[33%] text-center py-2 px-2 cursor-not-allowed">
                {randomFruits[2].character
                    ? randomFruits[2].character
                    : optPage.isLoading ? <FruitSlot isSpinning={optPage.isLoading ? true : false} interval={100} /> :
                        '❓'}
            </Container>
        </Container>
        <Button success disabled={optPage.isLoading ? true : false} onClick={runGame} text={optPage.isLoading ? 'Playing...' : "Play"} />
        <Button primary onClick={leaveGame} text="Leave" />
        {user.score > 10 ?
            <ButtonCashOut/>
            : null}
    </Container>
}