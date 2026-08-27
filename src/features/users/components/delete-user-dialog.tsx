interface DeleteUserDialogProps {
    open: boolean;
    userName: string;
    isDeleting?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function DeleteUserDialog({
    open,
    userName,
    isDeleting = false,
    onCancel,
    onConfirm,
}: DeleteUserDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
                <h2 className="text-lg font-semibold">
                    Delete user
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <strong>{userName}</strong>?
                    This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}