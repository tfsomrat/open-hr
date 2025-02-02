import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormat } from "@/lib/date-converter";
import { TEvent } from "@/redux/features/calendarApiSlice/calendarType";

const CalendarList = ({
  calendar,
  listType,
}: {
  calendar: TEvent[];
  listType: string;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{listType}</TableHead>
          <TableHead className="w-[20%]">Start</TableHead>
          <TableHead className="w-[20%]">End</TableHead>
          <TableHead className="w-[10%]">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calendar?.length > 0 &&
          calendar?.map((el: TEvent, i: number) => (
            <TableRow key={i}>
              <TableCell className="capitalize font-medium">
                {el?.reason}
              </TableCell>
              <TableCell>{dateFormat(el?.start_date)}</TableCell>
              <TableCell>{dateFormat(el?.end_date)}</TableCell>
              <TableCell>
                {el?.day_count} {el?.day_count! > 1 ? "days" : "day"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CalendarList;
