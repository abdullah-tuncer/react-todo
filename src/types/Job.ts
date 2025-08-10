export interface IJob {
    id?: number,
    title: string,
    color: JobColor,
    tasks: Array<ITask>,
    fav: boolean
}

type JobColor = "amber" | "red" | "blue" | "green" | "purple";

export interface ITask {
    name: string,
    isComplate: boolean
}

export default class Job implements IJob {
    title = "";
    color: JobColor = "blue";
    tasks: Array<ITask> = [];
    fav = false;
}