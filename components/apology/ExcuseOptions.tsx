'use client';

import { Thermometer, Wifi, TrainFront, Home, Ban } from 'lucide-react';
import { ExcuseType } from '@/data/situations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const excuseOptions: { type: ExcuseType; label: string; icon: React.ElementType }[] = [
  { type: 'health', label: '体調不良', icon: Thermometer },
  { type: 'system', label: 'システム障害', icon: Wifi },
  { type: 'traffic', label: '交通機関の遅延', icon: TrainFront },
  { type: 'family', label: '家庭の事情', icon: Home },
];

interface ExcuseOptionsProps {
  selectedExcuse: ExcuseType;
  onExcuseChange: (excuse: ExcuseType) => void;
  availableExcuses?: ExcuseType[];
}

export function ExcuseOptions({
  selectedExcuse,
  onExcuseChange,
  availableExcuses,
}: ExcuseOptionsProps) {
  const handleToggle = (excuse: ExcuseType, checked: boolean) => {
    if (checked) {
      onExcuseChange(excuse);
    } else {
      onExcuseChange('none');
    }
  };

  return (
    <div className="bg-zinc-50 rounded-lg border border-zinc-100 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Ban className="h-4 w-4 text-zinc-500" />
        <h4 className="font-medium text-sm text-zinc-700">言い訳オプション</h4>
        <span className="text-xs text-zinc-400">(任意)</span>
      </div>

      <div className="space-y-3">
        {excuseOptions.map(({ type, label, icon: Icon }) => {
          const isAvailable = !availableExcuses || availableExcuses.includes(type);
          const isSelected = selectedExcuse === type;

          return (
            <div
              key={type}
              className={cn(
                'flex items-center justify-between p-2 rounded-md transition-colors',
                isSelected && 'bg-white shadow-sm',
                !isAvailable && 'opacity-50'
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn('h-4 w-4', isSelected ? 'text-zinc-700' : 'text-zinc-400')} />
                <Label
                  htmlFor={`excuse-${type}`}
                  className={cn(
                    'text-sm cursor-pointer',
                    isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-600'
                  )}
                >
                  {label}
                </Label>
              </div>
              <Switch
                id={`excuse-${type}`}
                checked={isSelected}
                onCheckedChange={(checked) => handleToggle(type, checked)}
                disabled={!isAvailable}
                className="data-[state=checked]:bg-zinc-900"
              />
            </div>
          );
        })}
      </div>

      {selectedExcuse !== 'none' && (
        <p className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-200">
          選択した言い訳が謝罪文に反映されます
        </p>
      )}
    </div>
  );
}
