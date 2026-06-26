import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckSquare, ListFilter, ClipboardList } from 'lucide-react';
import { Task, Priority, FilterType, CATEGORIES } from './types';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import TaskStats from './components/TaskStats';

const STORAGE_KEY = 'simple-todo-app-tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 'init-1',
    text: 'Welcome to your minimalist Todo list!',
    completed: false,
    priority: 'low',
    category: 'Personal',
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'init-2',
    text: 'Try double-clicking a task to edit its text inline',
    completed: false,
    priority: 'medium',
    category: 'Work',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'init-3',
    text: 'Check this box to complete this starter task',
    completed: true,
    priority: 'high',
    category: 'Personal',
    createdAt: Date.now() - 1800000,
  }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  
  const handleAddTask = (text: string, priority: Priority, category: string) => {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      text,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };
    setTasks((prev:Task[]) => [newTask, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev:Task[]) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev:Task[]) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateText = (id: string, newText: string) => {
    setTasks((prev:Task[]) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev:Task[]) => prev.filter((task) => !task.completed));
  };


  const activeCount = useMemo(() => tasks.filter((t:Task) => !t.completed).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter((t:Task) => t.completed).length, [tasks]);

 
  const filteredTasks = useMemo(() => {
    return tasks.filter((task:Task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;

      return matchesFilter && matchesCategory;
    });
  }, [tasks, filter, selectedCategory]);

  const formattedDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  }, []);

  return (
    <div
      id="todo-app-root"
      className="min-h-screen w-full flex flex-col justify-start items-center p-4 sm:p-8 md:p-16 selection:bg-stone-200"
    >
      <div id="todo-main-container" className="w-full max-w-2xl flex flex-col gap-8 mt-2 md:mt-6">
        
      
        <header id="todo-app-header" className="flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b-4 border-black pb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e63946] mb-1">
              Organization System v2.0
            </p>
            <h1 className="text-6xl sm:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-black">
              Today
            </h1>
          </div>
          <div className="text-left sm:text-right font-black uppercase">
            <p className="text-5xl font-black leading-none text-black">
              {new Date().getDate()}
            </p>
            <p className="text-xs font-black tracking-widest text-black/60 mt-0.5">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </header>

        
        <section id="todo-input-section">
          <TaskInput onAddTask={handleAddTask} />
        </section>

       
        <section id="todo-categories-filter" className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black/70">
            <ListFilter size={12} strokeWidth={3} />
            <span>Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              id="todo-category-filter-all"
              onClick={() => setSelectedCategory('All')}
              className={`text-xs px-3 py-1.5 border-2 border-black font-black uppercase tracking-wider transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                selectedCategory === 'All'
                  ? 'bg-black text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-black/5'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`todo-category-filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 border-2 border-black font-black uppercase tracking-wider transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-none translate-x-[1px] translate-y-[1px]'
                    : 'bg-white text-black hover:bg-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

    
        <section id="todo-stats-section">
          <TaskStats
            activeCount={activeCount}
            completedCount={completedCount}
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        </section>

   
        <main id="todo-list-container" className="flex flex-col gap-4 min-h-[160px]">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onUpdateText={handleUpdateText}
                />
              ))
            ) : (
              <motion.div
                id="todo-empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-6 border-4 border-dashed border-black bg-white rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center gap-3"
              >
                <ClipboardList size={36} className="text-black stroke-[2.5]" />
                <div>
                  <p className="text-base font-black uppercase tracking-wider text-black">
                    No matching objectives
                  </p>
                  <p className="text-xs font-black text-black/50 mt-1 uppercase tracking-wide">
                    Try updating your category filter or add a fresh focus!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
