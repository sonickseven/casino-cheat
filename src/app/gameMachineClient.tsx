'use client'

import { fruits } from "@/store/fruits";
import { getRandomNumber } from '@/helpers/randomNumber/index'

import { initialrandomFruits, useAppContext } from "@/store/appContext/index";

import Button from "@/components/commons/buttons/button";
import { Container } from "@/components/commons/containers";
import { useEffect, useState } from "react";
import { initialStateTypes, userAccountEnum } from "@/store/appContext/types";
import FruitSlot from "@/components/especial/FruitSlot";
import Link from "next/link";

export function secuenceGetFruits(setRandomFruits: initialStateTypes['stateRandomFruits'][1]): Promise<void> {
    const timeResult = 500
    return new Promise(resol => {
        setTimeout(() => {
            let box = getRandomNumber(0, fruits.length - 1);
            setRandomFruits(old => [fruits[box], old[1], old[2]])
            setTimeout(() => {
                box = getRandomNumber(0, fruits.length - 1);
                setRandomFruits(old => [old[0], fruits[box], old[2]])
                setTimeout(() => {
                    box = getRandomNumber(0, fruits.length - 1);
                    setRandomFruits(old => [old[0], old[1], fruits[box],])
                    resol()
                }, timeResult)
            }, timeResult)
        }, timeResult)
    })
}

export default function GameMachineClient () {
    const { stateRandomFruits: [randomFruits, setRandomFruits], stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;
    const initialOptPage = {
        isLoading: false,
        status: 0,
        msg: '',
        err: false
    }
    const [optPage, setOptPage] = useState(initialOptPage)

    function leaveGame() {
        setUser(userAccountEnum)
        localStorage.clear()
    }
 
    useEffect(() => {

        if (!randomFruits[0].character) return
        if (randomFruits[0].character === randomFruits[1].character && randomFruits[1].character === randomFruits[2].character) {
            setUser(old => ({...old, score: old.score + randomFruits[0].score}))
        }
    }, [randomFruits])


    function runGame() {
        if(user.score===0){
            setUser(old=>({...old, isPlaying: false}))
            return
        }
        setOptPage(old => ({ ...old, isLoading: true }))
        setRandomFruits(initialrandomFruits)
        setUser(old => ({...old, score: old.score - 1}));
        setTimeout(async () => {

            await secuenceGetFruits(setRandomFruits)
            setOptPage(old => ({ ...old, isLoading: false }))

        }, 200)
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
    </Container>
}