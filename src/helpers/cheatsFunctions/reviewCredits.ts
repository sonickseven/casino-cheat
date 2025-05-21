import { Dispatch, SetStateAction } from "react";
import { rerollChanceEnum } from "@/helpers/cheatsFunctions/types";

export function reviewToCheat(score: number,
    setRerollChande: Dispatch<SetStateAction<typeof rerollChanceEnum>>
) {
    if (score <= 40) return
    setRerollChande(old => ({ ...old, value: 0 }))

    if (score >= 40 && score <= 60) {
        setRerollChande(old => ({ ...old, value: 0.3 })); // 30% chance to reroll
    } else if (score > 60) {
        setRerollChande(old => ({ ...old, value: 0.6 })); // 60% chance to reroll
    }
}

export function triggerRerollChance(rerollChance: typeof rerollChanceEnum) {
    const randomNumber = Math.random();
    if (randomNumber < rerollChance.value) {
        return true
    }
    return false
}
