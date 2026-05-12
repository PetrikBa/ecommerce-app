"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/TablePaginaton"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { User } from "@clerk/nextjs/server"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,

    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const { getToken } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const selectedRows = table.getSelectedRowModel().rows;

      await Promise.all(selectedRows.map(async (row) => {
        const userId = (row.original as User).id; 
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      }))
    },
    onSuccess: () => {
      toast.success("User(s) deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  return (
    <div className="overflow-hidden rounded-md border">
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md m-4 cursor-pointer"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          > 
            <Trash2 className="h-4 w-4" />
            {mutation.isPending ? "Deleting..." : "Delete user(s)"} 
          </button>
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}