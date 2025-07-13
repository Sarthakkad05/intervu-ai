"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField"
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email : z.string().email(),
        password: z.string().min(3)
    })
}

export default function AuthPage({ type }: { type: FormType}) {
    const router = useRouter();
    const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if(type === 'sign-up'){
            toast.success('Account created succesfully. Please sign in.');
            router.push('/sign-in');
        }else{
            toast.success('Sign in succesfully.');
            router.push('/');
        }
    } catch (error) {
        console.log('Navigation error:', error);
        toast.error(`There was an error: ${error}`)
    }
  }
  const isSignIn = type === "sign-in";
  
  return (
    <div className="card-border lg-min-w-[566px]">
        <div className="flex flex-col card gap-6 py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" height={32} width={38} alt="logo"/>
                <h2 className="text-primary-100">PrepWise</h2>
            </div>
            <h3>Practice the job interview with AI.</h3>
        
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
                {!isSignIn && (
                    <FormField 
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Your name"
                    />
                )}
                <FormField 
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    type="email"
                />
                <FormField 
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Your password"
                    type="password"
                />
                <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
            </form>
            </Form>
            <p>
                {isSignIn ? 'No account yet?' : 'Have an account already?'}
                <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
                    {!isSignIn ? "Sign in" : "Sign up"}
                </Link>
            </p>
        </div>
    </div>
  );
}