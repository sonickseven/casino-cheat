import Button from "@/components/commons/buttons/button";
import { Container } from "@/components/commons/containers";
import { isEnabledCheat } from "@/helpers/cheatsFunctions/reviewCredits";
import Link from "next/link";
import { useState } from "react";



export default function ButtonCashOut() {

    const cheats = {
        moveButon: .5,
        blockButton: .4
    }

    const initialCheatButon = {
        hover: false,
        blocking: false
    }
    const [cheatButon, setCheatButton] = useState(initialCheatButon)

    return <Container
        onMouseEnter={() => {
            if (isEnabledCheat(cheats.moveButon)) {
                setCheatButton(old => ({ ...old, hover: true }))
                return
            }
            if (isEnabledCheat(cheats.blockButton)) {
                setCheatButton(old => ({ ...old, blocking: true }))
                return
            }
            setCheatButton(initialCheatButon)
        }} style={{
            marginTop: cheatButon.hover ? '300px' : 'auto',

        }} >
        <Link onClick={(evt)=>{
            if (isEnabledCheat(cheats.blockButton)) {
                evt.preventDefault()
                console.log('Blocked jejeje')
                return
            }
        }} href="/cash-out">
            <Button disabled={cheatButon.blocking} style={{ cursor: cheatButon.blocking ? 'not-allowed' : 'pointer' }} text="Cash out" />
        </Link>
    </Container>
}