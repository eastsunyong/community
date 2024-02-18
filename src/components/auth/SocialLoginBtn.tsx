import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { socialLogin } from '@/api/authApi';
import { Button } from '../ui/button';

interface IPros {
    provider: string
}

const SocialLoginBtn = ({ provider }: IPros) => {
    const nav = useNavigate();

    const handleSocialLogin = async () => {
        let authProvider;
        switch (provider) {
            case 'Google':
                authProvider = new GoogleAuthProvider();
                break;
            case 'Github':
                authProvider = new GithubAuthProvider();
                break;
            case 'Facebook':
                authProvider = new FacebookAuthProvider();
                break;
            case 'Twitter':
                authProvider = new TwitterAuthProvider();
                break;
            default:
                console.error('소셜 로그인 실패:', provider);
                return;
        }

        const result = await socialLogin(authProvider);
        if (result.success) {
            alert('로그인 성공');
            nav('/');
        } else {
            alert('실패')
        }
    };

    return <Button className='bg-gray-light' type='button' onClick={handleSocialLogin}>{`Log in with ${provider}`}</Button>
};

export default SocialLoginBtn;