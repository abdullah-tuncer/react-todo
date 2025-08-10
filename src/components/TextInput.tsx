import React, {type FormEventHandler, type MouseEventHandler, useId} from "react";
import {Plus, X} from "lucide-react";

interface Props {
    label: string,
    inlineButton?: boolean,
    value: string,
    onButtonClick?: MouseEventHandler<HTMLButtonElement>,
    onInput: FormEventHandler<HTMLInputElement>,
    icon?: React.ReactNode,
    onClear?: () => void,
    name: string,
    buttonAriaLabel?: string,
    error?: string,
    required?: boolean
}

const inputClasses = "focus:border-2 focus:border-sky-600 border-2 text-sky-600 p-2 rounded-lg outline-0 box-border w-full";
const buttonClasses = "absolute right-0 -translate-y-1/2 top-1/2 border-l border-sky-600 px-2 h-full text-lg focus:outline-sky-600 focus:outline focus:rounded-r-lg focus:border-0 hover:cursor-pointer focus:bg-sky-200 active:bg-sky-100 text-sky-600";
const clearClasses = "absolute right-10 -translate-y-1/2 top-1/2 border-sky-600 px-1 h-full text-lg focus:outline-sky-600 focus:outline hover:cursor-pointer text-sky-600";

const TextInput: React.FC<Props> = (props) => {
    const inputId = useId();
    const descId = useId();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && props.onButtonClick)
            props.onButtonClick(e as any);
    }

    const paddingRight = () => {
        if (props.onClear && props.inlineButton)
            return "pr-[4rem]";
        else if (props.onClear || props.inlineButton)
            return "pr-11";
        return "";
    }

    return (
        <div className="flex flex-col ]:">
            <label htmlFor={inputId} className="text-sky-600">
                {props.label + (props.required ? " *" : "")}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    value={props.value}
                    onInput={props.onInput}
                    onKeyDown={handleKeyDown}
                    className={inputClasses + ` ${paddingRight()} ${props.error ? "border-red-600 bg-red-100" : "border-transparent bg-sky-100"}`}
                    aria-describedby={props.error ? descId : undefined}
                    aria-invalid={!!props.error}
                    name={props.name}
                    type="text"
                />
                {props.onClear && (
                    <button
                        className={clearClasses}
                        type={"button"}
                        onClick={props.onClear}
                        aria-label="Temizle butonu"
                    >
                        <X size={16}/>
                    </button>
                )}
                {props.inlineButton && (
                    <button
                        className={buttonClasses}
                        type={"button"}
                        onClick={props.onButtonClick}
                        aria-label={props.buttonAriaLabel}
                    >
                        {props.icon || <Plus size={24}/>}
                    </button>
                )}
            </div>
            <small id={descId} className={`text-red-500 ${props.error ? "visible" : "invisible"}`}>
                {props.error}
            </small>
        </div>
    )
}

export default TextInput;