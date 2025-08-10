import {type FC, useEffect, useRef, useState} from "react";
import Job, {type IJob, type ITask} from "../types/Job.ts";
import TextInput from "./TextInput.tsx";
import SelectInput from "./SelectInput.tsx";
import {X} from "lucide-react";

const colorItems = [
    {value: "amber", title: "Amber"},
    {value: "red", title: "Kırmızı"},
    {value: "blue", title: "Mavi"},
    {value: "green", title: "Yeşil"},
    {value: "purple", title: "Mor"}
];

const vazgecBtnClasses = "py-1 px-2 rounded-sm bg-red-200 border-2 border-red-500 text-red-600 focus:outline-offset-2 focus:outline-2 focus:outline-red-500 cursor-pointer hover:bg-red-100 focus:bg-red-100";
const kaydetBtnClasses = "py-1 px-2 rounded-sm bg-green-200 border-2 border-green-500 text-green-600 focus:outline-offset-2 focus:outline-2 focus:outline-green-500 cursor-pointer hover:bg-green-100 focus:bg-green-100";

interface Props {
    open: boolean,
    onSuccess: any,
    onClose: any,
    initialData: IJob
}

interface IErrors {
    title?: string,
    color?: string,
    tasks?: string,
}

const JobFormDialog: FC<Props> = (props) => {
    const isEditMode = Boolean(props.initialData?.id);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const firstInputRef = useRef(null);
    const [newTask, setNewTask] = useState("");

    const [formData, setFormData] = useState<IJob>({
        id: props.initialData?.id || undefined,
        title: props.initialData?.title || "",
        color: props.initialData?.color || "",
        tasks: props.initialData?.tasks || [],
        fav: props.initialData?.fav || false
    });

    const [errors, setErrors] = useState<IErrors>({});

    useEffect(() => {
        if (props.open && dialogRef.current) {
            if (!dialogRef.current.open) {
                dialogRef.current.showModal();
            }
            setFormData({
                id: props.initialData?.id || undefined,
                title: props.initialData?.title || "",
                color: props.initialData?.color || "",
                tasks: props.initialData?.tasks || [],
                fav: props.initialData?.fav || false
            });
            setErrors({});
            // @ts-ignore
            firstInputRef.current?.focus();
        } else if (!props.open && dialogRef.current?.open) {
            setNewTask("");
            dialogRef.current.close();
        }
    }, [props.open, props.initialData]);

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
            }
        };
        if (props.open) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [props.open]);

    const validate = () => {
        const newErrors: IErrors = {};
        if (!formData.title.trim())
            newErrors.title = "Bu alan zorunludur.";
        if (!formData.color)
            newErrors.color = "Bu alan zorunludur.";
        if (formData.tasks.length == 0) {
            newErrors.tasks = "En az 1 tane görev ekleyin.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate())
            props.onSuccess(formData);

    };

    const handleCancel = () => {
        if (isEditMode) {
            setFormData({
                id: props.initialData?.id || undefined,
                title: props.initialData.title || "",
                color: props.initialData.color || "",
                tasks: props.initialData.tasks || [],
                fav: props.initialData.fav || false
            });
        } else {
            setFormData(new Job());
        }
        props.onClose();
    };

    const clickHandle = () => {
        if (newTask) {
            const taskArr = [...formData.tasks];
            taskArr.push({name: newTask, isComplate: false});
            setFormData(prev => ({...prev, tasks: taskArr}));
            setNewTask("");
        }
    }

    const deleteTask = (index: number) => {
        const taskArr = [...formData.tasks];
        taskArr.splice(index, 1);
        setFormData(prev => ({...prev, tasks: taskArr}));
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="form-dialog-title"
            aria-describedby="form-dialog-description"
            className="top-1/2 left-1/2 -translate-1/2 rounded-xl max-w-screen-[90vw] w-lg"
        >
            <form className={" p-4 flex flex-col gap-2 border-2 border-stone-400 bg-stone-100 rounded-xl"}>
                <h2 id="form-dialog-title" className="text-lg font-bold mb-2">
                    {isEditMode ? "Liste Düzenle" : "Yeni Liste"}
                </h2>

                <p id="form-dialog-description" className="text-sm text-gray-500 mb-4">
                    Lütfen gerekli bilgileri doldurun.
                </p>

                <TextInput
                    value={formData.title}
                    onInput={(e:any) => setFormData({...formData, title: e.target.value})}
                    label="Başlık"
                    name="title"
                    error={errors.title}
                    required
                />

                <SelectInput
                    value={formData.color}
                    onInput={(e:any) => setFormData({...formData, color: e.target.value})}
                    items={colorItems}
                    label="Renk"
                    name="color"
                    error={errors.color}
                    required
                />

                <TextInput
                    value={newTask}
                    onInput={(e:any) => setNewTask(e.target.value)}
                    onButtonClick={clickHandle}
                    label="Görev Ekle"
                    name="tasks"
                    buttonAriaLabel="Görev ekleme butonu"
                    inlineButton
                />

                <section>
                    <h3 className="text-sky-600 mb-1">Görevler *</h3>
                    <div
                        className={`border rounded-lg overflow-hidden ${errors.tasks ? "border-red-600" : "border-sky-200"}`}
                    >
                        <table className="w-full">
                            <thead className="bg-sky-100">
                            <tr>
                                <th className="text-left p-2 text-sky-600">Görev</th>
                                <th className="text-center p-2 text-sky-600 w-20">İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.tasks?.length > 0 ?
                                (formData.tasks.map((task: ITask, index: number) => (
                                    <tr key={index} className="border-t border-sky-100 hover:bg-sky-50">
                                        <td className="p-2 text-sky-600">{task.name}</td>
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => deleteTask(index)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded cursor-pointer"
                                                aria-label="Görevi sil"
                                            >
                                                <X size={16}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))) :
                                (<tr className="border-t border-sky-100">
                                    <td className="p-2 text-sky-300 text-center" colSpan={2}>
                                        Görev bulunmamakta.
                                    </td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                    <small className={`text-red-500 ${errors.tasks ? "visible" : "invisible"}`}>
                        {errors.tasks}
                    </small>
                </section>
                <div className={"flex justify-end gap-4 mt-4"}>
                    <button className={vazgecBtnClasses} onClick={handleCancel} type={"button"}>
                        Vazgeç
                    </button>
                    <button className={kaydetBtnClasses} onClick={handleSave} type={"button"}>
                        Kaydet
                    </button>
                </div>
            </form>
        </dialog>
    )
}

export default JobFormDialog;