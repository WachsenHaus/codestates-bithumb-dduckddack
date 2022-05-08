import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import SaveIcon from '@mui/icons-material/Save';

const DrawCanvasBar = ({
  onDraw,
  onSave,
}: {
  onDraw: () => void;
  onSave: () => void;
}) => {
  const [onOff, setOnOff] = useState<string | null>('off');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    console.log(newAlignment);
    setOnOff(newAlignment);
    onDraw && onDraw();
    if (newAlignment === 'onOff') {
      // onDraw && onDraw();
    } else if (newAlignment === 'onSave') {
      setOnOff('');
      onSave && onSave();
    }
  };

  return (
    <div className={classNames(`flex justify-center items-center`)}>
      <ToggleButtonGroup value={onOff} exclusive onChange={handleAlignment}>
        <ToggleButton value="onOff" aria-label="draw onOff">
          <BrushIcon />
        </ToggleButton>
        <ToggleButton value="onSave" aria-label="draw onSave">
          <SaveIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default DrawCanvasBar;
