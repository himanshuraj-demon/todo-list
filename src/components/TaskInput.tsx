import React, { useState } from 'react';
import { Plus, Tag, Flame } from 'lucide-react';
import { Priority, CATEGORIES } from '../types';

interface TaskInputProps {
  onAddTask: (text: string, priority: Priority, category: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text.trim(), priority, category);
    setText('');
  };

  return (
    <form
      id="todo-task-input-form"
      onSubmit={handleSubmit}
      className="bg-white border-4 border-black p-5 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      <div className="flex flex-col gap-4">
        
        <div className="relative flex items-center">
          <input
            id="todo-task-text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a new objective..."
            className="w-full text-lg font-black text-stone-900 bg-transparent placeholder-stone-400 outline-hidden border-b-2 border-transparent focus:border-black py-2 pr-14 transition-colors"
            maxLength={120}
          />
          <button
            id="todo-task-submit-button"
            type="submit"
            disabled={!text.trim()}
            className="absolute right-0 h-10 w-10 border-2 border-black bg-black text-white hover:bg-[#e63946] disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-200 transition-colors cursor-pointer flex items-center justify-center"
            title="Add task"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

     
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-black/10">
          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-1.5 border-2 border-black bg-stone-50 px-2 py-1">
              <Tag size={12} className="text-black" strokeWidth={2.5} />
              <select
                id="todo-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-xs font-black uppercase tracking-wider text-black bg-transparent outline-hidden cursor-pointer border-0 py-0.5"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="text-black bg-white font-bold">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

           
            <div className="flex items-center gap-1.5 border-2 border-black bg-stone-50 px-2 py-1">
              <Flame size={12} className="text-black" strokeWidth={2.5} />
              <select
                id="todo-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="text-xs font-black uppercase tracking-wider text-black bg-transparent outline-hidden cursor-pointer border-0 py-0.5"
              >
                <option value="low" className="text-blue-700 bg-white font-bold">Low</option>
                <option value="medium" className="text-amber-700 bg-white font-bold">Medium</option>
                <option value="high" className="text-rose-700 bg-white font-bold">High</option>
              </select>
            </div>
          </div>

         
          <span className="text-[10px] font-black text-black/50 uppercase tracking-[0.2em] hidden sm:inline">
            [ENTER] TO RECORD
          </span>
        </div>
      </div>
    </form>
  );
}
