import { useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Install and import `isBetween` plugin if needed
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export const filterDataByDate = (data, filter) => {
  const now = dayjs();

  switch (filter) {
    case "today":
      return data.filter((item) => dayjs(item.date).isToday());

    case "yesterday":
      return data.filter((item) => dayjs(item.date).isYesterday());

    case "this week":
      return data.filter((item) =>
        dayjs(item.date).isBetween(
          dayjs().startOf("week"),
          dayjs().endOf("week")
        )
      );

    case "this month":
      return data.filter((item) => dayjs(item.date).isSame(now, "month"));

    case "this quarter":
      const startOfQuarter = now.startOf("quarter");
      return data.filter((item) =>
        dayjs(item.date).isSameOrAfter(startOfQuarter)
      );

    case "yearly":
      return data.filter((item) => dayjs(item.date).isSame(now, "year"));

    case "all time":
      return data; // Return all data

    default:
      return data; // If no filter is matched, return all data
  }
};
