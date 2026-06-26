import { FilterType } from '../types';

interface TaskStatsProps {
  activeCount: number;
  completedCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export default function TaskStats({
  activeCount,
  completedCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}: TaskStatsProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div
      id="todo-stats-bar"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-4 border-black rounded-none text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      
      <span id="todo-active-count" className="font-mono text-black">
        {activeCount === 0 ? 'No tasks remaining' : `${activeCount} task${activeCount === 1 ? '' : 's'} left`}
      </span>

      
      <div id="todo-filters" className="flex items-center gap-1 border-2 border-black bg-stone-50 p-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            id={`todo-filter-${filter.value}`}
            onClick={() => onFilterChange(filter.value)}
            className={`px-3 py-1 rounded-none transition-all cursor-pointer font-black ${
              currentFilter === filter.value
                ? 'bg-black text-white'
                : 'text-black hover:bg-black/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

     
      <div className="min-h-6 flex items-center justify-end w-full sm:w-auto">
        {completedCount > 0 && (
          <button
            id="todo-clear-completed"
            onClick={onClearCompleted}
            className="px-3 py-1 border-2 border-black bg-white text-black hover:bg-[#e63946] hover:text-white transition-all cursor-pointer font-black text-[10px]"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
