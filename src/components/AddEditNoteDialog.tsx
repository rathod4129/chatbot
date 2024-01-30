import { CreateNotesSchema, createNotesSchema } from "@/lib/validation/note"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import LoadingButton from "./ui/loading-button"
import { useRouter } from "next/navigation"
import { Note } from "@prisma/client"
import { useState } from "react"

interface AddEditNoteDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    noteToEdit?: Note;
}

export default function AddEditNoteDialog({ open, setOpen, noteToEdit }: AddEditNoteDialogProps) {

    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const router = useRouter();
    const form = useForm<CreateNotesSchema>({
        resolver: zodResolver(createNotesSchema),
        defaultValues: {
            title: noteToEdit?.title || '',
            content: noteToEdit?.content || '',
        },
    });


    async function onSubmit(input: CreateNotesSchema) {
        // alert(JSON.stringify(input))
        try {
            if (noteToEdit) {
                const response = await fetch("/api/notes", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: noteToEdit.id,
                        ...input
                    })
                })
                if (!response.ok) throw Error("status code" + response.status)

            } else {
                // console.log(JSON.stringify(input))
                const response = await fetch("/api/notes", {
                    method: "POST",
                    body: JSON.stringify(input)
                })
                //  console.log(JSON.stringify(input))
                if (!response.ok) throw Error("status code" + response.status)
                form.reset()

            }


            router.refresh();
            setOpen(false);

        } catch (error) {
            console.log(error)
            alert("something went wrong" + error)
        }

    }


    async function deleteNote() {
        if (!noteToEdit) return;
        setDeleteInProgress(true)
        try {
            const response = await fetch("/api/notes", {
                method: "DELETE",
                body: JSON.stringify({
                    id: noteToEdit.id
                })
            })
            if (!response.ok) throw Error("status code" + response.status)
            router.refresh();
            setOpen(false);

        } catch (error) {
            console.log(error)
            alert("something went wrong" + error)
        } finally {
            setDeleteInProgress(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {noteToEdit ? "Edit Note" : "Add Note"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Notes title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Notes Content" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                        <DialogFooter className="gap-1 sm:gap-0">
                            {noteToEdit && (
                                <LoadingButton variant="destructive" loading={deleteInProgress} disabled={form.formState.isSubmitting} onClick={deleteNote} type="button">Delete Note</LoadingButton>
                            )}
                            <LoadingButton type="submit" loading={form.formState.isSubmitting} disabled={deleteInProgress}>
                                Submit
                            </LoadingButton>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}