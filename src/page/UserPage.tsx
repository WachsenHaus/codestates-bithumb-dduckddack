import { Box, Button, FormControl, Input, OutlinedInput } from '@mui/material';
import classNames from 'classnames';

const UserPage = () => {
  return (
    <Box gridColumn={`span 5`}>
      회원가입폼
      <FormControl
        onSubmit={() => {
          console.log('d');
        }}
      >
        <OutlinedInput placeholder="아이디" required />
        <OutlinedInput placeholder="닉네임" required />
        <OutlinedInput placeholder="비밀번호" required />
        <OutlinedInput placeholder="비밀번호2" required />

        <Input type="submit" aria-label="asdfdsaf" value="회원가입" />
      </FormControl>
    </Box>
  );
};

export default UserPage;
