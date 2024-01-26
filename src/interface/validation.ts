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

export { emailOpt, pwOpt };
