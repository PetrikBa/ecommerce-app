"use client"

import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const ToDoList = () => {
   const [date, setDate] = useState<Date | undefined>()
   const [open, setOpen] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-lg font-medium mb-6">ToDo list</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                        <CalendarIcon className="mr-2" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                        />
                </PopoverContent>
            </Popover>
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <Card className="">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</label>
                        </div>
                    </Card>
                    <Card className="">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item2"/>
                            <label htmlFor="item2" className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</label>
                        </div>
                    </Card>
                    <Card className="">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item3" checked/>
                            <label htmlFor="item3" className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</label>
                        </div>
                    </Card>
                    <Card className="">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item4"/>
                            <label htmlFor="item4" className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}

export default ToDoList;