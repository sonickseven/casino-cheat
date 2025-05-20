import { fruits } from "@/store/fruits/index";
import { Dispatch, SetStateAction } from "react";

export const emptyFruitEnum: typeof fruits[0] = {
    character: '',
    score: 0
}

export const userAccountEnum = {
    name: '',
    score: 0,
    isPlaying: false
}

export type initialStateTypes = {
    stateRandomFruits: [typeof emptyFruitEnum[], Dispatch<SetStateAction<typeof emptyFruitEnum[]>>],
    stateUserAccount: [typeof userAccountEnum, Dispatch<SetStateAction<typeof userAccountEnum>>],
}