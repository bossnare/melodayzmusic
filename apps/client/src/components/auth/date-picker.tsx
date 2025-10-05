'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  value,
  onChangeAction,
  isPending,
}: {
  value?: string;
  onChangeAction?: (date: string | undefined) => void;
  isPending?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      {/* <Label htmlFor="date" className="px-1">
        {label}
      </Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={isPending}
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date
              ? date.toLocaleDateString()
              : value
              ? new Date(value).toLocaleDateString()
              : 'Selectionner une date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(value || date || '')}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChangeAction?.(date && date.toISOString());
              console.log(value, date);
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
