import { columns } from "./columns";
import { DataTable } from "./data-table";
import { OrderType } from "@repo/types";
import { auth } from "@clerk/nextjs/server";

const getData = async (): Promise<OrderType[]> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data ?? [];

  } catch (error) {
      console.log(error);
      return [];
  }
  
};

const PaymentsPage = async () => {

    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1>All payments</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default PaymentsPage;