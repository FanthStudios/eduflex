import type { Session } from "next-auth";
import { SignOutResponse } from "next-auth/react";

export async function handleUserChange(
    e: FormData,
    session: Session,
    setLoading: (loading: boolean) => void,
    edgestore: any,
    avatarFile: File | undefined,
    toast: any,
    signOut: (options?: {
        callbackUrl: string;
        redirect: boolean;
    }) => Promise<SignOutResponse | undefined>
) {
    setLoading(true);
    let avatarUrl = "";

    if (session.user.avatar === "" && avatarFile !== undefined) {
        // upload the new avatar
        const res = await edgestore.profilePictures.upload({
            file: avatarFile,
        });

        avatarUrl = res.url;
    } else if (session.user.avatar !== "" && avatarFile !== undefined) {
        const res = await edgestore.profilePictures.upload({
            file: avatarFile,
            options: {
                replaceTargetUrl: session.user.avatar,
            },
        });

        avatarUrl = res.url;
    }

    if (
        session?.user?.firstName !== e.get("first-name") ||
        session?.user?.lastName !== e.get("last-name") ||
        session?.user?.email !== e.get("email") ||
        avatarUrl !== ""
    ) {
        const res = await fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: e.get("first-name"),
                lastName: e.get("last-name"),
                email: e.get("email"),
                avatar: avatarUrl,
                userId: session.user.id,
            }),
        });

        if (res.status === 200) {
            setLoading(false);
            toast.success(
                "Zaktualizowano informacje. Za chwilę zostaniesz wylogowany."
            );
            await new Promise((resolve) => setTimeout(resolve, 2500));
            signOut({
                callbackUrl: "/",
                redirect: true,
            });
        } else {
            setLoading(false);
            toast.error("Wystąpił błąd podczas aktualizacji informacji.");
        }
    } else {
        setLoading(false);
        toast.info("Nie zmieniono żadnych informacji.");
    }
}

export async function handlePasswordChange(
    session: Session,
    e: FormData,
    setLoading: (loading: boolean) => void,
    toast: any
) {
    setLoading(true);

    const currentPassword = e.get("current_password");
    const newPassword = e.get("new_password");
    const newPasswordRepeat = e.get("confirm_password");

    if (newPassword !== newPasswordRepeat) {
        setLoading(false);
        toast.error("Hasła nie są takie same.");
        return;
    }

    const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currentPassword,
            newPassword,
            userId: session.user.id,
        }),
    });

    if (res.status === 200) {
        setLoading(false);
        toast.success("Zaktualizowano hasło.");

        // clear the form
        e.set("current_password", "");
        e.set("new_password", "");
        e.set("confirm_password", "");
    } else if (res.status === 500) {
        setLoading(false);
        toast.error("Wystąpił błąd podczas aktualizacji hasła.");
        const data = await res.json();
        console.error(data);
    } else {
        setLoading(false);
        const data = await res.json();
        console.log(data);
        toast.error(data.error);
    }
}

export async function handleDeleteAccount(
    userId: number,
    signOut: (options?: {
        callbackUrl: string;
        redirect: boolean;
    }) => Promise<SignOutResponse | undefined>,
    toast: any,
    edgestore: any,
    avatar: string
) {
    if (avatar !== "") {
        await edgestore.profilePictures.delete({
            url: avatar,
        });
    }

    const res = await fetch("/api/user", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
        }),
    });

    if (res.status === 200) {
        signOut({
            callbackUrl: "/",
            redirect: true,
        });
    } else {
        const data = await res.json();
        console.error(data);
        toast.error("Wystąpił błąd podczas usuwania konta.");
    }
}
