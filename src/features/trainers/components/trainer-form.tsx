import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Loader2,
    Search,
    Save,
    UserRound,
    X,
} from "lucide-react";

import { useUsers } from "@/features/users/hooks/use-users";
import type { UserProfile } from "@/features/users/types/user-types";

import type { Trainer } from "../types/trainer-types";
import {
    trainerSchema,
    type TrainerFormValues,
} from "../schemas/trainer-schema";

interface TrainerFormProps {
    mode?: "create" | "edit";
    initialValues?: TrainerFormValues;
    initialData?: Trainer;
    onSubmit: (values: TrainerFormValues) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
}

export function TrainerForm({
    mode,
    initialValues,
    initialData,
    onSubmit,
    isSubmitting = false,
    submitLabel,
}: TrainerFormProps) {
    const isEditMode =
        mode === "edit" ||
        (!mode && Boolean(initialData));

    const [userSearch, setUserSearch] =
        useState("");

    const [selectedUser, setSelectedUser] =
        useState<UserProfile | null>(null);

    const [showUserResults, setShowUserResults] =
        useState(false);

    const resolvedInitialValues: TrainerFormValues = {
        userId:
            initialValues?.userId ??
            initialData?.userId ??
            undefined,

        specialization:
            initialValues?.specialization ??
            initialData?.specialization ??
            "",

        certifications:
            initialValues?.certifications ??
            initialData?.certifications ??
            "",

        yearsOfExperience:
            initialValues?.yearsOfExperience ??
            initialData?.yearsOfExperience ??
            undefined,

        bio:
            initialValues?.bio ??
            initialData?.bio ??
            "",

        hourlyRate:
            initialValues?.hourlyRate ??
            initialData?.hourlyRate ??
            undefined,
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TrainerFormValues>({
        resolver: zodResolver(trainerSchema),
        defaultValues: resolvedInitialValues,
    });

    const userId = watch("userId");

    const {
        data: usersPage,
        isLoading: isLoadingUsers,
        isFetching: isFetchingUsers,
    } = useUsers({
        search:
            userSearch.trim() || undefined,
        page: 0,
        size: 10,
    });

    /**
     * Reset form values when edit data arrives
     * or when the initial values change.
     */
    useEffect(() => {
        reset(resolvedInitialValues);
    }, [
        initialValues,
        initialData,
        reset,
    ]);

    /**
     * Resolve the associated user when editing.
     */
    useEffect(() => {
        const existingUserId =
            initialValues?.userId ??
            initialData?.userId;

        if (
            existingUserId === undefined ||
            selectedUser
        ) {
            return;
        }

        const matchingUser =
            usersPage?.content?.find(
                (user) =>
                    user.id === existingUserId,
            );

        if (matchingUser) {
            setSelectedUser(matchingUser);
        }
    }, [
        initialValues?.userId,
        initialData?.userId,
        selectedUser,
        usersPage?.content,
    ]);

    /**
     * Select a user.
     */
    function handleUserSelect(
        user: UserProfile,
    ) {
        setSelectedUser(user);

        setValue("userId", user.id, {
            shouldValidate: true,
            shouldDirty: true,
        });

        setUserSearch("");
        setShowUserResults(false);
    }

    /**
     * Clear the selected user.
     *
     * No resetField() is used here because the
     * installed React Hook Form version does not
     * support shouldValidate in resetField options.
     */
    function handleClearUser() {
        setSelectedUser(null);

        setValue("userId", undefined);

        setUserSearch("");
        setShowUserResults(true);
    }

    const handleFormSubmit: SubmitHandler<
        TrainerFormValues
    > = (values) => {
        onSubmit(values);
    };

    return (
        <form
            onSubmit={handleSubmit(
                handleFormSubmit,
            )}
            className="space-y-6"
        >
            {/* USER */}

            <div className="space-y-2">
                <label
                    htmlFor="trainer-user-search"
                    className="text-sm font-medium"
                >
                    Trainer User
                </label>

                {isEditMode ? (
                    <div className="rounded-md border bg-muted/40 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <UserRound className="h-5 w-5 text-primary" />
                            </div>

                            <div className="min-w-0">
                                {selectedUser ? (
                                    <>
                                        <p className="truncate text-sm font-medium">
                                            {
                                                selectedUser.firstName
                                            }{" "}
                                            {
                                                selectedUser.lastName
                                            }
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {
                                                selectedUser.email
                                            }
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-sm font-medium">
                                        User ID:{" "}
                                        {userId}
                                    </p>
                                )}
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground">
                            The associated user cannot
                            be changed after the trainer
                            is created.
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        {selectedUser ? (
                            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2.5">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <UserRound className="h-4 w-4 text-primary" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {
                                                selectedUser.firstName
                                            }{" "}
                                            {
                                                selectedUser.lastName
                                            }
                                        </p>

                                        <p className="truncate text-xs text-muted-foreground">
                                            {
                                                selectedUser.email
                                            }
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleClearUser
                                    }
                                    disabled={
                                        isSubmitting
                                    }
                                    className="ml-3 shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Clear selected user"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <input
                                        id="trainer-user-search"
                                        type="text"
                                        value={userSearch}
                                        placeholder="Search user by name or email..."
                                        disabled={
                                            isSubmitting
                                        }
                                        autoComplete="off"
                                        onChange={(
                                            event,
                                        ) => {
                                            setUserSearch(
                                                event.target
                                                    .value,
                                            );

                                            setShowUserResults(
                                                true,
                                            );

                                            setValue(
                                                "userId",
                                                undefined,
                                            );
                                        }}
                                        onFocus={() =>
                                            setShowUserResults(
                                                true,
                                            )
                                        }
                                        className="w-full rounded-md border bg-background px-10 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>

                                {showUserResults && (
                                    <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border bg-popover shadow-md">
                                        {isLoadingUsers ||
                                        isFetchingUsers ? (
                                            <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-muted-foreground">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Searching users...
                                            </div>
                                        ) : usersPage?.content
                                              ?.length ? (
                                            usersPage.content.map(
                                                (
                                                    user,
                                                ) => (
                                                    <button
                                                        key={
                                                            user.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            handleUserSelect(
                                                                user,
                                                            )
                                                        }
                                                        disabled={
                                                            isSubmitting
                                                        }
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                            <UserRound className="h-4 w-4 text-primary" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-medium">
                                                                {
                                                                    user.firstName
                                                                }{" "}
                                                                {
                                                                    user.lastName
                                                                }
                                                            </p>

                                                            <p className="truncate text-xs text-muted-foreground">
                                                                {
                                                                    user.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </button>
                                                ),
                                            )
                                        ) : (
                                            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                                                No users found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {errors.userId && (
                    <p className="text-sm text-destructive">
                        {errors.userId.message}
                    </p>
                )}
            </div>

            {/* SPECIALIZATION */}

            <div className="space-y-2">
                <label
                    htmlFor="specialization"
                    className="text-sm font-medium"
                >
                    Specialization
                </label>

                <input
                    id="specialization"
                    type="text"
                    placeholder="e.g. Strength Training"
                    disabled={isSubmitting}
                    {...register("specialization")}
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {errors.specialization && (
                    <p className="text-sm text-destructive">
                        {
                            errors.specialization
                                .message
                        }
                    </p>
                )}
            </div>

            {/* CERTIFICATIONS */}

            <div className="space-y-2">
                <label
                    htmlFor="certifications"
                    className="text-sm font-medium"
                >
                    Certifications
                </label>

                <textarea
                    id="certifications"
                    rows={3}
                    placeholder="e.g. NASM-CPT, ACE Certified"
                    disabled={isSubmitting}
                    {...register("certifications")}
                    className="w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {errors.certifications && (
                    <p className="text-sm text-destructive">
                        {
                            errors.certifications
                                .message
                        }
                    </p>
                )}
            </div>

            {/* YEARS OF EXPERIENCE */}

            <div className="space-y-2">
                <label
                    htmlFor="yearsOfExperience"
                    className="text-sm font-medium"
                >
                    Years of Experience
                </label>

                <input
                    id="yearsOfExperience"
                    type="number"
                    min={0}
                    max={60}
                    disabled={isSubmitting}
                    {...register(
                        "yearsOfExperience",
                        {
                            valueAsNumber: true,
                        },
                    )}
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {errors.yearsOfExperience && (
                    <p className="text-sm text-destructive">
                        {
                            errors.yearsOfExperience
                                .message
                        }
                    </p>
                )}
            </div>

            {/* HOURLY RATE */}

            <div className="space-y-2">
                <label
                    htmlFor="hourlyRate"
                    className="text-sm font-medium"
                >
                    Hourly Rate
                </label>

                <input
                    id="hourlyRate"
                    type="number"
                    min={0}
                    step="0.01"
                    disabled={isSubmitting}
                    {...register("hourlyRate", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {errors.hourlyRate && (
                    <p className="text-sm text-destructive">
                        {
                            errors.hourlyRate.message
                        }
                    </p>
                )}
            </div>

            {/* BIO */}

            <div className="space-y-2">
                <label
                    htmlFor="bio"
                    className="text-sm font-medium"
                >
                    Bio
                </label>

                <textarea
                    id="bio"
                    rows={5}
                    placeholder="Brief professional biography..."
                    disabled={isSubmitting}
                    {...register("bio")}
                    className="w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {errors.bio && (
                    <p className="text-sm text-destructive">
                        {errors.bio.message}
                    </p>
                )}
            </div>

            {/* SUBMIT */}

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {isEditMode
                                ? "Updating..."
                                : "Creating..."}
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {submitLabel ??
                                (isEditMode
                                    ? "Update Trainer"
                                    : "Create Trainer")}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}