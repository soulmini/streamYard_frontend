import React, { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { cn } from "@/utils/cn";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {

  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    console.log("Form submitted");

    const res = await fetch('http://localhost:3000/auth/login', {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body :  JSON.stringify({email, password}),
    })

  };
  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <div className="max-w-md w-full rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black border border-gray-800">
        <h2 className="font-bold text-2xl text-white dark:text-neutral-200 border-white">
          Welcome to StreamYard
        </h2>
        <p className="text-white text-md max-w-sm mt-2 dark:text-neutral-300">
          Signup to Stream Yard if you don't have account
        </p>

        <form className="my-8">
          <LabelInputContainer className="mb-4">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input id="email" className="bg-black text-white" placeholder="projectmayhem@fc.com" type="email" onChange={(e)=>{
                setEmail(e.target.value);
              }}/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password" className="text-white" >Password</Label>
              <Input id="password" className="bg-black text-white" placeholder="••••••••" type="password" onChange={(e)=> {
                setPassword(e.target.value);
              }}/>
          </LabelInputContainer>

          <button
            className="mb-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={handleSubmit}
          >
            login &rarr;
            <BottomGradient />
          </button>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="button" // Change type to button
            onClick={() => {
              // navigate('/signup'); // Use navigate to go to signup page
              console.log('clicked');
            }}
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
