// import { Pagination } from "@/components/ui/pagination";
import Search from "@/components/Search";
// import Table from "@/app/ui/invoices/table";
// import { CreateInvoice } from "@/app/ui/invoices/buttons";
// import { lusitana } from "@/app/ui/fonts";
// import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Table from "@/components/Table";

const Page = async (props: { searchParams: Promise<{ query?: string; page?: string }> }) => {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        {/* <CreateInvoice /> */}
      </div>
      <Suspense key={query + currentPage} fallback={<Skeleton className="w-40 h-10" />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">{/* <Pagination totalPages={totalPages} /> */}</div>
    </div>
  );
};

export default Page;
