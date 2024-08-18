/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Back from '../Components/Back'
import Spinner from '../Components/Spinner'

function ShowBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    console.log(book);

    async function findBook() {
        setLoading(true);
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/books/${id}`)
        // console.log(response.data);
        setBook(response.data);

        setLoading(false);
    }

    useEffect(() => {
        findBook();
    }, [])

    return (
    <>
        <Back/>
        <div className='p-2 flex flex-col items-center'>
            <h1 className='text-3xl my-4 text-gray-500'>Book</h1>
            {
                loading?
                <Spinner/> :
                <div className='flex flex-col border-2 border-sky-400 rounded-[7px] w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>ID:</span>
                        <span className='text-[13px]'>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>TITLE:</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>AUTHOR:</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>PUBLISH YEAR:</span>
                        <span>{book.publishyear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>CREATED:</span>
                        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-[13px] mr-4 text-gray-500'>UPDATED:</span>
                        <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default ShowBook
