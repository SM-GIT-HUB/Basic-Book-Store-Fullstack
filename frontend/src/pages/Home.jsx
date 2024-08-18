/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Table from "../Components/Home/Table"
import Card from "../Components/Home/Card"

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, SetShowType] = useState("table");

  console.log(books);

  async function getBooks() {
    setLoading(true);
    const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/books`);
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
        <div className="flex justify-center items-center gap-x-4">
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-[7px]"
          onClick={() => {SetShowType("table")}}>
            Table
          </button>

          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-[7px]"
          onClick={() => {SetShowType("card")}}>
            Card
          </button>
        </div>

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
          (showType == "table"?
          <Table books={books}/> :
          <Card books={books}/>)
        }
      </div>
    </>
  );
}

export default Home;
