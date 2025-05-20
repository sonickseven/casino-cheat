'use client'

import { FormEvent, ReactElement, useEffect, useState } from "react"
import { Container } from "@/components/commons/containers/index"
import { useAppContext } from "@/store/appContext";
import { initialStateTypes } from "@/store/appContext/types";
import Button from "../commons/buttons/button";

export default function StartSession(): ReactElement {

    const { stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;

    const [userLocal, setUserLocal] = useState('')

    const [flag, setFlag] = useState(false)

    function saveUser(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault()

        setUser({
            name: userLocal,
            score: 10,
            isPlaying: true
        })


        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('userName', userLocal)
                window.localStorage.setItem('score', '10')
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
    if(user.name)  return <></>

    return <Container className="fixed top-[15px] left-[15px] right-[15px] bottom-[15px] bg-gray-950 flex flex-col items-center justify-center border-2 border-gray-900 rounded-md">
        <h2 className="mb-10 text-[1.5rem]">Start Session</h2>
        <form onSubmit={saveUser}>
            <div className="flex flex-col gap-4">
                <label htmlFor="name">Name</label>
                <input required value={userLocal} onChange={evt => setUserLocal(evt.target.value)} type="text" id="name" className="border-2 border-gray-300 rounded-md p-2" />
                <Button type="submit" text="Start" disabled={!userLocal} />

            </div>
        </form>
    </Container>
}