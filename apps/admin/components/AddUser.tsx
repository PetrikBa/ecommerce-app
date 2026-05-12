"use client"

import { 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle 
} from "./ui/sheet";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import * as z from "zod/v4"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { UserFormSchema } from "@repo/types";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      emailAddress: [],
      password: "",
    }
  })

  const { getToken } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
      const token = await getToken();
      const { userName, ...rest } = data;
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({ ...rest, username: userName }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add user");
      }
    },
    onSuccess: () => {
      toast.success("User added successfully");
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add user</SheetTitle>
        <SheetDescription asChild>
          <div className="flex flex-col gap-0.5 p-4">
        <Form {...form}>
          <form 
            className="space-y-8" 
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be visible in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be visible in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be visible in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email addresses</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john.doe@example.com , john.doe2@example.com" 
                      {...field} 
                      onChange={e=> {
                        const emails = e.target.value.split(",").map(email => email.trim()).filter((email) => email);
                        field.onChange(emails);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Enter a valid email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl> 
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Enter password</FormDescription>    
                    <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={mutation.isPending} 
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >{mutation.isPending ? "Submitting..." : "Add User"}
            </Button>
          </form>
        </Form>
      </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default AddUser;