import React, {useEffect, useRef, useState} from "react";
import JobCard from "../components/JobCard.tsx";
import TextInput from "../components/TextInput.tsx";
import {Plus, SearchIcon} from "lucide-react";
import Job, {type IJob} from "../types/Job.ts";
import JobFormDialog from "../components/JobFormDialog.tsx";
import DeleteDialog from "../components/DeleteDialog.tsx";
import JobService from "../services/JobService.ts";

const dialogBtnClasses = "py-1 px-2 bg-sky-200 border-2 border-sky-500 text-sky-600 focus:outline-offset-2 focus:outline-2 focus:outline-sky-500 cursor-pointer hover:bg-sky-100 focus:bg-sky-100 flex items-center gap-2";

const Home: React.FC = () => {
    const [search, setSearch] = useState("");
    const jobItems = useRef<Array<IJob>>([]);
    const [filteredItems, setFilteredItems] = useState<Array<IJob>>([]);
    // Edit Dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editData, setEditData] = useState<IJob>();
    // Delete Dialog
    const [deleteDialogOpen, setDeleteDataOpen] = useState(false);
    const [deleteData, setDeleteData] = useState<IJob>();

    const load = async () => {
        jobItems.current = await JobService.getSortedJobs();
        setFilteredItems(jobItems.current);
    }

    useEffect(() => {
        load();
    }, [])

    const filterTasks = () => {
        const newFilteredItems = jobItems.current.filter((job: IJob) => {
            const lowerKeyword = search.toLowerCase();
            if (job.title.toLowerCase().includes(lowerKeyword))
                return true;

            return job.tasks.some((task: any) =>
                task.name.toLowerCase().includes(lowerKeyword)
            ) ?? false;
        })
        setFilteredItems(newFilteredItems);
    }

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        setSearch(e.target.value ?? "");
    }

    const clearSearch = () => {
        setSearch("");
        setFilteredItems(jobItems.current);
    }

    const handleSuccess = async (data: IJob) => {
        if (data.id)
            await JobService.updateJob(data.id, data);
        else
            await JobService.addJob(data);
        setDialogOpen(false);
        await load();
    };

    const handleDeleteData = async (data: IJob) => {
        await JobService.deleteJob(data.id as number);
        setDeleteDataOpen(false);
        await load();
    };

    return (
        <>
            <div className={"flex justify-between px-4 flex-col sm:flex-row sm:items-end gap-2"}>
                <TextInput
                    label="Görev Ara"
                    value={search}
                    onInput={handleSearch}
                    inlineButton
                    onButtonClick={filterTasks}
                    icon={<SearchIcon size={24}/>}
                    onClear={clearSearch}
                    name="search"
                />
                <button
                    className={dialogBtnClasses + " rounded-sm"}
                    onClick={() => {
                        setEditData(new Job());
                        setDialogOpen(true);
                    }}
                    type={"button"}
                >
                    <Plus size={24}/> Liste Oluştur
                </button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-4 gap-6 items-start">
                {filteredItems.map(v => (
                    <JobCard
                        key={v.id}
                        job={v}
                        onClickEdit={() => {
                            setEditData(v);
                            setDialogOpen(true);
                        }}
                        onClickDelete={() => {
                            setDeleteData(v);
                            setDeleteDataOpen(true);
                        }}
                        onLoad={load}
                    />
                ))}
            </div>
            <JobFormDialog
                open={dialogOpen}
                onSuccess={handleSuccess}
                onClose={() => setDialogOpen(false)}
                initialData={editData as IJob}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                onSuccess={() => handleDeleteData(deleteData as IJob)}
                onClose={() => setDeleteDataOpen(false)}
                initialData={deleteData as IJob}
            />
        </>
    )
}

export default Home;