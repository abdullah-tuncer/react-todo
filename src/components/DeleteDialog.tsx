import {type FC, useEffect, useRef} from "react";
import {type IJob} from "../types/Job.ts";

interface Props {
    open: boolean,
    initialData: IJob,
    onSuccess: any,
    onClose: any
}

const DeleteDialog: FC<Props> = (props) => {
    const deleteDialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.open && deleteDialog.current) {
            if (!deleteDialog.current.open)
                deleteDialog.current.showModal();
        } else if (!props.open && deleteDialog.current?.open) {
            deleteDialog.current.close();
        }
    }, [props.open, props.initialData])

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

    const handleCancel = () => {
        props.onClose();
    };

    return (
        <dialog
            ref={deleteDialog}
            className="rounded-2xl p-4 border-2 border-stone-400 max-w-screen-[90vw] w-md -translate-1/2 top-1/2 left-1/2"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Sil</h2>
                <p>Dikkat! "{props.initialData?.title}" listesi kalıcı olarak silinecektir. Emin misiniz?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        className="border border-red-500 bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500 focus:outline-offset-2 focus:outline-2 focus:outline-red-500 px-3 py-1 rounded cursor-pointer"
                        onClick={handleCancel}
                    >
                        Hayır
                    </button>
                    <button
                        className="border border-green-500 bg-green-100 text-green-500 hover:text-green-100 hover:bg-green-500 focus:outline-offset-2 focus:outline-2 focus:outline-green-500 px-3 py-1 rounded cursor-pointer"
                        onClick={props.onSuccess}
                    >
                        Evet
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteDialog;