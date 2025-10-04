import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function RadioGroup1({ className }: { className?: string }) {
  return (
    <RadioGroup defaultValue="comfortable" className={className}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="homme" id="r1" />
        <Label htmlFor="r1">Homme</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="femme" id="r2" />
        <Label htmlFor="r2">Femme</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="autre" id="r3" />
        <Label htmlFor="r3">Autre</Label>
      </div>
    </RadioGroup>
  );
}
