/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import Back from '../Components/Back'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'

function DelBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    const { id } = useParams();

    async function DeleteBook()
    {
        axios.delete(`http://localhost:${import.meta.env.VITE_PORT}/books/${id}`);

        enqueueSnackbar("Book deleted successfully", {variant: "success"});

        navigate('/');
    }

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
        <div className='p-4 flex flex-col items-center'>
            <h1 className='text-3xl my-4 flex justify-center text-gray-700'>Delete Book</h1>
            {
                loading?
                <div className="flex justify-center">
                    <Spinner/>
                </div> :
                <div className='flex flex-col items-center gap-[20px]'>
                    <div className='flex flex-col border-2 border-sky-400 rounded-[7px] w-fit p-4'>
                        <div className='my-4'>
                            <span className='text-[13px] mr-4 text-gray-500'>TITLE:</span>
                            <span>{book.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-[13px] mr-4 text-gray-500'>AUTHOR:</span>
                            <span>{book.author}</span>
                        </div>
                    </div>
                    <h1 className='text-gray-800 text-[30px] mt-[10px]'>Are you sure you want to delete this book?</h1>
                    <div className='flex gap-[50px] items-center justify-center'>
                        <button className='bg-[#f12e55] text-white px-[20px] py-[2px] rounded-[4px] hover:bg-[crimson]' onClick={DeleteBook}>Yes</button>
                        <button className='bg-[#f12e55] text-white px-[20px] py-[2px] rounded-[4px] hover:bg-[crimson]' onClick={() => {navigate('/')}}>No</button>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default DelBook