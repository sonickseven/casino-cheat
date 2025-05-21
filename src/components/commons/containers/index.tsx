import { ContainerTypes } from "@/components/commons/containers/types";

export function Container({children, className, id, style, onMouseOver, onMouseEnter}: ContainerTypes){
    return <div {...{className, id, style, onMouseOver, onMouseEnter}}>{children}</div>
}