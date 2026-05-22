import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import BookForm from "./pages/BookForm";
import BorrowBook from "./pages/BorrowBook";
import Borrowings from "./pages/Borrowings";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <div className="p-6">

        <Routes>

          <Route path="/books" element={<Books />} />

          <Route path="/add-book" element={<BookForm />} />

          <Route path="/edit-book/:id" element={<BookForm />} />

          <Route path="/borrow" element={<BorrowBook />} />

          <Route path="/borrowings" element={<Borrowings />} />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App