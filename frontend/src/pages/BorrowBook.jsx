import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BorrowBook() {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const [formData, setFormData] = useState({
        book_id: "",
        borrower_name: "",
        borrower_phone: "",
        borrow_date: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        axios.get("http://localhost:5000/api/books")

        .then((res) => {

            const availableBooks = res.data.result.filter(
                (book) => book.available > 0
            );

            setBooks(availableBooks);

        });

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const {
            book_id,
            borrower_name,
            borrower_phone,
            borrow_date
        } = formData;

        if (
            !book_id ||
            !borrower_name ||
            !borrower_phone ||
            !borrow_date
        ) {
            return setMessage("All fields are required ❌");
        }

        setLoading(true);

        axios.post(
            "http://localhost:5000/api/borrow",
            formData
        )

        .then(() => {

            setMessage("Book borrowed successfully ✅");

            setTimeout(() => {
                navigate("/borrowings");
            }, 1000);

        })

        .catch(() => {
            setMessage("Failed to borrow book ❌");
        })

        .finally(() => {
            setLoading(false);
        });

    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6">
                Borrow Book
            </h1>

            {
                message &&
                <div className="mb-4 bg-gray-100 p-3 rounded">
                    {message}
                </div>
            }

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <select
                    name="book_id"
                    value={formData.book_id}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                >

                    <option value="">
                        Select Book
                    </option>

                    {
                        books.map((book) => (

                            <option
                                key={book.id}
                                value={book.id}
                            >
                                {book.title}
                            </option>

                        ))
                    }

                </select>

                <input
                    type="text"
                    name="borrower_name"
                    placeholder="Borrower name"
                    value={formData.borrower_name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="borrower_phone"
                    placeholder="Phone number"
                    value={formData.borrower_phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="date"
                    name="borrow_date"
                    value={formData.borrow_date}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded w-full"
                >
                    {
                        loading
                        ?
                        "Processing..."
                        :
                        "Borrow Book"
                    }
                </button>

            </form>

        </div>
    )
}

export default BorrowBook;