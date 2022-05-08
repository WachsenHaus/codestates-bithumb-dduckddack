import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

const DrawSave = ({ onClick }: { onClick?: () => void }) => {
  const [onSave, setOnSave] = useState<string | null>('');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setOnSave(newAlignment);
    onClick && onClick();
  };

  return (
    <div className={classNames(`flex justify-center items-center`)}>
      <ToggleButtonGroup value={onSave} exclusive onChange={handleAlignment}>
        <ToggleButton value="onSave" aria-label="onSave">
          <SaveIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default DrawSave;
