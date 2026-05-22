import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBooks = () => {

        axios.get("http://localhost:5000/api/books")

        .then((res) => {

            setBooks(res.data.result);
            setLoading(false);

        })

        .catch((err) => {

            console.log(err);
            setLoading(false);

        });

    };

    useEffect(() => {

        getBooks();

    }, []);

    // DELETE BOOK
    const deleteBook = (id) => {

        if (window.confirm("Delete book?")) {

            axios.delete(`http://localhost:5000/api/books/${id}`)

            .then(() => {

                setBooks(
                    books.filter((book) => book.id !== id)
                );

            })

            .catch((err) => {

                console.log(err);

                alert("Book not deleted ❌");

            });

        }

    };

    if (loading) {

        return <h1>Loading...</h1>;

    }

    return (

        <div>

            <div className="flex justify-between mb-4">

                <h1 className="text-2xl font-bold">
                    Books
                </h1>

                <Link
                    to="/add-book"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add New Book
                </Link>

            </div>

            <div className="overflow-auto">

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Author</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">ISBN</th>
                            <th className="p-3 border">Quantity</th>
                            <th className="p-3 border">Available</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            books.map((book) => (

                                <tr key={book.id}>

                                    <td className="border p-3">
                                        {book.title}
                                    </td>

                                    <td className="border p-3">
                                        {book.author}
                                    </td>

                                    <td className="border p-3">
                                        {book.category}
                                    </td>

                                    <td className="border p-3">
                                        {book.isbn}
                                    </td>

                                    <td className="border p-3">
                                        {book.quantity}
                                    </td>

                                    <td className="border p-3">
                                        {book.available}
                                    </td>

                                    <td className="border p-3">

                                        {
                                            book.available > 0
                                            ?
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                                Available
                                            </span>
                                            :
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                                                Unavailable
                                            </span>
                                        }

                                    </td>

                                    <td className="border p-3 flex gap-2">

                                        <Link
                                            to={`/edit-book/${book.id}`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteBook(book.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Books;