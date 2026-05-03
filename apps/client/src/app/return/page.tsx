import Link from "next/link";
import ClearCart from "@/components/ClearCart";


const ReturnPage = async ({searchParams}:{searchParams: Promise<{session_id: string}> | undefined}) => {
    const session_id = (await searchParams)?.session_id;

    if(!session_id){
        return <div className="">no session_id found</div>
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`);
    const data = await res.json();
    console.log(data);
    
    return (
    <div className="">
        {data.paymentStatus === "paid" && <ClearCart />}
        <h1 className="">Payment: {data.session}</h1>
        <p>Payment status: {data.paymentStatus}</p>
        <Link href="/orders">See your orders</Link>
    </div>
  );
}; 

export default ReturnPage;
