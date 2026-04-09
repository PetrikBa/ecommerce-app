"use client"

import { 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle 
} from "./ui/sheet";

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";

const formSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.email("Invalid email address").min(5, "Email must be at least 5 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  address: z.string().min(2, "Address must be at least 2 characters long"), 
  city: z.string().min(2, "City must be at least 2 characters long"), 
})

const EditUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St, New York, USA",
      city: "New York",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success(`User ${values.fullname} updated`)
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Edit user</SheetTitle>
        <SheetDescription asChild>
          <div className="flex flex-col gap-0.5 p-4">
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter a valid email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl> 
                    <Input placeholder="+1 234 567 890" {...field} />
                  </FormControl>
                  <FormDescription>Enter phone number in correct format</FormDescription>    
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl> 
                    <Input placeholder="123 Main St, New York, USA" {...field} />
                  </FormControl>
                  <FormDescription>Enter address</FormDescription>    
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl> 
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormDescription>Enter city</FormDescription>    
                    <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default EditUser;