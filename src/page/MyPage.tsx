import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';

interface UserData {
    email: string;
    password?: string;
    nickname: string;
    bio: string;
    profileImage: string;
    uid: string;
}

const MyPage = () => {
    const { userId } = useParams() as { userId: string };
    const [loading, setLoading] = useState(true);
    const [myUserData, setMyUserData] = useState<UserData | DocumentData>({});
    const [otherUserData, setOtherUserData] = useState<UserData | DocumentData | null>(null);
    const nav = useNavigate()

    const fetchMyData = async () => {
        if (auth.currentUser) {
            const myUserId = auth.currentUser.uid;
            const myUserDocRef = doc(db, 'users', myUserId);
            const myUserDoc = await getDoc(myUserDocRef);

            if (myUserDoc.exists()) {
                const myUserData = myUserDoc.data();
                setMyUserData(myUserData);
            }
        }
        setLoading(false);
    };
    const fetchOtherUserData = async () => {
        const otherUserDocRef = doc(db, 'users', userId);
        const otherUserDoc = await getDoc(otherUserDocRef);

        if (otherUserDoc.exists()) {
            const otherUserData = otherUserDoc.data()
            setOtherUserData(otherUserData);
        }
        setLoading(false);
    };


    useEffect(() => {
        if (auth.currentUser) {
            const myUserId = auth.currentUser.uid;
            console.log("로그인 한 유저 아이디:", myUserId);
            console.log("현재 url:", userId);

            if (myUserId === userId)
                fetchMyData();
            else {
                fetchOtherUserData();
            }
        }
    }, [auth.currentUser, userId])

    return (
        // <div>
        //     {loading && <p>Loading...</p>}
        //     <h1>My Page</h1>
        //     {myUserData && (
        //         <div>
        //             <h2>내 계정:</h2>
        //             <p>Email: {myUserData.email}</p>
        //             <p>Nickname: {myUserData.nickname}</p>
        //             <p>{myUserData.uid}</p>
        //             <p>프로필</p>
        //             <img src={myUserData.profileImage}></img>
        //         </div>
        //     )}

        //     {otherUserData && (
        //         <div>
        //             <h2>다른qewwwwwwww 계정:</h2>
        //             <p>Email: {otherUserData.email}</p>
        //             <p>Nickname: {otherUserData.nickname}</p>
        //             <p>uid: {otherUserData.uid}</p>
        //             <p>프로필</p>
        //             <img src={otherUserData.profileImage}></img>
        //             {/* Add other fields as needed */}
        //         </div>
        //     )}
        // </div>
        <div className='w-full h-screen bg-blue flex items-center justify-center'>
            <div className='w-5/12 h-screen bg-gray'>
                {loading && <p>Loading...</p>}
                <div className=' flex flex-row justify-between px-20 pt-12 bg-orange'>
                    <img className='w-44 h-44 object-cover rounded-full'
                        src={`${myUserData.profileImage ? myUserData.profileImage : '/userDefalt.jpg'}`}></img>
                    <div className='flex flex-row items-center gap-6'>
                        <div className='flex flex-col items-center'>
                            <p>12</p>
                            <p>팔로잉</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p>12</p>
                            <p>팔로워</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p>12</p>
                            <p>게시물</p>
                        </div>
                    </div>
                </div>
                <div className='px-20 pt-3 font-bold text-m flex justify-between mt-5 items-center'>
                    <p>{myUserData.nickname}</p>
                    <button onClick={() => { nav(`/${userId}/edit`) }} className='bg-orange w-32'>프로필 수정</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
