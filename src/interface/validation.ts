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
  minLength: { value: 10, message: '10자리 이상 비밀번호를 사용하세요.' },
  maxLength: { value: 20, message: '20자리 이하 비밀번호를 사용하세요.' },
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
    message: '영어 대문자, 소문자, 숫자, 특수문자 중 2종류 문자 조합으로 구성해주세요',
  },
};

const pwCheckOpt = {
  required: '비밀번호는 필수 입력입니다',
  minLength: { value: 10, message: '10자리 이상 비밀번호를 사용하세요.' },
  maxLength: { value: 20, message: '20자리 이하 비밀번호를 사용하세요.' },
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
    message: '영어 대문자, 소문자, 숫자, 특수문자 중 2종류 문자 조합으로 구성해주세요',
  },
};

const nickNameOpt = {
  required: '닉네임은 필수 입력입니다',
  minLength: { value: 2, message: '2자리 이상 닉네임을 사용하세요.' },
  maxLength: { value: 14, message: '14자리 이하 닉네임을 사용하세요.' },
};

const profileOpt = { required: '사진은 필수입니다' };

const bioOpt = { required: '자기소개는 필수 항목입니다' };

export { emailOpt, pwOpt, pwCheckOpt, nickNameOpt, profileOpt, bioOpt };
