import { DefaultInputTypes } from "@/components/commons/inputs/types";


export function DefaultInput(props: DefaultInputTypes) {
    return <div>
    <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">{props.label}</label>
    <input
      type={props.type || 'text'}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
        !!props.errMsg ? 'border-red-500' : ''
      }`}
    />
    {!!props.errMsg && (
      <p className="mt-1 text-sm text-red-600">{props.errMsg}</p>
    )}
  </div>
}