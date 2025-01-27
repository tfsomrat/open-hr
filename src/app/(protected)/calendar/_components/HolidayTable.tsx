import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TEvent } from "@/redux/features/calendarApiSlice/calendarType";

const HolidayTable = ({
  calendar,
  reason,
}: {
  calendar: TEvent[];
  reason: string;
}) => {
  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          <TableHead>{reason}</TableHead>
          <TableHead className="w-[20%]">Start</TableHead>
          <TableHead className="w-[20%]">End</TableHead>
          <TableHead className="w-[10%]">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calendar?.length > 0 &&
          calendar?.map((el: TEvent, i: number) => (
            <TableRow key={i}>
              <TableCell>{el?.reason}</TableCell>
              <TableCell>
                {new Date(el?.start_date)
                  .toDateString()
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")}
              </TableCell>
              <TableCell>
                {new Date(el?.end_date)
                  .toDateString()
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")}
              </TableCell>
              <TableCell>
                {el?.day_count} {el?.day_count! > 1 ? "days" : "day"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default HolidayTable;
