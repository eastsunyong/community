import React from 'react'

interface IPorps {
    num: number;
    info: string;
}
const InfoBox = (props: IPorps) => {
    return (
        <div className='flex flex-col items-center'>
            <p>{props.num}</p>
            <p>{props.info}</p>
        </div>
    )
}

export default InfoBox