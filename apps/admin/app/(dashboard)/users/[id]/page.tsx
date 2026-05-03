import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CardList from "@/components/CardList";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { BadgeCheck, Candy, Citrus, Edit, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/AppLineChart";

export function generateStaticParams() {
  return [{ users: "john-doe" }, { users: "test" }]
}

const SingleUserPage = () => {
    return (
        <div className="">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>John Doe</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        {/* CONTAINER */}
        <div className="mt-4 flex flex-col xl:flex-row gap-8">
            {/* LEFT */}
            <div className="w-full xl:w-1/3 space-y-6">
                {/* USER BADGES */}
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <h1 className="text-xl font-semibold">User badges</h1>
                    <div className="flex gap-4 mt-4">
                        <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2 className="font-bold mb-2">Verified User</h2>
                  <p className="text-sm text-muted-foreground">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className="rounded-full bg-green-800/30 border-1 border-green-800/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2 className="font-bold mb-2">Admin</h2>
                  <p className="text-sm text-muted-foreground">
                    Admin users have access to all features and can manage
                    users.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Candy
                    size={36}
                    className="rounded-full bg-yellow-500/30 border-1 border-yellow-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2 className="font-bold mb-2">Awarded</h2>
                  <p className="text-sm text-muted-foreground">
                    This user has been awarded for their contributions.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <Citrus
                    size={36}
                    className="rounded-full bg-orange-500/30 border-1 border-orange-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2 className="font-bold mb-2">Popular</h2>
                  <p className="text-sm text-muted-foreground">
                    This user has been popular in the community.
                  </p>
                </HoverCardContent>
              </HoverCard>
                    </div>
                </div>
                {/* USER CARD CONTAINER */}
                <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="User Avatar" />
                      <AvatarFallback>JD</AvatarFallback>                      
                    </Avatar>

                    <h1 className="text-2xl font-semibold mt-4">John Doe</h1>
                  </div>
                  <p className="text-s text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                {/* INFO CONTAINER */}
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">User information</h2>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm">Edit User</Button>
                            </SheetTrigger>
                            <EditUser />
                            </Sheet>
                    </div>
                    <div className="space-y-4 mt-4">
                        <div className="flex flex-col gap-2 mb-8">
                            <p className="text-sm text-muted-foreground">Profile completion</p>
                            <Progress value={66} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Full name:</span>
                            <span>John Doe</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Email:</span>
                            <span>john.doe@example.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Phone:</span>
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Address:</span>
                            <span>123 Main St, New York, USA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">City:</span>
                            <span>New York</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Joined on 2026, Jan 11</p>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-2/3 space-y-6">
                {/* CHART CONTAINER */}
                <div className="bg-primary-foreground p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">User activity</h2>
                  <AppLineChart />
                </div>
            </div>
        </div>
        </div>
    )
}

export default SingleUserPage;