import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import type { ChangeEventType, FormEventType } from "../utils/types";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: FormEventType) => {
    e.preventDefault();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e: ChangeEventType) => setName(e.target.value)}
          />
          <Input
            icon={User}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: ChangeEventType) => setEmail(e.target.value)}
          />
          <Input
            icon={User}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEventType) => setPassword(e.target.value)}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
