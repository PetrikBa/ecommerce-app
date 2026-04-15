import { ShippingFormInputs, shippingFormSchema } from "@repo/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { SubmitHandler, useForm } from "react-hook-form"

const ShippingForm = ({setShippingForm}:{setShippingForm:(data: ShippingFormInputs) => void}) => {
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<ShippingFormInputs>({
        resolver:zodResolver(shippingFormSchema)
    });

    const router = useRouter();

    const handleShippingForm:SubmitHandler<ShippingFormInputs> = (data) => {
        setShippingForm(data);
        router.push("/cart?step=3", { scroll: false });
    }

    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleShippingForm)}>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium" htmlFor="name">Name</label> 
                <input 
                    className="border-b border-gray-200 py-2 outline-none text-sm"
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    {...register("name")} 
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium" htmlFor="name">E-mail</label> 
                <input 
                    className="border-b border-gray-200 py-2 outline-none text-sm"
                    type="email" 
                    id="email" 
                    placeholder="john.doe@example.com" 
                    {...register("email")} 
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium" htmlFor="name">Phone</label> 
                <input 
                    className="border-b border-gray-200 py-2 outline-none text-sm"
                    type="text" 
                    id="phone" 
                    placeholder="(123) 456-7890" 
                    {...register("phone")} 
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium" htmlFor="address">Address</label> 
                <input 
                    className="border-b border-gray-200 py-2 outline-none text-sm"
                    type="text" 
                    id="address" 
                    placeholder="123 Main St" 
                    {...register("address")} 
                />
                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium" htmlFor="city">City</label> 
                <input 
                    className="border-b border-gray-200 py-2 outline-none text-sm"
                    type="text" 
                    id="city" 
                    placeholder="New York" 
                    {...register("city")} 
                />
                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
            </div>
            <button 
                type="submit" 
                className="w-full bg-gray-800 text-white p-2 border-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 rounded-lg"
            >
                Continue
                <ArrowRight className="w-3 h-3"/>
            </button>
        </form>
    )
}

export default ShippingForm 