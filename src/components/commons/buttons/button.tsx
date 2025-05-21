import { ButtonsTypes } from "@/components/commons/buttons/types";

export default function Button({ style, text, disabled, type, onClick, primary, success }: ButtonsTypes) {
    if (primary)
        return <button {...{style, disabled, onClick, type }} className={`w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-5 py-2 bg-blue-500 cursor-pointer font-bold rounded-md `}>{text}</button>
    if (success)
        return <button {...{style, disabled, onClick, type }} className={`w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-5 py-2 bg-green-500 cursor-pointer font-bold rounded-md `}>{text}</button>
    return <button {...{ style, disabled, onClick, type }} className={`w-full hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-5 py-2 bg-transparent cursor-pointer font-bold rounded-md border-1 border-gray-500`}>{text}</button>
}