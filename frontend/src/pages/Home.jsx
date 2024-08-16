import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(books);

  async function getBooks() {
    setLoading(true);
    const response = await axios.get("http://localhost:5555/books");
    // console.log(response.data.data);
    setBooks(response.data.data);

    setLoading(false);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl mb-[20px] mt-[10px]">Books List</h1>
          <Link to={"/books/create"}>
            <MdOutlineAddBox className="text-sky-800 text-4xl"/>
          </Link>
        </div>

        {
            loading?
            <div className="flex justify-center">
                <Spinner/>
            </div> : 
            <table className="w-full border-separate border-spacing-2">
                <thead>
                    <tr>
                        <th className="border border-gray-800 rounded-[4px]">No</th>
                        <th className="border border-gray-800 rounded-[4px]">Title</th>
                        <th className="border border-gray-800 rounded-[4px] max-md:hidden">Author</th>
                        <th className="border border-gray-800 rounded-[4px] max-md:hidden">Published-Year</th>
                        <th className="border border-gray-800 rounded-[4px]">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book, index) => (
                            <tr key={book._id} className="h-8">
                                <td className="border border-gray-900 rounded-[4px] text-center">{index + 1}</td>
                                <td className="border border-gray-900 rounded-[4px] text-center">{book.title}</td>
                                <td className="border border-gray-900 rounded-[4px] text-center max-md:hidden">{book.author}</td>
                                <td className="border border-gray-900 rounded-[4px] text-center max-md:hidden">{book.publishyear}</td>
                                <td className="border border-gray-900 rounded-[4px] text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800"/>
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600"/>
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-600"/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
      </div>
    </>
  );
}

export default Home;
