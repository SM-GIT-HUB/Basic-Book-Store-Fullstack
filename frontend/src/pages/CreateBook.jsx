import {useState} from 'react'
import Back from '../Components/Back';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishyear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createNewBook()
  {
    setLoading(true);
    const bookData = {
      title,
      author,
      publishyear
    }
    
    await axios.post("http://localhost:5555/books", bookData);

    setLoading(false);
    navigate('/');
  }

  return (
  <>
    <Back/>
    <div className='p-1'>
      <h1 className='text-3xl my-4 flex justify-center'>Create Book</h1>
      {
        loading?
        <Spinner/> :
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

          <button className='p-2 bg-sky-300 m-8 font-semibold rounded-[4px]' onClick={createNewBook}>
            Save book
          </button>

        </div>
      }

    </div>
  </>
  )
}
  
export default CreateBook
  