import { Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DelBook'

function App() {
  return (
    <>
      <h1 className="text-gray-700 text-[20px] font-semibold flex justify-center">Book Store</h1>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/books/details/:id" element={<ShowBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
      </Routes>
    </>
  )
}

export default App
