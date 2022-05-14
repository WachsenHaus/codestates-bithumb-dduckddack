import _ from 'lodash';
import React, { useRef, useState } from 'react';

const useKeywordDeboune = () => {
  const [keyword, setKeyword] = useState('');

  const delayKeyword = useRef(
    _.debounce((word) => debounceKeyword(word), 300)
  ).current;

  const debounceKeyword = (word: any) => {
    setKeyword(word);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const keyword = e.target.value as string;
    delayKeyword(keyword);
  };

  return [keyword, onChange] as const;
};

export default useKeywordDeboune;
