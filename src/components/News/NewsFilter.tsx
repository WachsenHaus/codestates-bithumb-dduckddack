import React, { useRef, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames';

const NewsFilter = ({
  onChange,
}: {
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}) => {
  return (
    <div className={classNames(`flex items-center bg-bithumbGray`)}>
      <div className={classNames(`mx-5`)}>디지털 자산 뉴스</div>
      <TextField
        variant="standard"
        sx={{
          flexGrow: 1,
          input: {
            border: 0,
            color: 'white',
          },
          border: 0,
          borderColor: 'transparent',
        }}
        placeholder="검색"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: '#FF9900',
                }}
              />
            </InputAdornment>
          ),
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default NewsFilter;
