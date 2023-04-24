"use client"

import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { queryConsumer, userQueries } from "../../core/queries";
import consume from "../../core/consumer";

export function RegisterForm({ setform }) {
    const router = useRouter();

    async function submit(event) {
        event.preventDefault();
        const form = { username: document.querySelector('#username').value, email: document.querySelector('#email').value, passwd: document.querySelector('#passwd').value }

        try {
            let res = await consume(queryConsumer.apiUser, userQueries.registerUser, form);
            if (res?.msgType != "error") {
                toast.success("Registered successfully!", { theme: "dark" });
                setform(true);
            } else {
                toast.error("Email already taken", { theme: "dark" });
            }
        } catch (e) {
            toast.error("Email already taken", { theme: "dark" })
        }
    }

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={(event) => submit(event)}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" />
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