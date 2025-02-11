"use client";

import Pagination from "@/components/pagination";
import SearchBox from "@/components/search-box";
import { useDialog } from "@/hooks/useDialog";
import useLocalCacheHook from "@/hooks/useLocalCacheHook";
import { useGetAssetsQuery } from "@/redux/features/assetApiSlice/assetSlice";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { notFound, useSearchParams } from "next/navigation";
import AssetInsert from "./_components/asset-insert";
import AssetPage from "./_components/asset-page";

const Asset = () => {
  const searchParams = useSearchParams();
  const { isDialogOpen, onDialogChange } = useDialog();
  const { limit } = useAppSelector((state) => state.filter);
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  // get all Data
  const { data } = useGetAssetsQuery({
    page: page ? Number(page) : 1,
    limit: limit,
    search: search ? search : "",
  });

  const { result: assets, meta } = data || {};

  const { localData } = useLocalCacheHook(
    {
      data: assets!,
    },
    "erp-assets"
  );

  // check module enabled or not
  const { modules } = useAppSelector((state) => state["setting-slice"]);
  if (!modules.find((mod) => mod.name === "asset")?.enable) {
    return notFound();
  }

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Dialog modal={true} open={isDialogOpen} onOpenChange={onDialogChange}>
          <DialogTrigger asChild>
            <Button>Add New Asset</Button>
          </DialogTrigger>
          <AssetInsert onDialogChange={onDialogChange} />
        </Dialog>
        <SearchBox />
        <Pagination total={meta?.total!} className="ml-auto hidden md:flex" />
      </div>

      <Table>
        <TableHeader className="sticky top-0">
          <TableRow className="sticky top-0">
            <TableHead className="sticky top-0">Name</TableHead>
            <TableHead className="sticky top-0">User</TableHead>
            <TableHead className="sticky top-0">Tag ID</TableHead>
            <TableHead className="sticky top-0">Price</TableHead>
            <TableHead className="sticky top-0">Purchase</TableHead>
            <TableHead className="sticky top-0 text-right">More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!assets?.length && (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="loader">
                  <div className="loader-line" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {assets?.length ? (
            <AssetPage asset={assets} />
          ) : (
            <AssetPage asset={localData} />
          )}
        </TableBody>
      </Table>

      <Pagination
        total={meta?.total!}
        className="ml-auto flex md:hidden mt-5"
      />
    </section>
  );
};

export default Asset;
