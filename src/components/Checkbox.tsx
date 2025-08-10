import React, {useId} from "react";

const accentColors = {
    amber: "accent-amber-500",
    red: "accent-red-500",
    blue: "accent-blue-500",
    green: "accent-green-500",
    purple: "accent-purple-500",
};

type Props = {
    name: string;
    label: string;
    color: "amber" | "red" | "blue" | "green" | "purple";
    value:boolean;
    onChange: any;
};

const Checkbox: React.FC<Props> = (props) => {
    const id = useId();
    return (
        <div className={"flex gap-3 hover:bg-stone-50"}>
            <input
                type="checkbox"
                name={props.name}
                id={id}
                className={`peer size-4 shrink-0 cursor-pointer mt-1 ${accentColors[props.color]}`}
                checked={props.value}
                onChange={props.onChange}
            />
            <label className={`cursor-pointer peer-checked:text-stone-400 peer-checked:line-through`} htmlFor={id}>
                {props.label}
            </label>
        </div>
    )
}

export default Checkbox;