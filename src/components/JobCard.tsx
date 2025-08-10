import Checkbox from "./Checkbox";
import React, {useState} from "react";
import {ChevronDown, Pencil, Star, StarOff, Trash2} from "lucide-react";
import type {IJob} from "../types/Job.ts";
import JobService from "../services/JobService.ts";

const bgColors = {
    amber: "bg-amber-200",
    red: "bg-red-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    purple: "bg-purple-200",
};

const textColors = {
    amber: "text-amber-600",
    red: "text-red-600",
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
};

const borderColors = {
    amber: "border-amber-500",
    red: "border-red-500",
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
};

type Props = {
    job: IJob,
    onLoad: any,
    onClickEdit: any,
    onClickDelete: any
}

const JobCard: React.FC<Props> = (props) => {
    const [openDetails, setOpenDetails] = useState(false);

    const onClickFavBtn = async () => {
        await JobService.updateJob(props.job.id as number, {fav: !props.job.fav})
        props.onLoad();
    }

    const onComplateChange = async (e: any, index: number) => {
        const tasks = [...props.job.tasks];
        tasks[index].isComplate = e.target.checked;
        await JobService.updateJob(props.job.id as number, {tasks})
        props.onLoad();
    }

    const widthPercent = (props.job.tasks.filter(v => v.isComplate).length / props.job.tasks.length) * 100;


    return (
        <section
            className={`flex flex-col gap-2 p-2 box-border border-3 hover:shadow-xl rounded-2xl shadow-md ${bgColors[props.job.color]} ${textColors[props.job.color]} ${borderColors[props.job.color]}`}
        >
            <div className={"group text-xl font-bold bg-white rounded-t-xl p-2 relative overflow-hidden"}>
                <h2 className="flex items-center gap-2">
                    {props.job.fav && (<Star className="text-amber-500" size={20}/>)}
                    {props.job.title}
                    <label className="pointer-coarse:block hidden ml-auto cursor-pointer">
                        <input
                            checked={openDetails}
                            onChange={() => setOpenDetails(!openDetails)}
                            type="checkbox"
                            aria-label="Seçenekleri göster/gösterme"
                            className="sr-only peer"
                        />
                        <ChevronDown
                            className={`peer-focus:border peer-focus:rounded transition-transform duration-300 ${openDetails && "rotate-180"}`}
                            size={20}
                        />
                    </label>
                </h2>
                <div
                    role="progressbar"
                    className={"absolute bottom-0 w-full h-1.5 bg-stone-200 left-0 overflow-hidden"}
                >
                    <span
                        style={{width: `${widthPercent}%`}}
                        className={`absolute h-full border ${bgColors[props.job.color]} ${borderColors[props.job.color]} transition-all duration-300`}/>
                </div>
                <div
                    className={`flex border border-stone-300 rounded-2xl overflow-hidden max-h-0 opacity-0 transition-[max-height,opacity,margin] duration-300 group-hover:max-h-20 group-hover:my-2 group-hover:opacity-100 ${openDetails && "my-2 max-h-20 opacity-100"}`}>
                    <button
                        className="grow flex justify-center p-1 cursor-pointer hover:bg-stone-100 active:bg-stone-200 rounded-l-2xl"
                        onClick={props.onClickDelete}
                    >
                        <Trash2 className="text-red-500" size={24}/>
                    </button>
                    <button
                        className="grow border-x border-x-stone-300 flex justify-center p-1 cursor-pointer hover:bg-stone-100 active:bg-stone-200"
                        aria-label={props.job.fav ? "Favorilerden çıkar" : "Favorilere ekle"}
                        onClick={onClickFavBtn}
                    >
                        {props.job.fav ?
                            (<Star className="text-amber-500" size={24}/>) :
                            (<StarOff color="grey" size={24}/>)}
                    </button>
                    <button
                        className="grow rounded-r-2xl flex justify-center p-1 cursor-pointer hover:bg-stone-100 active:bg-stone-200"
                        onClick={props.onClickEdit}
                    >
                        <Pencil className="text-sky-500" size={24}/>
                    </button>
                </div>
            </div>
            <section className={"rounded-xl bg-white p-2 grow flex flex-col gap-2"}>
                {props.job.tasks.map((v, index) => (
                    <Checkbox
                        value={v.isComplate}
                        onChange={(e:any) => onComplateChange(e, index)}
                        color={props.job.color}
                        label={v.name}
                        key={index}
                        name=""
                    />
                ))}
            </section>
        </section>
    )
}

export default JobCard;