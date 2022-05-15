import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MainWrapper from '../components/Common/MainWrapper';
import CircularProgress from '@mui/material/CircularProgress';
import stringify from 'fast-json-stable-stringify';
import axios from 'axios';
import { API_USER } from '../api/user.api';
import { useNavigate } from 'react-router-dom';
import CONST_ROUTE from '../Routes';

const SignUpRow = (props: { children?: ReactNode; className?: string }) => {
  return (
    <div
      {...props}
      className={classNames(
        `w-full col-span-full flex items-center justify-start`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

type Inputs = {
  email: string;
  emailVerify: string;
  // mailState: boolean;
  nickName: string;
  password1: string;
  password2: string;
};

const SiginUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mailVerify === false) {
      console.log('이메일 인증안되었는데 감히 어딜');
      setError(
        'emailVerify',
        { message: '인증실패' },
        {
          shouldFocus: true,
        }
      );
    }
    const sendData = {
      email: data.email,
      password: data.password1,
      nickName: data.nickName,
    };
    // const send = stringify(data);
    onUserCreate(sendData);
    // console.log(data);
    // console.log(send);
  };

  // const [mailFlag, setMailFlag] = useState(false);
  const [mailSenderStartFlag, setMailSenderStartFlag] = useState(false);
  const [mailSenderEndFlag, setMailSenderEndFlag] = useState(false);
  const [mailSender, setMailSender] = useState(false);

  const [mailVerifyStartFlag, setMailVerifyStartFlag] = useState(false);
  const [mailVerifyEndFlag, setMailVerifyEndFlag] = useState(false);
  const [mailVerify, setMailVerify] = useState(false);

  const [mailVerifyCode, setMailVerifyCode] = useState<any>();

  const onSendEmail = async (email: string) => {
    try {
      const result = await axios.post(
        `${API_USER.EMAIL_VERIFY}/${email}/authentication`
      );
      if (result.data?.status === 'ok') {
        setMailSenderEndFlag(true);
        setMailSender(true);
        console.log(result.data?.message);
      }
    } catch (err) {
      setMailSenderStartFlag(false);
      setMailSenderEndFlag(false);
      setMailSender(false);
      console.log(err);
    }
  };

  const onEmailVerified = async (email: string) => {
    try {
      const result = await axios.get(
        `${API_USER.EMAIL_VERIFY}/${email}/authentication`
      );
      if (result.data?.status === 'ok' && result.data.message === 'true') {
        // 인증이 성공적으로 되었다면
        setMailVerify(true);
        setMailVerifyEndFlag(true);
        console.log(result.data?.message);
      } else {
        if (errors && errors.emailVerify) {
          errors.emailVerify.message = '에러임';
        }
        setError(
          'emailVerify',
          { message: '인증실패' },
          {
            shouldFocus: true,
          }
        );
        setMailVerify(false);
      }
    } catch (err) {
      setMailVerify(false);
      setMailSenderEndFlag(false);
      setMailSender(false);
      setError(
        'emailVerify',
        { message: '인증실패' },
        {
          shouldFocus: true,
        }
      );
    }
  };

  const onUserCreate = async (data: any) => {
    try {
      const result = await axios.put(`${API_USER.CREATE_USER}`, data);
      if (result.data.status === 'ok') {
        navigate(CONST_ROUTE.HOME);
      }
    } catch (err) {
      console.log(err);
    }
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(`w-8/12`)}
        >
          <div className={classNames(`grid grid-cols-6 gap-y-5`)}>
            <SignUpRow>
              <div
                className={classNames(
                  ` w-10`,
                  mailSenderStartFlag ? `visible` : `invisible`
                )}
              >
                {mailSenderEndFlag ? (
                  <Checkbox
                    defaultChecked
                    color={mailSender ? 'success' : 'error'}
                    value={true}
                    className={classNames(`pointer-events-none`)}
                  />
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </div>

              <div className={classNames(`flex-1`)}>
                <TextField
                  {...register('email', {
                    required: true,
                    maxLength: 40,
                    // validate: {
                    //   checkUrl: async () =>
                    //     (await false) || '이메일 인증전송에 실패하였습니다.',
                    // },
                  })}
                  required
                  fullWidth
                  type="email"
                  label="이메일 주소"
                />
              </div>

              <Button
                onClick={() => {
                  setMailSenderStartFlag(true);
                  setMailSender(false);
                  onSendEmail(watch('email'));
                }}
              >
                인증 보내기
              </Button>
            </SignUpRow>
            <SignUpRow>
              <div
                className={classNames(
                  `w-10`,
                  mailVerifyStartFlag ? `visible` : `invisible`
                )}
              >
                {mailVerifyEndFlag ? (
                  <Checkbox
                    defaultChecked
                    color={mailVerify ? 'success' : 'error'}
                    value={true}
                    className={classNames(`pointer-events-none`)}
                  />
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </div>

              <div className={classNames(`flex-1`)}>
                <Button
                  {...register('emailVerify')}
                  onClick={() => {
                    setMailVerifyEndFlag(false);
                    setMailVerify(false);
                    setMailVerifyStartFlag(true);
                    onEmailVerified(watch('email'));
                    // setTimeout(() => {
                    //   if (watch('emailVerify') === '123') {
                    //     console.log('인증됨');
                    //     console.log(watch('emailVerify').valueOf());

                    //     setMailVerify(true);
                    //   } else {
                    //   }
                    //   setMailVerifyEndFlag(true);
                    // }, 1000);
                  }}
                >
                  인증 확인
                </Button>
                {/* <TextField
                  required
                  fullWidth
                  {...register('emailVerify', {
                    // 서버랑 확인하는 무언가 있어야되는듯.
                    // validate: (value) => value === '123' || '인증번호가 틀림',
                  })}
                  label="이메일 인증번호"
                  error={errors.emailVerify?.message !== undefined}
                /> */}
              </div>

              {errors.emailVerify?.message !== undefined && (
                <FormHelperText>{errors.emailVerify?.message}</FormHelperText>
              )}
            </SignUpRow>
            <SignUpRow>
              <div className={classNames(`w-10`)}></div>
              <div className={classNames(`flex-1`)}>
                <TextField
                  required
                  fullWidth
                  {...register('nickName', {
                    pattern: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
                  })}
                  label="닉네임"
                  error={errors.nickName?.type === 'pattern'}
                />
              </div>

              {errors.nickName?.type && (
                <FormHelperText>
                  1~10글자 숫자,영문,한글로 구성해주세요
                </FormHelperText>
              )}
            </SignUpRow>
            <SignUpRow>
              <div className={classNames(`w-10`)}></div>
              <div className={classNames(`flex-1`)}>
                <TextField
                  required
                  fullWidth
                  {...register('password1', {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  })}
                  type="password"
                  label="비밀번호"
                  error={errors.password1?.type === 'pattern'}
                  // error={nickNameError !== '' || false}
                />
              </div>

              {errors.password1?.type && (
                <FormHelperText>
                  1개 이상의 영문자, 숫자, 특수문자로 10글자 이상
                </FormHelperText>
              )}
            </SignUpRow>
            <SignUpRow>
              <div className={classNames(`w-10`)}></div>
              <div className={classNames(`flex-1`)}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  {...register('password2', {
                    validate: (value) => value === watch('password1'),
                  })}
                  label="비밀번호 확인"
                  error={errors.password2?.message !== undefined}
                />
              </div>

              {errors.password2?.message !== undefined && (
                <FormHelperText>비밀번호가 일치하지 않습니다.</FormHelperText>
              )}
            </SignUpRow>
            <SignUpRow>
              <Button fullWidth type="submit" value="회원가입">
                회원가입
              </Button>
            </SignUpRow>
          </div>
        </form>
      </MainWrapper>
    </div>
  );
};

export default SiginUpPage;
