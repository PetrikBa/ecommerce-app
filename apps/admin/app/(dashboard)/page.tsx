import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import ToDoList from "@/components/ToDoList";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

const Homepage = async () => {

  const { getToken } = await auth();
  const token = await getToken();
  const orderChartData = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => Array.isArray(data) ? data : [])
    .catch(() => []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-muted-foreground">Loading chart...</div>}>
          <AppBarChart dataPromise={orderChartData}/>
        </Suspense>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <ToDoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular products" />
      </div>
    </div>
  );
}

export default Homepage;