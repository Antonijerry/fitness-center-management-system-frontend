import {
    useEffect,
    useState,
    type FormEvent,
    type ReactNode,
} from "react";

import {
    Check,
    ChevronDown,
    Loader2,
    Save,
    Search,
    UserPlus,
    X,
} from "lucide-react";

import type {
    CreateMemberRequest,
    EmergencyContact,
    MemberProfile,
    UpdateMemberRequest,
} from "@/features/members/types/member-types";

import {
    useUsers,
} from "@/features/users/hooks/use-users";

import type {
    UserProfile,
} from "@/features/users/types/user-types";

interface MemberFormProps {
    mode: "create" | "edit";
    initialData?: MemberProfile;
    isSubmitting?: boolean;
    error?: string | null;
    onSubmit: (
        values: CreateMemberRequest | UpdateMemberRequest,
    ) => void;
    onCancel: () => void;
}

interface FormState {
    phone: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelationship: string;
    fitnessGoals: string;
    fitnessNotes: string;
}

const emptyForm: FormState = {
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    fitnessGoals: "",
    fitnessNotes: "",
};

function createFormState(
    member?: MemberProfile,
): FormState {
    if (!member) {
        return emptyForm;
    }

    return {
        phone: member.phone ?? "",
        gender: member.gender ?? "",
        dateOfBirth: member.dateOfBirth ?? "",
        address: member.address ?? "",
        emergencyName:
            member.emergencyContact?.name ?? "",
        emergencyPhone:
            member.emergencyContact?.phone ?? "",
        emergencyRelationship:
            member.emergencyContact?.relationship ?? "",
        fitnessGoals: member.fitnessGoals ?? "",
        fitnessNotes: member.fitnessNotes ?? "",
    };
}

function buildEmergencyContact(
    form: FormState,
): EmergencyContact | null {
    const name = form.emergencyName.trim();
    const phone = form.emergencyPhone.trim();
    const relationship =
        form.emergencyRelationship.trim();

    if (!name && !phone && !relationship) {
        return null;
    }

    return {
        name,
        phone,
        relationship: relationship || null,
    };
}

function Field({
    label,
    required = false,
    children,
}: {
    label: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">
                {label}

                {required && (
                    <span className="ml-1 text-destructive">
                        *
                    </span>
                )}
            </label>

            {children}
        </div>
    );
}

const inputClassName =
    "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

const textareaClassName =
    "min-h-24 w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

interface UserSelectorProps {
    selectedUser?: UserProfile;
    onSelect: (user: UserProfile) => void;
    disabled?: boolean;
}

