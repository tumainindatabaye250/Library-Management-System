import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        quantity: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // get single book for editing
    useEffect(() => {

        if (isEdit) {

            axios.get(`http://localhost:5000/api/books/${id}`)

            .then((res) => {

                const book = res.data.result[0];

                setFormData({
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn,
                    category: book.category,
                    quantity: book.quantity
                });

            });

        }

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
            title,
            author,
            isbn,
            category,
            quantity
        } = formData;

        // validation
        if (
            !title ||
            !author ||
            !isbn ||
            !category ||
            !quantity
        ) {
            return setMessage("All fields are required ❌");
        }

        setLoading(true);

        // add new
        if (!isEdit) {

            axios.post(
                "http://localhost:5000/api/books",
                {
                    ...formData,
                    available: quantity
                }
            )

            .then(() => {

                setMessage("Book added successfully ✅");

                setTimeout(() => {
                    navigate("/books");
                }, 1000);

            })

            .catch(() => {
                setMessage("Failed to add book ❌");
            })

            .finally(() => {
                setLoading(false);
            });

        }

        // update
        else {

           axios.put(
    `http://localhost:5000/api/books/${id}`,
    {
        ...formData,
        quantity: Number(formData.quantity),
        available: Number(formData.quantity)
    }
)

            .then(() => {

                setMessage("Book updated successfully ✅");

                setTimeout(() => {
                    navigate("/books");
                }, 1000);

            })

            .catch(() => {
                setMessage("Failed to update book ❌");
            })

            .finally(() => {
                setLoading(false);
            });

        }

    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6">

                {
                    isEdit
                    ?
                    "Edit Book"
                    :
                    "Add Book"
                }

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

                <input
                    type="text"
                    name="title"
                    placeholder="Book title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
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
                        isEdit
                        ?
                        "Update Book"
                        :
                        "Add Book"
                    }
                </button>

            </form>

        </div>
    )
}

export default BookForm;