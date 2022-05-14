import { Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { API_USER } from '../../api/user.api';
import { atomModalState, TypeChartImg } from '../../atom/modal.atom';
import { iStBar } from '../../atom/tvChart.atom';
import { atomUserInfo, TypeUser } from '../../atom/user.atom';
import useGenerateChart from '../../hooks/useGenerateChart';
import { dduckddackResponseVO } from '../../type/api';
import MainWrapper from '../Common/MainWrapper';

type Inputs = {
  email: string;
  password: string;
};

const SignInModal = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(atomUserInfo);

  const [modal, setModal] = useRecoilState(atomModalState);
  const [payload, setPayload] = useState<any | TypeChartImg | string>();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const sendData = {
      email: data.email,
      password: data.password,
    };
    // const send = stringify(data);
    onSignIn(sendData);
    // console.log(data);
    // console.log(send);
  };

  const onSignIn = async (data: Inputs) => {
    try {
      // 이슈
      const result = await axios.post(API_USER.LOGIN_USER, data);
      if (result.data.status === 'ok') {
        const { accessToken, refreshToken, userInfo } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', userInfo?.email);
        localStorage.setItem('id', userInfo?.id);
        localStorage.setItem('nickName', userInfo?.nickName);
        console.log('로그인성공');
        setUserInfo({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userInfo: userInfo,
        });
        setModal({
          modalState: false,
          modalType: 'sign',
          modalPayload: undefined,
        });
      } else {
        setUserInfo({});
      }
    } catch (err) {
      console.log(err);
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
        }
        console.log(curT);
      }}
      className={classNames(
        `fixed w-screen h-screen`,
        `bg-black bg-opacity-90`,
        modal.modalState && modal.modalType === 'sign'
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
          `h-1/2 w-2/6`,

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
                <div
                  className={classNames(
                    `col-span-full flex justify-center items-center`
                  )}
                >
                  <Button type="submit">로그인</Button>
                  <Button
                    onClick={() => {
                      //   window.history.go('./user');
                      setModal((prevData) => {
                        return {
                          ...prevData,
                          modalState: false,
                        };
                      });
                      navigate('/user');
                    }}
                  >
                    회원가입
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
        {/* {modal.modalType === 'image' && (
          <div>
            {modal.modalPayload && (
              <img
                alt="modal_img"
                src={modal.modalPayload as string}
                className={classNames(`w-full h-full`)}
              />
            )}
          </div>
        )} */}
      </MainWrapper>
    </div>
  );
};

export default SignInModal;
