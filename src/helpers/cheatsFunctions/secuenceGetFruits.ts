import { initialStateTypes } from "@/store/appContext/types";

import { getRandomNumber } from '@/helpers/randomNumber/index'
import { fruits } from "@/store/lists/fruits";



export function secuenceGetFruits(
    setRandomFruits: initialStateTypes['stateRandomFruits'][1],
): Promise<void> {
    const timeResult = 1000
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