"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 rounded-2xl glass bg-white/20 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700 backdrop-blur-xl shadow-inner transition-all",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-900 dark:text-gray-100",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-white/30 dark:bg-gray-800/50 hover:bg-white/40 dark:hover:bg-gray-700"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-gray-700 dark:text-gray-300 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell:
          "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-yellow-400 text-gray-900 dark:text-black hover:bg-yellow-300 focus:bg-yellow-300 rounded-md",
        day_today: "border border-yellow-400 text-yellow-500",
        day_outside:
          "text-gray-400 dark:text-gray-600 opacity-50 aria-selected:bg-gray-800/20",
        day_disabled: "text-gray-400 dark:text-gray-600 opacity-50",
        day_range_middle:
          "aria-selected:bg-yellow-200 dark:aria-selected:bg-yellow-800",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <ChevronLeft className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        ),
        IconRight: () => (
          <ChevronRight className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        ),
      }}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";

export default Calendar;
export { Calendar };
