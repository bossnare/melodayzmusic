import { Tabs } from './Tab';
import { navLabels } from './navigation.link';

const SidebarContentDesktop = () => {
  return (
    <ul className="flex flex-col gap-1 p-0 lg:text-sm">
      {navLabels.map((tab) => (
        <li key={tab.id}>
          <Tabs href={tab.href} icon={tab.icon} label={tab.label} />
        </li>
      ))}
    </ul>
  );
};

export { SidebarContentDesktop };
