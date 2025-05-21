'use client'

import { FormEvent, ReactElement, useEffect, useState } from "react"
import { Container } from "@/components/commons/containers/index"
import { useAppContext } from "@/store/appContext";
import { initialStateTypes, userAccountEnum } from "@/store/appContext/types";
import Button from "@/components/commons/buttons/button";
import { DefaultInput } from "../commons/inputs";

export default function StartSession(): ReactElement {

    const { stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;

    const [userLocal, setUserLocal] = useState('')

    const [flag, setFlag] = useState(false)

    function saveUser(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault()

        setUser({
            name: userLocal,
            score: userAccountEnum.score,
            isPlaying: true
        })

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('userName', userLocal)
                window.localStorage.setItem('score', String(userAccountEnum.score))
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }

    }

    useEffect(() => {
        if (flag) return
        setFlag(true)
        // Check if localStorage is available and if the userName key exists
        try {
            if (typeof window !== 'undefined' && window.localStorage.getItem('userName')) {
                setUser({
                    name: window.localStorage.getItem('userName') || '',
                    score: Number(window.localStorage.getItem('score') || '0'),
                    isPlaying: true
                })
            }

        } catch (error) {
            console.error('Error accessing localStorage:', error);

        }
    }, [])
    if (user.name) return <></>

    return <Container className="fixed top-0 left-0 right-0 bottom-0 bg-gray-950 text-gray-50 flex flex-col items-center justify-center border-2 border-gray-900 rounded-md">
        <h2 className="mb-10 text-[1.5rem]">Start Session</h2>
        <form onSubmit={saveUser} className="w-[95%] max-w-[400px] flex flex-col gap-4">
            <DefaultInput
                type="text"
                id="name"
                label="Name"
                placeholder="Enter your name"
                value={userLocal}
                onChange={evt => setUserLocal(evt.target.value)}
                required
            />
            <Button type="submit" primary text="Start" disabled={!userLocal} />
        </form>
    </Container>
}