export type ButtonsTypes = {
    text?: string;
    type?: 'button' | 'submit' | 'reset';
    id?: string;
    primary?: true;
    success?: true;
    disabled?: boolean
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onMouseMove?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
}