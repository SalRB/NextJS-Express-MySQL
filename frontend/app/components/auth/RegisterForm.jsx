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
                <div className="register">
                    <div className="usernameLabel">
                        <label className="text" htmlFor="username">Username</label>
                    </div>
                    <div className="usernameInput" >
                        <input className="input" type="text" name="username" id="username" placeholder="username" />
                    </div>
                    <div className="emailLabel">
                        <label className="text" htmlFor="email">Email</label>
                    </div>
                    <div className="emailInput" >
                        <input className="input" type="email" name="email" id="email" placeholder="email" />
                    </div>
                    <div className="passwordLabel">
                        <label className="text" htmlFor="passwd">Password</label>
                    </div>
                    <div className="passwordInput">
                        <input
                            className="input"
                            type="password"
                            id="passwd"
                            name="passwd"
                            pattern="[a-z0-9]{1,15}"
                            title="Password should be digits (0 to 9) or alphabets (a to z)."
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className="button authFormButton">Register</button>
                </div>
            </form >
        </>
    )
}