import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { API_USER } from '../../api/user.api';
import { atomModalState, TypeChartImg } from '../../atom/modal.atom';
import { atomUserInfo, TypeLoginResponse } from '../../atom/user.atom';
import CONST_ROUTE from '../../Routes';
import MainWrapper from '../Common/MainWrapper';
import signLoading from '../../asset/img/signLoading.json';
import successSign from '../../asset/img/successSign.json';
import nonUser from '../../asset/img/nonUser.json';
import LottieDiv from '../Common/LottieDiv';

type Inputs = {
  email: string;
  password: string;
};

const CommonModal = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(atomUserInfo);

  const [modal, setModal] = useRecoilState(atomModalState);
  const [payload, setPayload] = useState<any | TypeChartImg | string>();
  const [flag, setFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const sendData = {
      email: data.email,
      password: data.password,
    };

    // 로딩 시작

    setIsLoading(true);
    const result = await onSignIn(sendData);
    if (result) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(false);
        setModal({
          modalState: false,
          modalType: 'sign',
          modalPayload: undefined,
        });
      }, 1300);
    } else {
      setFlag(true);
      setIsSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1300);
    }
    // 로딩 완료
  };

  useEffect(() => {
    if (modal.modalType === 'image') {
      const result = modal.modalPayload as string;
      if (result === undefined) {
        return;
      }
      setPayload(result);
    }
  }, [modal, modal.modalPayload]);

  const onSignIn = async (data: Inputs) => {
    try {
      // 이슈
      const result = await axios.post<TypeLoginResponse>(
        API_USER.LOGIN_USER,
        data
      );
      if (result.data.status === 'ok') {
        const { accessToken, refreshToken, userInfo } = result.data;
        if (userInfo === undefined) {
          return;
        }
        const { email, id, imagePath, nickName } = userInfo;
        if (email && id && imagePath && nickName) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('email', email);
          localStorage.setItem('id', id.toString());
          localStorage.setItem('nickName', nickName);
          localStorage.setItem('imagePath', imagePath);
          setUserInfo({
            accessToken: accessToken,
            refreshToken: refreshToken,
            userInfo: userInfo,
          });
          setValue('email', '');
          setValue('password', '');
          return true;
        }
      } else {
        setErrorMsg('등록된 회원정보가 아닙니다.');
        setUserInfo({});
        return false;
      }
    } catch (err) {
      setErrorMsg('회원가입 서버 상태를 확인해주세요.');
      console.log(err);
      return false;
    }
  };

  return (
    <div
      data-name="modal"
      onClick={(e) => {
        const curT = e.target as HTMLElement;
        if (curT.dataset.name === 'modal') {
          setModal({
            modalState: false,
            modalType: 'sign',
            modalPayload: undefined,
          });
          setValue('email', '');
          setValue('password', '');
        }
      }}
      className={classNames(
        `fixed w-screen h-screen`,
        `bg-black bg-opacity-90`,
        modal.modalState &&
          (modal.modalType === 'sign' || modal.modalType === 'image')
          ? `visible`
          : `invisible`,

        `flex items-center justify-center`
      )}
      style={{
        zIndex: 9999,
      }}
    >
      <MainWrapper
        className={classNames(
          `p-10`,
          modal.modalType === 'sign' && `h-fit w-2/6`,
          modal.modalType === 'image' && `h-fit`,

          `rounded-2xl shadow-xl`,
          `shadow-xl`,
          `flex justify-center`
        )}
      >
        {modal.modalType === 'sign' && (
          <div
            className={classNames(
              `w-full flex flex-col justify-start items-center `
            )}
          >
            <div className={classNames(``)}>
              <Typography component={'h1'} variant={'h5'}>
                로그인
              </Typography>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classNames(`w-8/12 mt-10`)}
            >
              <div className={classNames(`grid grid-cols-3 gap-y-10`)}>
                <div className={classNames(`col-span-full`)}>
                  <TextField
                    {...register('email')}
                    required
                    fullWidth
                    type="email"
                    label="ID"
                  />
                </div>
                <div className={classNames(`col-span-full`)}>
                  <TextField
                    {...register('password')}
                    required
                    fullWidth
                    type="password"
                    label="PWD"
                  />
                </div>

                {flag && (
                  <div className={classNames(`col-span-full text-upBox`)}>
                    {errorMsg}
                  </div>
                )}
                <div
                  className={classNames(
                    `col-span-full flex justify-center items-center`
                  )}
                >
                  <Button type="submit" disabled={isLoading}>
                    로그인
                  </Button>
                  <Button
                    onClick={() => {
                      setModal((prevData) => {
                        return {
                          ...prevData,
                          modalState: false,
                        };
                      });
                      navigate(CONST_ROUTE.SIGN_UP);
                    }}
                  >
                    회원가입
                  </Button>
                </div>
                <div
                  className={classNames(
                    `col-start-2`,
                    `w-full flex justify-center items-center`
                  )}
                >
                  {isLoading === false && (
                    <LottieDiv
                      className={classNames(`w-full h-full`)}
                      jsonData={signLoading}
                      loop
                    />
                  )}
                  {isLoading && isSuccess && (
                    <LottieDiv
                      className={classNames(`w-full h-full`)}
                      jsonData={successSign}
                      loop
                    />
                  )}
                  {isLoading && isSuccess === false && (
                    <LottieDiv
                      className={classNames(`w-full h-full`)}
                      jsonData={nonUser}
                      loop
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
        {modal.modalType === 'image' && (
          <div
            className={classNames(
              `w-full flex flex-col justify-center items-center `
            )}
          >
            <img src={payload} alt="chartImg" />
          </div>
        )}
      </MainWrapper>
    </div>
  );
};

export default CommonModal;
