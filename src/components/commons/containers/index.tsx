import { ContainerTypes } from "@/components/commons/containers/types";

export function Container({children, className, id}: ContainerTypes){
    return <div {...{className, id}}>{children}</div>
}