interface IProps {
    title: string;
}

const Title = (title: IProps) => {
    return (
        <div className='flex justify-center mt-5 text-l font-bold mb-8'>
            <h2>{title.title}</h2>
        </div>
    )
}

export default Title