import { InputSelectTypes } from "@/components/commons/inputs/types";

export default function InputSelect(props: InputSelectTypes){
    return <div>
    <label htmlFor="bank" className="block text-sm font-medium opacity-50">
        {props.label}
    </label>
    <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${!!props.errMsg ? 'border-red-500' : ''
            }`}
    >
        {props.options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
    {!!props.errMsg && (
        <p className="mt-1 text-sm text-red-600">{props.errMsg}</p>
    )}
</div>
}