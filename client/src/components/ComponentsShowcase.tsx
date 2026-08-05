import { useState } from 'react';
import { motion } from 'motion/react';
import AnimatedTabs from './AnimatedTabs';
import AnimatedToggle from './AnimatedToggle';
import AnimatedProgressBar from './AnimatedProgressBar';
import { Sun, Moon, Code2, Settings, User } from 'lucide-react';

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: <Code2 size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <section id="components" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              Component Library
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Animated Components
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Professional, accessible React components built with Framer Motion. Perfect for building modern, interactive interfaces.
          </p>
        </motion.div>

        {/* Components Grid */}
        <div className="space-y-12">
          {/* Animated Tabs Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="surface-card p-8"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--gfg-green)]">Animated Tabs</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Three beautiful tab variants with smooth animations. Try switching between tabs.
            </p>

            <div className="space-y-8">
              {/* Underline Tabs */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Underline Variant</p>
                <AnimatedTabs
                  tabs={tabs}
                  variant="underline"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  className="mb-4"
                />
              </div>

              {/* Pill Tabs */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Pill Variant</p>
                <AnimatedTabs
                  tabs={tabs}
                  variant="pill"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  className="mb-4"
                />
              </div>

              {/* Segment Tabs */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Segment Variant</p>
                <AnimatedTabs
                  tabs={tabs}
                  variant="segment"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />
              </div>
            </div>
          </motion.div>

          {/* Animated Toggle Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="surface-card p-8"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--gfg-green)]">Animated Toggle</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Smooth toggle switches with spring animations. Available in three sizes and variants.
            </p>

            <div className="space-y-8">
              {/* Default Variant */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Default Variant</p>
                <div className="flex items-center gap-6 bg-card border border-border rounded-lg p-6">
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      size="sm"
                      label="Small toggle"
                    />
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      size="md"
                      label="Medium toggle"
                    />
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      size="lg"
                      label="Large toggle"
                    />
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>

              {/* Icon Variant */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Icon Variant</p>
                <div className="flex items-center gap-6 bg-card border border-border rounded-lg p-6">
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="icon"
                      icons={{ on: <Moon size={12} />, off: <Sun size={12} /> }}
                      size="sm"
                      label="Theme toggle"
                    />
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="icon"
                      icons={{ on: <Moon size={14} />, off: <Sun size={14} /> }}
                      size="md"
                      label="Theme toggle"
                    />
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="icon"
                      icons={{ on: <Moon size={16} />, off: <Sun size={16} /> }}
                      size="lg"
                      label="Theme toggle"
                    />
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>

              {/* Morph Variant */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Morph Variant</p>
                <div className="flex items-center gap-6 bg-card border border-border rounded-lg p-6">
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="morph"
                      size="sm"
                      label="Morph toggle"
                    />
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="morph"
                      size="md"
                      label="Morph toggle"
                    />
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedToggle
                      checked={darkMode}
                      onChange={setDarkMode}
                      variant="morph"
                      size="lg"
                      label="Morph toggle"
                    />
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Progress Bar Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="surface-card p-8"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--gfg-green)]">Animated Progress Bar</h3>
            <p className="text-muted-foreground text-sm mb-8">
              Smooth progress animations with customizable colors and duration.
            </p>

            <div className="bg-card border border-border rounded-lg p-6">
              {showProgress && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6"
                >
                  <AnimatedProgressBar
                    duration={3}
                    color="#16a34a"
                    height={4}
                    showLabel={true}
                  />
                </motion.div>
              )}

              <button
                onClick={() => setShowProgress(!showProgress)}
                className="px-6 py-2 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-semibold rounded-lg transition-colors"
              >
                {showProgress ? 'Stop' : 'Start'} Progress
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
