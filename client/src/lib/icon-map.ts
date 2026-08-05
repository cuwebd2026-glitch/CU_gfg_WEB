import {
  Zap,
  Users,
  Code,
  Code2,
  BookOpen,
  Rocket,
  Mail,
  MessageSquare,
  User,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps icon name strings (used in content.ts data) to lucide-react components.
 * Keeps content data serializable/JSON-friendly while still allowing icon rendering.
 */
export const iconMap: Record<string, LucideIcon> = {
  Zap,
  Users,
  Code,
  Code2,
  BookOpen,
  Rocket,
  Mail,
  MessageSquare,
  User,
  Instagram,
  Github,
  Linkedin,
  Twitter,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Zap;
}
