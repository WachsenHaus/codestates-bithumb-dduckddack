import { TextField, Button, Input, Avatar } from '@mui/material';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import MainWrapper from '../components/Common/MainWrapper';
import CONST_ROUTE from '../Routes';

type Inputs = {
  email: string;
  password1: string;
  password2: string;
  nickName: string;
  input?: any;
};

const MyPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    control,
    formState,
    setFocus,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div
      className={classNames(
        `w-full h-full`,
        `flex justify-center items-center`
      )}
    >
      <MainWrapper
        className={classNames(
          `w-1/2 h-3/4`,
          `flex justify-center items-center`
        )}
      >
        <form className={classNames(`w-1/2`)}>
          <div
            className={classNames(`grid gap-y-10`)}
            style={{
              gridTemplateColumns: '70% auto',
            }}
          >
            <div>
              <div className={classNames(``)}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  type="email"
                  label="ID"
                />
              </div>

              <div className={classNames(``)}>
                <TextField
                  {...register('nickName')}
                  required
                  fullWidth
                  type="text"
                  label="닉네임"
                />
              </div>
              <div className={classNames(``)}>
                <TextField
                  {...register('password1')}
                  required
                  fullWidth
                  type="password"
                  label="password1"
                />
              </div>
              <div className={classNames(``)}>
                <TextField
                  {...register('password2')}
                  required
                  fullWidth
                  type="password"
                  label="password2"
                />
              </div>
            </div>
            <div className={classNames(`flex justify-center items-center`)}>
              <div
                className={classNames(
                  `flex flex-col justify-center items-center`
                )}
              >
                <Avatar src="" />
                <Button
                  onClick={async () => {
                    const element = document.querySelector(
                      'input[data-inputProfile]'
                    );
                    if (element) {
                      const input = element as HTMLInputElement;
                      input.click();
                    }
                  }}
                >
                  업로드
                </Button>
                <input
                  data-inputProfile
                  className={classNames('hidden')}
                  {...register('input')}
                  type="file"
                />
              </div>
            </div>
          </div>

          <div
            className={classNames(
              `col-span-full flex justify-center items-center`
            )}
          >
            <Button type="submit">정보 수정</Button>
          </div>
        </form>
      </MainWrapper>
    </div>
  );
};

export default MyPage;
