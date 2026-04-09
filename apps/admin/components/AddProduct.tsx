"use client"

import { 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle 
} from "./ui/sheet";

import { Textarea } from "@/components/ui/textarea"

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

import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

const categories = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;

const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
  shortDescription: z.string().min(1, "Short description must be at least 5 characters long").max(60),
  description: z.string().min(1, "Description must be at least 1 character long"),
  price: z.number().min(0, "Price must be a positive number"), 
  category: z.enum(categories),
  colors: z.array(z.enum(colors)),
  sizes: z.array(z.enum(sizes)),
  images: z.record(z.enum(colors), z.string()),
})

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      category: "T-shirts",
      colors: [],
      sizes: [],
      images: {},
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success(`Product ${values.name} added`)
  }

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add Product</SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-col gap-0.5 p-4">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
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
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short Description" {...field} />
                    </FormControl>
                    <FormDescription>Enter a short description for the product</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl> 
                      <Textarea placeholder="Product Description" {...field} />
                    </FormControl>
                    <FormDescription>Enter a detailed description for the product</FormDescription>    
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Enter the price of the product</FormDescription>    
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Enter the category of the product</FormDescription>    
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl> 
                    <div className="grid grid-cols-2 gap-2 my-2 sm:grid-cols-3">
                      {sizes.map((size) => (
                        <label
                          key={size}
                          htmlFor={`size-${size}`}
                          className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-xs capitalize transition-colors hover:bg-muted/50"
                        >
                          <Checkbox
                            id={`size-${size}`}
                            checked={field.value?.includes(size)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, size]);
                              } else {
                                field.onChange(currentValues.filter((value) => value !== size));
                              }
                            }}
                          />
                          <span>{size}</span>
                        </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>Select available sizes</FormDescription>    
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="my-2 flex flex-wrap gap-x-4 gap-y-3">
                          {colors.map((color) => {
                            const isSelected = field.value?.includes(color) ?? false;

                            return (
                              <label
                                key={color}
                                htmlFor={`color-${color}`}
                                className={`flex max-w-full cursor-pointer items-center gap-2 text-sm capitalize transition-colors ${
                                  isSelected ? "text-primary" : "hover:text-foreground"
                                }`}
                              >
                                <Checkbox
                                  id={`color-${color}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, color]);
                                    } else {
                                      field.onChange(currentValues.filter((value) => value !== color));
                                    }
                                  }}
                                />
                                <span
                                  className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="break-words">{color}</span>
                              </label>
                            );
                          })}
                        </div>

                        {field.value && field.value.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Upload images for the selected colors
                            </p>
                            {field.value.map((color) => (
                              <div key={color} className="flex items-center gap-3">
                                <span
                                  className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="min-w-20 break-words capitalize">{color}</span>
                                <Input type="file" accept="image/*" className="max-w-xs" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Select available colors</FormDescription>
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
      </ScrollArea>
    </SheetContent>
  )
}

export default AddProduct;