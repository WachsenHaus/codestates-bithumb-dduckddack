import {
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import BrushIcon from '@mui/icons-material/Brush';

const DrawModeToggle = ({ onClick }: { onClick: () => void }) => {
  const [onOff, setOnOff] = useState<string | null>('off');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setOnOff(newAlignment);
    onClick();
  };

  return (
    <div className={classNames(`flex justify-center items-center`)}>
      <ToggleButtonGroup value={onOff} exclusive onChange={handleAlignment}>
        <ToggleButton value="onOff" aria-label="draw OnOff">
          <BrushIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default DrawModeToggle;
