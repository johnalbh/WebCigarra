import type { IconType } from 'react-icons';
import {
  HiMusicNote, HiBookOpen, HiSparkles,
  HiCube, HiGlobe, HiHeart,
  HiStar, HiUsers, HiAcademicCap,
  HiDesktopComputer, HiHome, HiSun,
  HiUserGroup, HiShoppingBag, HiGlobeAlt,
  HiLightBulb, HiCamera, HiFilm,
} from 'react-icons/hi';

export const ICON_MAP: Record<string, IconType> = {
  HiMusicNote,
  HiBookOpen,
  HiSparkles,
  HiCube,
  HiGlobe,
  HiGlobeAlt,
  HiHeart,
  HiStar,
  HiUsers,
  HiAcademicCap,
  HiDesktopComputer,
  HiHome,
  HiSun,
  HiUserGroup,
  HiShoppingBag,
  HiLightBulb,
  HiCamera,
  HiFilm,
};

export const DEFAULT_ICON: IconType = HiStar;
export const DEFAULT_COLOR = '#6366f1';

export function getIcon(name: string | null | undefined): IconType {
  if (!name) return DEFAULT_ICON;
  return ICON_MAP[name] ?? DEFAULT_ICON;
}
