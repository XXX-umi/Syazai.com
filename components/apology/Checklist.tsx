'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, ListChecks } from 'lucide-react';
import { ChecklistItem } from '@/data/situations';
import { cn } from '@/lib/utils';

interface ChecklistProps {
  items: ChecklistItem[];
}

export function Checklist({ items }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / items.length) * 100;
  const allChecked = checkedItems.size === items.length;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      <div className="p-4 border-b border-zinc-100 bg-blue-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-blue-900" />
            <h3 className="font-semibold text-blue-900">送信前チェックリスト</h3>
          </div>
          <span className="text-xs text-zinc-500">
            {checkedItems.size}/{items.length}
          </span>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-300 rounded-full',
              allChecked ? 'bg-green-500' : 'bg-blue-900'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-zinc-100">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="w-full p-3 flex items-center gap-3 hover:bg-zinc-50 transition-colors text-left"
            >
              {isChecked ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-zinc-300 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm transition-colors',
                  isChecked ? 'text-zinc-400 line-through' : 'text-zinc-700'
                )}
              >
                {item.text}
              </span>
            </button>
          );
        })}
      </div>

      {allChecked && (
        <div className="p-4 bg-green-50 border-t border-green-100">
          <p className="text-sm text-green-700 font-medium text-center">
            全ての確認が完了しました。送信準備OKです。
          </p>
        </div>
      )}
    </div>
  );
}
