import Search from "@/components/Search";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Table from "@/components/Table";
import { Separator } from "@/components/ui/separator";
import PaginationComponent from "@/components/PaginationComponent";

const Page = async (props: { searchParams: Promise<{ query?: string; page?: string }> }) => {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="global-grid mt-20 flex-col">
      <h3 className="font-light col-span-12">Szukaj filmów i seriali</h3>
      <div className="flex items-center justify-between gap-2 col-span-6">
        <Search />
      </div>
      <Separator orientation="horizontal" className="col-span-12" />
      {query ? (
        <p className="col-span-12 mt-5 ">
          Wyniki wyszukiwania dla: <q className="text-primary">{query}</q>
        </p>
      ) : null}
      <Suspense key={query + currentPage} fallback={<Skeleton className="w-40 h-10" />}>
        <Table query={query} page={1} />
      </Suspense>
      <div className="mt-20 flex w-full justify-center col-span-12">
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Page;
