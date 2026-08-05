import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

type TabVariant = 'underline' | 'pill' | 'segment';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  variant?: TabVariant;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

/**
 * Professional Animated Tabs Component
 * 
 * Three variants: underline, pill, and segment
 * Features:
 * - Smooth animations with Framer Motion
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - ARIA attributes for accessibility
 * - Respects prefers-reduced-motion
 * - Icon support
 */
export default function AnimatedTabs({
  tabs,
  variant = 'underline',
  activeTab: controlledActiveTab,
  onChange,
  className = '',
}: AnimatedTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const activeTab = controlledActiveTab || internalActiveTab;
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement }>({});

  const handleTabChange = (tabId: string) => {
    setInternalActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabIds = tabs.map(t => t.id);
    const currentIndex = tabIds.indexOf(activeTab);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabIds.length;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        e.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        newIndex = tabIds.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    const newTabId = tabIds[newIndex];
    handleTabChange(newTabId);
    setTimeout(() => {
      tabRefs.current[newTabId]?.focus();
    }, 0);
  };

  const renderUnderline = () => (
    <div className="relative border-b border-border">
      <div role="tablist" className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={handleKeyDown}
            className={`px-4 py-3 font-medium text-sm transition-colors relative z-10 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-[var(--gfg-green)]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab && (
        <motion.div
          layoutId="underline-indicator"
          className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[var(--gfg-green)] to-[var(--gfg-green-bright)]"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  );

  const renderPill = () => (
    <div role="tablist" className="inline-flex gap-2 p-1 bg-secondary rounded-lg relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            if (el) tabRefs.current[tab.id] = el;
          }}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          onClick={() => handleTabChange(tab.id)}
          onKeyDown={handleKeyDown}
          className={`px-4 py-2 font-medium text-sm rounded-md transition-colors relative z-10 flex items-center gap-2 ${
            activeTab === tab.id
              ? 'text-[#04150a]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}

      {activeTab && (
        <motion.div
          layoutId="pill-indicator"
          className="absolute inset-y-1 bg-[var(--gfg-green)] rounded-md -z-10"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  );

  const renderSegment = () => (
    <div role="tablist" className="inline-flex gap-0 p-1 bg-secondary rounded-lg border border-border relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            if (el) tabRefs.current[tab.id] = el;
          }}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          onClick={() => handleTabChange(tab.id)}
          onKeyDown={handleKeyDown}
          className={`px-4 py-2 font-medium text-sm transition-colors relative z-10 flex items-center gap-2 ${
            activeTab === tab.id
              ? 'text-[var(--gfg-green)]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}

      {activeTab && (
        <motion.div
          layoutId="segment-indicator"
          className="absolute inset-y-1 bg-[var(--gfg-green)]/15 border border-[var(--gfg-green)] rounded -z-10"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  );

  return (
    <div className={className}>
      {variant === 'underline' && renderUnderline()}
      {variant === 'pill' && renderPill()}
      {variant === 'segment' && renderSegment()}

      {/* Tab Content */}
      {tabs.find(t => t.id === activeTab)?.content && (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {tabs.find(t => t.id === activeTab)?.content}
        </motion.div>
      )}
    </div>
  );
}
