import { useMemo } from "react";
import CurrentDateSection from "@/components/current-date-section.tsx";
import AddTodoSection from "@/components/add-todo-section";
import TaskItem from "@/components/task-item";
import useTodoStore from "@/stores/todoStore";
import { DAYS, MONTHS, TimeRangeType } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import AppContainer from "@/components/ui/app-container";
import ContentContainer from "@/components/ui/content-container";
import { MenuBar, MenuBarButton } from "@/components/ui/menu-bar";
import TodosList from "@/components/todos-list";
import useFilteredTodos from "@/hooks/use-filtred-todos.ts";
import { useShallow } from "zustand/react/shallow";

const TIME_RANGES: TimeRangeType[] = ["Day", "Month", "Year"];

const App = () => {
  const { timeRange, setTimeRange, currentDate } = useTodoStore(
    useShallow((state) => ({
      timeRange: state.timeRange,
      setTimeRange: state.setTimeRange,
      currentDate: state.currentDate,
    })),
  );
  const filteredTodos = useFilteredTodos();

  const currentDateObj = new Date(currentDate);

  // useLocalStorageUpdate();

  const { pinnedTodos, unpinnedTodos } = useMemo(() => {
    return {
      pinnedTodos: filteredTodos.filter((todo) => todo.isPinned),
      unpinnedTodos: filteredTodos.filter((todo) => !todo.isPinned),
    };
  }, [filteredTodos]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContainer className="md:py-8">
        <ContentContainer>
          <MenuBar className="gap-10">
            {TIME_RANGES.map((range) => (
              <MenuBarButton
                key={range}
                onClick={() => setTimeRange(range)}
                isActive={timeRange === range}
              >
                {range}
              </MenuBarButton>
            ))}
          </MenuBar>
          <CurrentDateSection />
          {timeRange === "Day" && <AddTodoSection />}
          <TodosList className="relative h-full px-5 md:px-20">
            {filteredTodos.length > 0 ? (
              <>
                {pinnedTodos.length > 0 && (
                  <div className="border-b border-white">
                    {pinnedTodos.map((todo) => (
                      <TaskItem key={todo.id} todo={todo} />
                    ))}
                  </div>
                )}
                {unpinnedTodos.map((todo) => (
                  <TaskItem key={todo.id} todo={todo} />
                ))}
              </>
            ) : (
              <div className="absolute left-1/2 top-1/4 w-full -translate-x-1/2 -translate-y-1/2 text-center text-3xl text-zinc-200">
                No tasks for{" "}
                {timeRange === "Day"
                  ? DAYS[currentDateObj.getDay()]
                  : timeRange === "Month"
                    ? MONTHS[currentDateObj.getMonth()]
                    : currentDateObj.getFullYear()}
              </div>
            )}
          </TodosList>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