function UserSelector({
    selectedUser,
    onSelect,
    disabled = false,
}: UserSelectorProps) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useUsers({
        search: search.trim() || undefined,
        page: 0,
        size: 10,
        sortBy: "firstName",
        direction: "asc",
    });

    const users = data?.content ?? [];

    return (
        <div className="relative">
            {selectedUser ? (
                <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                {selectedUser.firstName.charAt(0)}
                                {selectedUser.lastName.charAt(0)}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {selectedUser.firstName}{" "}
                                    {selectedUser.lastName}
                                </p>

                                <p className="truncate text-xs text-muted-foreground">
                                    {selectedUser.email}
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    User #{selectedUser.id}
                                </p>
                            </div>
                        </div>

                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => {
                                    onSelect(undefined as never);
                                    setSearch("");
                                }}
                                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                aria-label="Change selected user"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setOpen(true);
                            }}
                            onFocus={() => setOpen(true)}
                            type="search"
                            placeholder="Search user by name or email..."
                            disabled={disabled}
                            className={`${inputClassName} pl-10 pr-10`}
                        />

                        <ChevronDown
                            className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition ${open ? "rotate-180" : ""
                                }`}
                        />
                    </div>

                    {open && !disabled && (
                        <>
                            <button
                                type="button"
                                aria-label="Close user selector"
                                className="fixed inset-0 z-10 cursor-default"
                                onClick={() => setOpen(false)}
                            />

                            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-auto rounded-lg border bg-popover p-1 shadow-lg">
                                {isLoading && (
                                    <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Searching users...
                                    </div>
                                )}

                                {isError && !isLoading && (
                                    <div className="px-4 py-6 text-center text-sm text-destructive">
                                        Unable to load users.
                                    </div>
                                )}

                                {!isLoading &&
                                    !isError &&
                                    users.length === 0 && (
                                        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                                            {search
                                                ? "No users found."
                                                : "No users available."}
                                        </div>
                                    )}

                                {!isLoading &&
                                    !isError &&
                                    users.map((user) => (
                                        <button
                                            key={user.id}
                                            type="button"
                                            onClick={() => {
                                                onSelect(user);
                                                setOpen(false);
                                                setSearch("");
                                            }}
                                            className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition hover:bg-muted"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                {user.firstName.charAt(0)}
                                                {user.lastName.charAt(0)}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {user.firstName}{" "}
                                                    {user.lastName}
                                                </p>

                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>

                                            {user.enabled && (
                                                <Check className="h-4 w-4 shrink-0 text-primary" />
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export function MemberForm({
    mode,
    initialData,
    isSubmitting = false,
    error,
    onSubmit,
    onCancel,
}: MemberFormProps) {
    const [form, setForm] = useState<FormState>(
        createFormState(initialData),
    );

    const [selectedUser, setSelectedUser] =
        useState<UserProfile>();

    useEffect(() => {
        setForm(createFormState(initialData));
    }, [initialData]);

    function updateField(
        field: keyof FormState,
        value: string,
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (mode === "create" && !selectedUser) {
            return;
        }

        const emergencyContact =
            buildEmergencyContact(form);

        const commonData = {
            phone: form.phone.trim(),
            gender: form.gender.trim() || null,
            dateOfBirth: form.dateOfBirth || null,
            address: form.address.trim() || null,
            emergencyContact,
            fitnessGoals:
                form.fitnessGoals.trim() || null,
            fitnessNotes:
                form.fitnessNotes.trim() || null,
        };

        if (mode === "create") {
            onSubmit({
                userId: selectedUser!.id,
                ...commonData,
            });

            return;
        }

        onSubmit(commonData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            {/* User account */}
            <section className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-5">
                    <h2 className="font-semibold">
                        User Account
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Select an existing user account for this
                        member profile.
                    </p>
                </div>

                {mode === "create" ? (
                    <Field
                        label="User"
                        required
                    >
                        <UserSelector
                            selectedUser={selectedUser}
                            onSelect={setSelectedUser}
                            disabled={isSubmitting}
                        />

                        <p className="text-xs text-muted-foreground">
                            Only an existing user account can be
                            attached to a member profile.
                        </p>
                    </Field>
                ) : (
                    <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                {initialData?.firstName.charAt(0)}
                                {initialData?.lastName.charAt(0)}
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    {initialData?.firstName}{" "}
                                    {initialData?.lastName}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {initialData?.email}
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    User #{initialData?.userId}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Personal information */}
            <section className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-5">
                    <h2 className="font-semibold">
                        Personal Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Contact and personal details for the member.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                        label="Phone"
                        required
                    >
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(event) =>
                                updateField(
                                    "phone",
                                    event.target.value,
                                )
                            }
                            placeholder="+234..."
                            required
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>

                    <Field label="Gender">
                        <select
                            value={form.gender}
                            onChange={(event) =>
                                updateField(
                                    "gender",
                                    event.target.value,
                                )
                            }
                            disabled={isSubmitting}
                            className={inputClassName}
                        >
                            <option value="">Select gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </Field>

                    <Field label="Date of Birth">
                        <input
                            type="date"
                            value={form.dateOfBirth}
                            onChange={(event) =>
                                updateField(
                                    "dateOfBirth",
                                    event.target.value,
                                )
                            }
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>

                    <Field label="Address">
                        <input
                            type="text"
                            value={form.address}
                            onChange={(event) =>
                                updateField(
                                    "address",
                                    event.target.value,
                                )
                            }
                            placeholder="Residential address"
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>
                </div>
            </section>

            {/* Emergency contact */}
            <section className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-5">
                    <h2 className="font-semibold">
                        Emergency Contact
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Optional emergency contact information.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Contact Name">
                        <input
                            type="text"
                            value={form.emergencyName}
                            onChange={(event) =>
                                updateField(
                                    "emergencyName",
                                    event.target.value,
                                )
                            }
                            placeholder="Full name"
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>

                    <Field label="Contact Phone">
                        <input
                            type="tel"
                            value={form.emergencyPhone}
                            onChange={(event) =>
                                updateField(
                                    "emergencyPhone",
                                    event.target.value,
                                )
                            }
                            placeholder="+234..."
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>

                    <Field label="Relationship">
                        <input
                            type="text"
                            value={form.emergencyRelationship}
                            onChange={(event) =>
                                updateField(
                                    "emergencyRelationship",
                                    event.target.value,
                                )
                            }
                            placeholder="e.g. Parent, Spouse, Sibling"
                            disabled={isSubmitting}
                            className={inputClassName}
                        />
                    </Field>
                </div>
            </section>

            {/* Fitness information */}
            <section className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-5">
                    <h2 className="font-semibold">
                        Fitness Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Record the member's fitness goals and
                        additional notes.
                    </p>
                </div>

                <div className="space-y-5">
                    <Field label="Fitness Goals">
                        <textarea
                            value={form.fitnessGoals}
                            onChange={(event) =>
                                updateField(
                                    "fitnessGoals",
                                    event.target.value,
                                )
                            }
                            placeholder="Describe the member's fitness goals..."
                            disabled={isSubmitting}
                            className={textareaClassName}
                        />
                    </Field>

                    <Field label="Fitness Notes">
                        <textarea
                            value={form.fitnessNotes}
                            onChange={(event) =>
                                updateField(
                                    "fitnessNotes",
                                    event.target.value,
                                )
                            }
                            placeholder="Additional fitness information..."
                            disabled={isSubmitting}
                            className={textareaClassName}
                        />
                    </Field>
                </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X className="h-4 w-4" />
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        (mode === "create" && !selectedUser)
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : mode === "create" ? (
                        <>
                            <UserPlus className="h-4 w-4" />
                            Create Member
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}