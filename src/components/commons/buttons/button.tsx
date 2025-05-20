import { ButtonsTypes } from "@/components/commons/buttons/types";

export default function Button({ text, disabled, type, onClick, primary, success }: ButtonsTypes) {
    if (primary)
        return <button {...{ disabled, onClick, type }} className={` px-5 py-2 bg-blue-500 cursor-pointer font-bold rounded-md `}>{text}</button>
    if (success)
        return <button {...{ disabled, onClick, type }} className={` px-5 py-2 bg-green-500 cursor-pointer font-bold rounded-md `}>{text}</button>
    return <button {...{ disabled, onClick, type }} className={` px-5 py-2 bg-transparent cursor-pointer font-bold rounded-md border-1 border-gray-500`}>{text}</button>
}