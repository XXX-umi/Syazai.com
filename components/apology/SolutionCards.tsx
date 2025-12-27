'use client';

import { Calendar, Gift, Train, Shield, Disc, ExternalLink, Lightbulb } from 'lucide-react';
import { SolutionCard } from '@/data/situations';
import { Card, CardContent } from '@/components/ui/card';

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  Gift,
  Train,
  Shield,
  Disc,
};

interface SolutionCardsProps {
  solutions: SolutionCard[];
}

export function SolutionCards({ solutions }: SolutionCardsProps) {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Lightbulb;
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-zinc-600" />
          <h3 className="font-semibold text-zinc-900">二度とこのミスをしないために</h3>
        </div>
        <p className="text-xs text-zinc-500 mt-1">再発防止のためのおすすめツール</p>
      </div>

      <div className="p-4 space-y-3">
        {solutions.map((solution) => {
          const Icon = getIcon(solution.icon);
          return (
            <Card
              key={solution.id}
              className="group hover:shadow-md transition-all duration-200 cursor-pointer border-zinc-100 hover:border-zinc-200"
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-200 transition-colors">
                    <Icon className="h-5 w-5 text-zinc-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-zinc-900 truncate">
                        {solution.title}
                      </h4>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
