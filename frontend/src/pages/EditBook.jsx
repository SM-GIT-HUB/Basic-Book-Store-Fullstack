/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import Back from '../Components/Back'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'

function EditBook() {  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishyear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  async function findBook()
  {
    setLoading(true);
    let response = await axios.get(`http://localhost:5555/books/${id}`)
    response = response.data;

    setTitle(response.title);
    setAuthor(response.author);
    setPublishyear(response.publishyear);

    setLoading(false);
  }

  useEffect(() => {
    findBook();
  }, [])

  async function saveBook()
  {
    const bookData = {
      title,
      author,
      publishyear
    }
    
    await axios.put(`http://localhost:5555/books/${id}`, bookData);
    
    enqueueSnackbar("Book edited successfully", {variant: "success"});

    navigate('/');
  }

  return (
  <>
    <Back/>
    <div className='p-1'>
      <h1 className='text-3xl my-4 flex justify-center'>Edit Book</h1>
      {
        loading?
        <div className="flex justify-center">
            <Spinner/>
        </div> :
        <div className="flex flex-col border-2 border-sky-400 rounded-[7px] w-[600px] p-4 mx-auto">
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type="text" value={author}
            onChange={(e) => {setAuthor(e.target.value)}}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish year</label>
            <input type="text" value={publishyear}
            onChange={(e) => {setPublishyear(e.target.value)}}
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
  