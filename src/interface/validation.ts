const emailOpt = {
  required: '이메일은 필수 입력입니다',
  maxLength: { value: 30, message: '30자 이하로 정해주세요' },
  pattern: {
    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    message: '이메일이 형식에 맞지 않습니다.',
  },
};

const pwOpt = {
  required: '비밀번호는 필수 입력입니다',
  minLength: { value: 8, message: '8자리 이상 비밀번호를 사용하세요.' },
  maxLength: { value: 16, message: '16자리 이하 비밀번호를 사용하세요.' },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    message: '특수문자와 숫자를 포함해주세요',
  },
};

const pwCheckOpt = {
  required: '비밀번호는 필수 입력입니다',
  minLength: { value: 8, message: '8자리 이상 비밀번호를 사용하세요.' },
  maxLength: { value: 16, message: '16자리 이하 비밀번호를 사용하세요.' },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    message: '특수문자와 숫자를 포함해주세요',
  },
};

const confirmOpt = {
  required: '인증번호를 입력해주세요',
  pattern: {
    value: /^.{1,4}$/,
  },
};

const nickNameOpt = {
  required: '닉네임은 필수 입력입니다',
  minLength: { value: 2, message: '2자리 이상 닉네임을 사용하세요.' },
  maxLength: { value: 14, message: '14자리 이하 닉네임을 사용하세요.' },
};

const profileOpt = { required: '사진은 필수입니다' };

const bioOpt = { required: '자기소개는 필수 항목입니다' };

export { emailOpt, pwOpt, pwCheckOpt, confirmOpt, nickNameOpt, profileOpt, bioOpt };
