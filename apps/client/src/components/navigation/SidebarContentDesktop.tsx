import { Settings2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Tabs } from './Tab';
import { navLabels } from './labels/navigation.link';
import { Separator } from '../ui/separator';

const SidebarContentDesktop = () => {
  return (
    <>
      <figure className="flex items-center w-full gap-2 mt-4 mb-3">
        <figcaption className="flex gap-3 cursor-pointer grow active:bg-muted/80 lg:hover:bg-muted/50">
          <Avatar className="size-10 ring-2 ring-primary">
            <AvatarImage />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-semibold">John Doe</span>
            <span className="text-xs text-muted-foreground">Fan</span>
          </div>
        </figcaption>
        <Settings2 className="cursor-pointer hover:opacity-60" />
      </figure>
      <Separator />
      <ul className="flex flex-col w-full p-1 mt-3 rounded-md bg-background/60 dark:bg-card/50">
        {navLabels.map((tab) => (
          <li key={tab.id}>
            {tab.label === 'Moi' || tab.label === 'create' ? null : (
              <Tabs href={tab.href} Icon={tab.icon} label={tab.label} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export { SidebarContentDesktop };
