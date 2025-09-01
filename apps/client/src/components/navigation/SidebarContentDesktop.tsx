import { Tabs } from './Tab';
import { navLabels } from './labels/navigation.link';

const SidebarContentDesktop = () => {
  return (
    <ul className="flex flex-col">
      {navLabels.map((tab) => (
        <li key={tab.id}>
          <Tabs href={tab.href} Icon={tab.icon} label={tab.label} />
        </li>
      ))}
    </ul>
  );
};

export { SidebarContentDesktop };
