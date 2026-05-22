import { Link } from "react-router-dom";

function Navbar() {

    return (
        <div className="bg-blue-600 text-white p-4 flex gap-6">

            <Link to="/books">Books</Link>

            <Link to="/add-book">Add Book</Link>

            <Link to="/borrow">Borrow</Link>

            <Link to="/borrowings">Borrowings</Link>

        </div>
    )
}

export default Navbar