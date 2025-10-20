import { ModeEnum } from '@src/core/enums/mode.enum';
import { getTabButtonStyle, getTabsContainerStyle } from '../utils/styles';

type DifficultyTabsProps = {
  activeTab: ModeEnum;
  onTabChange: (mode: ModeEnum) => void;
};

const modes = [ModeEnum.Easy, ModeEnum.Medium, ModeEnum.Hard] as const;

export const DifficultyTabs = ({ activeTab, onTabChange }: DifficultyTabsProps) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, mode: ModeEnum) => {
    if (activeTab !== mode) {
      e.currentTarget.style.backgroundColor = 'rgba(0, 224, 234, 0.2)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, mode: ModeEnum) => {
    if (activeTab !== mode) {
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div className="difficulty-tabs" style={getTabsContainerStyle()}>
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onTabChange(mode)}
          style={getTabButtonStyle(activeTab === mode)}
          onMouseEnter={(e) => handleMouseEnter(e, mode)}
          onMouseLeave={(e) => handleMouseLeave(e, mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};
