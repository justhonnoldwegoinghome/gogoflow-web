import { useState } from "react";

import { useLogIn } from "../api/logIn";

export function LogInForm() {
  const logInMutation = useLogIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        logInMutation.trigger({ data: { email, password } });
      }}
    >
      <input
        type="text"
        placeholder="Email"
        className="block border border-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block border border-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
