interface IError {
  errorCode: string | undefined;
}

export const errorCodeHandler = (error: IError, isLogin: boolean) => {
  switch (error.errorCode) {
    case 'auth/wrong-password':
      return '이메일 혹은 비밀번호가 일치하지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/user-not-found':
      return '등록되어 있지 않은 유저입니다.';
    case 'auth/network-request-failed':
      return '네트워크 연결에 실패 하였습니다.';
    case 'auth/invalid-email':
      return '잘못된 이메일 형식입니다.';
    case 'auth/internal-error':
      return '잘못된 요청입니다.';
    case 'auth/too-many-requests':
      return '여러 번의 시도 실패로 인해 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 비밀번호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다.';
    default:
      return isLogin ? '로그인에 실패 하였습니다.' : '회원가입에 실패 하였습니다.';
  }
};
