/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import Back from '../Components/Back'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'

function EditBook() {  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [obj, setObj] = useState({
    title: "",
    author: "",
    publishyear: "",
    loading: false,
  })

  const { id } = useParams();

  async function findBook()
  {
    setObj({...obj, loading: true});
    let response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/books/${id}`)
    response = response.data;
    
    setObj({title: response.title, author: response.author, publishyear: response.publishyear, loading: false});
  }

  useEffect(() => {
    findBook();
  }, [])

  async function saveBook()
  {
    const {title, author, publishyear} = obj;

    const bookData = {
      title,
      author,
      publishyear
    }
    
    await axios.put(`http://localhost:${import.meta.env.VITE_PORT}/books/${id}`, bookData);
    
    enqueueSnackbar("Book edited successfully", {variant: "success"});

    navigate('/');
  }

  return (
  <>
    <Back/>
    <div className='p-1'>
      <h1 className='text-3xl my-4 flex justify-center'>Edit Book</h1>
      {
        obj.loading?
        <div className="flex justify-center">
            <Spinner/>
        </div> :
        <div className="flex flex-col border-2 border-sky-400 rounded-[7px] w-[600px] p-4 mx-auto">
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={obj.title}
            onChange={(e) => {setObj({...obj, title: e.target.value})}}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type="text" value={obj.author}
            onChange={(e) => {setObj({...obj, author: e.target.value})}}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish year</label>
            <input type="text" value={obj.publishyear}
            onChange={(e) => {setObj({...obj, publishyear: e.target.value})}}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>

          <button className='p-2 bg-sky-300 m-8 font-semibold rounded-[4px]' onClick={saveBook}>
            Save book
          </button>

        </div>
      }

    </div>
  </>
  )
}
  
export default EditBook
  