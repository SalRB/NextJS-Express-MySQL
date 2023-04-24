"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export function LoginForm({ }) {
    const router = useRouter();

    async function submit(event) {
        event.preventDefault();
        const form = { email: document.querySelector('#email').value, passwd: document.querySelector('#passwd').value }

        const res = await signIn("credentials", {
            email: form.email,
            passwd: form.passwd,
            redirect: false,
            callbackUrl: "/"
        })

        if (res.status == 200) {
            toast.success("Login successfull!", { theme: "dark" })
            router.push("/");
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={(event) => submit(event)}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="passwd">Password:</label>
                <input
                    type="password"
                    id="passwd"
                    name="passwd"
                    pattern="[a-z0-9]{1,15}"
                    title="Password should be digits (0 to 9) or alphabets (a to z)."
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}