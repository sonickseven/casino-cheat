export type DefaultInputTypes = {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errMsg?: string;
    placeholder?: string;
    label?: string;
    type?: string;
    name?: string;
    id?: string;
    readOnly?: boolean;
}

export type InputSelectTypes = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    errMsg?: string;
    options: Array<{ label: string; value: string }>;
    id?: string;
    name?: string;
    label?: string;
}
