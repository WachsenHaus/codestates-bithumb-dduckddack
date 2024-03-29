import {
  TextField,
  Button,
  Input,
  Avatar,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { API_USER } from '../api/user.api';
import { atomUserInfo } from '../atom/user.atom';
import MainWrapper from '../components/Common/MainWrapper';
import CONST_ROUTE from '../Routes';
import { dduckddackResponseVO } from '../type/api';
import defaultAvatar from '../asset/img/default.png';

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

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(atomUserInfo);
  const [profileImg, setProfileImg] = useState<string | undefined>(
    defaultAvatar
  );

  useEffect(() => {
    if (userInfo.userInfo?.email) {
      setValue('email', userInfo.userInfo.email);
    }
  }, [userInfo]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      let blob: string | Blob = '';
      profileImg &&
        (await fetch(profileImg).then(async (res) => {
          blob = await res.blob();
        }));
      if (profileImg) {
        formData.append('file', blob, uuidv4());
        formData.append('password', data.password1);
        formData.append('nickName', data.nickName);
        formData.append('email', data.email);
        if (formData) {
          sendData(formData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = async (data: any) => {
    const result = await axios.put<dduckddackResponseVO<string>>(
      API_USER.MODIFY_USER,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (result.data.status === 'ok') {
      const prevUserInfo = JSON.parse(JSON.stringify(userInfo.userInfo));
      prevUserInfo.nickName = watch('nickName');
      prevUserInfo.imagePath = profileImg;

      setUserInfo((prevData) => {
        return {
          ...prevData,
          userInfo: prevUserInfo,
        };
      });
      navigate('/');
      console.log(result.data.message);
    }
  };

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
        <form className={classNames(`w-1/2`)} onSubmit={handleSubmit(onSubmit)}>
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
                  disabled
                  value={userInfo.userInfo?.email}
                  label="ID"
                />
              </div>
              <div className={classNames(``)}>
                <TextField
                  {...register('nickName', {
                    pattern: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{5,10}$/,
                  })}
                  required
                  fullWidth
                  type="text"
                  label="닉네임"
                  error={errors.nickName?.type === 'pattern'}
                />
              </div>
              {errors.nickName?.message !== undefined && (
                <div>
                  <FormHelperText
                    sx={{
                      color: 'red',
                    }}
                  >
                    6~10글자 숫자,영문,한글로 구성해주세요
                  </FormHelperText>
                </div>
              )}

              <div className={classNames(``)}>
                <TextField
                  {...register('password1', {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  })}
                  required
                  fullWidth
                  type="password"
                  label="password1"
                  error={errors.password1?.type === 'pattern'}
                />
              </div>
              <div className={classNames(``)}>
                <TextField
                  {...register('password2', {
                    validate: (value) => value === watch('password1'),
                  })}
                  required
                  fullWidth
                  type="password"
                  label="password2"
                  error={errors.password2?.message !== undefined}
                />
              </div>
            </div>
            <div className={classNames(`flex justify-center items-center`)}>
              <div
                className={classNames(
                  `flex flex-col justify-center items-center`
                )}
              >
                <Avatar
                  src={profileImg || userInfo.userInfo?.imagePath || ''}
                  onClick={async () => {
                    const element = document.querySelector(
                      'input[data-inputProfile]'
                    );
                    if (element) {
                      const input = element as HTMLInputElement;
                      input.click();
                    }
                  }}
                />
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
                  accept='"image/*'
                  onChange={async (e) => {
                    const file = e.target.files;
                    const reader = new FileReader();
                    file && reader.readAsDataURL(file[0]);
                    if (reader) {
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          setProfileImg(reader.result);
                        }
                      };
                    }
                  }}
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
