import React, {useId} from "react";

interface Props {
    items: Array<{ value: any, title: string }>,
    label: string,
    value: any,
    required: boolean,
    name: string,
    onInput: any,
    error?: string,
}

const selectClasses = "focus:border-2 focus:border-sky-600 border-2 text-sky-600 p-2 rounded-lg outline-0 box-border cursor-pointer";

const SelectInput: React.FC<Props> = (props) => {
    const inputId = useId();
    const descId = useId();

    return (
        <div className={"flex flex-col"}>
            <label htmlFor={inputId} className="text-sky-600">
                {props.label + (props.required ? " *" : "")}
            </label>
            <select
                id={inputId}
                value={props.value}
                onInput={props.onInput}
                className={selectClasses + ` ${props.error ? "border-red-600 bg-red-100" : "border-transparent bg-sky-100"}`}
                aria-describedby={descId}
                aria-invalid={!!props.error}
                name={props.name}
            >
                <option value="" className={"bg-white"} disabled>Seçiniz</option>
                {props.items.map((val, index) =>
                    (<option value={val.value} key={index} className="bg-white">{val.title}</option>))}
            </select>
            <small id={descId} className={`text-red-500 ${props.error ? "visible" : "invisible"}`}>
                {props.error}
            </small>
        </div>
    )
}

export default SelectInput;