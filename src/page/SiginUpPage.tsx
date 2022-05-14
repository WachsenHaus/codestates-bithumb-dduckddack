import {
  Box,
  Button,
  FormControl,
  Input,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { ReactNode } from 'react';
import MainWrapper from '../components/Common/MainWrapper';

const SignUpRow = (props: { children?: ReactNode; className?: string }) => {
  return (
    <div
      {...props}
      className={classNames(` col-span-full flex items-center justify-center`)}
    >
      {props.children}
    </div>
  );
};

const SiginUpPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      className={classNames(`grid grid-cols-12  w-full h-full`, `text-white`)}
    >
      <MainWrapper
        className={classNames(
          `col-start-4 col-span-6`,
          `flex items-center justify-between flex-col`,
          `my-32 p-12`
        )}
      >
        <Typography component={'h1'} variant={'h5'}>
          회원가입
        </Typography>
        <FormControl
          onSubmit={() => {
            console.log('d');
          }}
          className={classNames(`w-1/2`)}
        >
          <div className={classNames(`grid grid-cols-6 gap-y-5`)}>
            <SignUpRow>
              <TextField
                required
                autoFocus
                sx={{
                  width: '80%',
                }}
                type="email"
                id="email"
                name="email"
                label="이메일 주소"
                // error={emailError !== '' || false}
              />
              <Button>인증 보내기</Button>
            </SignUpRow>
            <SignUpRow>
              <TextField
                required
                autoFocus
                fullWidth
                type="emailVerify"
                id="emailVerify"
                name="emailVerify"
                label="이메일 인증번호"
                // error={emailError !== '' || false}
              />
            </SignUpRow>
            <SignUpRow>
              <TextField
                required
                autoFocus
                fullWidth
                type="nickName"
                id="nickName"
                name="nickName"
                label="닉네임"
                // error={nickNameError !== '' || false}
              />
            </SignUpRow>
            <SignUpRow>
              <TextField
                required
                autoFocus
                fullWidth
                type="password1"
                id="password1"
                name="password1"
                label="비밀번호"
                // error={nickNameError !== '' || false}
              />
            </SignUpRow>
            <SignUpRow>
              <TextField
                required
                autoFocus
                fullWidth
                type="password2"
                id="password2"
                name="password2"
                label="비밀번호 확인"
                // error={nickNameError !== '' || false}
              />
            </SignUpRow>
            <SignUpRow>
              <Input
                fullWidth
                type="submit"
                aria-label="asdfdsaf"
                value="회원가입"
              />
            </SignUpRow>
          </div>
        </FormControl>
      </MainWrapper>
    </div>
  );
};

export default SiginUpPage;
