"use client"

import { 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle 
} from "./ui/sheet";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CategoryFormSchema } from "@repo/types";

import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

const AddCategory = () => {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    "defaultValues": {
      name: "",
      slug: "",
    }
  })

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof CategoryFormSchema>) => {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.ok) {
        throw new Error("Failed to add category");
      }
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add category</SheetTitle>
        <SheetDescription asChild>
          <div className="flex flex-col gap-0.5 p-4">
        <Form {...form}>
          <form 
            className="space-y-8" 
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={mutation.isPending} 
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >{mutation.isPending ? "Submitting..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default AddCategory;