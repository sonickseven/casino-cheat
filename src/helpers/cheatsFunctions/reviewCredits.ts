import { Dispatch, SetStateAction } from "react";
import { rerollChanceEnum } from "@/helpers/cheatsFunctions/types";

export function reviewToCheat(score: number,
    setRerollChande: Dispatch<SetStateAction<typeof rerollChanceEnum>>
) {
    if (score <= 40) return
    setRerollChande(old => ({ ...old, value: 0 }))

    if (score >= 40 && score <= 60) {
        setRerollChande(old => ({ ...old, value: .3 })); // 30% chance to reroll
    } else if (score > 60) {
        setRerollChande(old => ({ ...old, value: .6 })); // 60% chance to reroll
    }
}

export function isEnabledCheat(percent: number) {
    const randomNumber = Math.random();
    if (randomNumber < percent) {
        return true
    }
    return false
}