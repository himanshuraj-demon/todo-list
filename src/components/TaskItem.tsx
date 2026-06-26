import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Edit2, Check, X, Calendar } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskItemProps {
  key?: React.Key;
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
}

const priorityColors: Record<Priority, { dot: string; bg: string; text: string; border: string }> = {
  high: {
    dot: 'bg-[#e63946]',
    bg: 'bg-[#e63946]/5',
    text: 'text-[#e63946]',
    border: 'border-black',
  },
  medium: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-500/5',
    text: 'text-amber-700',
    border: 'border-black',
  },
  low: {
    dot: 'bg-blue-600',
    bg: 'bg-blue-600/5',
    text: 'text-blue-700',
    border: 'border-black',
  },
};

export default function TaskItem({ task, onToggleComplete, onDelete, onUpdateText }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdateText(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const colors = priorityColors[task.priority];

  return (
    <motion.div
      id={`task-item-${task.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-center justify-between border-4 border-black ${
        task.completed ? 'bg-stone-100/50' : `${colors.bg}`
      } rounded-none p-4 gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        
        <button
          id={`task-toggle-${task.id}`}
          onClick={() => onToggleComplete(task.id)}
          className={`relative flex items-center justify-center w-8 h-8 border-4 border-black transition-all cursor-pointer flex-shrink-0 ${
            task.completed
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#e63946]/10'
          }`}
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && (
            <div className="w-4 h-4 bg-[#e63946]" />
          )}
        </button>

        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              id={`task-edit-input-${task.id}`}
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full text-black border-0 border-b-4 border-black outline-hidden bg-transparent py-0.5 text-lg font-black tracking-tight"
              maxLength={120}
            />
          ) : (
            <div className="flex flex-col gap-1.5">
              <span
                id={`task-text-${task.id}`}
                onDoubleClick={() => !task.completed && setIsEditing(true)}
                className={`text-lg sm:text-xl font-black tracking-tight leading-none break-words cursor-pointer select-none ${
                  task.completed ? 'text-black/30 line-through' : 'text-black'
                }`}
              >
                {task.text}
              </span>

              
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-wider text-black/60">
                <span className="bg-black text-white px-2 py-0.5 font-black">
                  {task.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} strokeWidth={2.5} />
                  {formatTime(task.createdAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-black">
                  <span className={`w-2 h-2 border border-black ${colors.dot}`} />
                  {task.priority}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {!task.completed && !isEditing && (
          <button
            id={`task-edit-btn-${task.id}`}
            onClick={() => setIsEditing(true)}
            className="p-1.5 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            title="Edit task"
          >
            <Edit2 size={13} strokeWidth={2.5} />
          </button>
        )}
        <button
          id={`task-delete-btn-${task.id}`}
          onClick={() => onDelete(task.id)}
          className="p-1.5 border-2 border-black bg-white text-black hover:bg-[#e63946] hover:text-white transition-colors cursor-pointer"
          title="Delete task"
        >
          <Trash2 size={13} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
