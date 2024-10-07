import { ChevronLeft, ChevronRight } from "lucide-react";

import ButtonIcon from "@/components/button-icon.tsx";
import useTodoStore from "@/stores/todoStore.ts";
import { DAYS, MONTHS } from "@/lib/utils.ts";
import { useShallow } from "zustand/react/shallow";

const CurrentDateSection = () => {
  const { currentDate, incrementDay, decrementDay, timeRange } = useTodoStore(
    useShallow((state) => ({
      currentDate: state.currentDate,
      incrementDay: state.incrementDay,
      decrementDay: state.decrementDay,
      timeRange: state.timeRange,
    })),
  );

  const handleTimeRangeChange = () => {
    switch (timeRange) {
      case "Day": {
        return DAYS[currentDate.getDay()];
      }
      case "Month": {
        return MONTHS[currentDate.getMonth()];
      }
      case "Year": {
        return currentDate.getFullYear();
      }
    }
  };

  return (
    <section
      className={
        "flex w-full max-w-md items-center justify-between self-center py-14"
      }
    >
      <ButtonIcon
        onClick={decrementDay}
        title={"Decrement day"}
        classname={"group hover:bg-transparent "}
      >
        <ChevronLeft className="h-12 w-12 text-zinc-400 transition group-hover:text-zinc-200" />
      </ButtonIcon>
      <div className={"flex flex-col items-center gap-2"}>
        <span className={"text-4xl font-bold text-zinc-200"}>
          {handleTimeRangeChange()}
        </span>
        <span className={"text-md text-zinc-500"}>
          {timeRange === "Day" &&
            MONTHS[currentDate.getMonth()] +
              " " +
              currentDate.getDate() +
              ", " +
              currentDate.getFullYear()}
        </span>
      </div>
      <ButtonIcon
        onClick={incrementDay}
        title={"Increment day"}
        classname={"group hover:bg-transparent "}
      >
        <ChevronRight className="h-12 w-12 text-zinc-400 transition group-hover:text-zinc-200" />
      </ButtonIcon>
    </section>
  );
};

export default CurrentDateSection;
