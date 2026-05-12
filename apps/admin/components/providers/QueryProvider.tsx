"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default QueryProvider