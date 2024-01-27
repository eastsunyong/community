const RegistetText = (text: { text: boolean }) => {
    return (

        <div className='w-3/12 mb-5'>
            <h2 className='text-black text-l font-bold'>이메일 인증</h2>
            <p className='text-fontGray text-xs'>{text ? '원활한 서비스 제공을 위해, 휴대폰 번호를 입력해 주세요.' : <>등록된 휴대폰 번호로 인증번호가 전송되었습니다. <br />
                인증번호를 입력해 주세요.</>}</p>
        </div>
    )
}

export default RegistetText