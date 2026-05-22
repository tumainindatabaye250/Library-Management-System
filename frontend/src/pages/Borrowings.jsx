import axios from "axios";
import { useEffect, useState } from "react";

function Borrowings() {

    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBorrowings = () => {

        axios.get("http://localhost:5000/api/borrowings")

        .then((res) => {

            setBorrowings(res.data.result);
            setLoading(false);

        })

        .catch(() => {
            setLoading(false);
        });

    };

    useEffect(() => {
        getBorrowings();
    }, []);

    const returnBook = (id) => {

        axios.put(
            `http://localhost:5000/api/borrow/${id}/return`
        )

        .then(() => {
            getBorrowings();
        });

    };

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Borrowing Records
            </h1>

            <div className="overflow-auto">

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="border p-3">Book</th>
                            <th className="border p-3">Borrower</th>
                            <th className="border p-3">Phone</th>
                            <th className="border p-3">Borrow Date</th>
                            <th className="border p-3">Return Date</th>
                            <th className="border p-3">Status</th>
                            <th className="border p-3">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            borrowings.map((item) => (

                                <tr key={item.id}>

                                    <td className="border p-3">
                                        {item.title}
                                    </td>

                                    <td className="border p-3">
                                        {item.borrower_name}
                                    </td>

                                    <td className="border p-3">
                                        {item.borrower_phone}
                                    </td>

                                    <td className="border p-3">
                                        {item.borrow_date?.split("T")[0]}
                                    </td>

                                    <td className="border p-3">

                                        {
                                            item.return_date
                                            ?
                                            item.return_date.split("T")[0]
                                            :
                                            "-"
                                        }

                                    </td>

                                    <td className="border p-3">

                                        {
                                            item.status === "borrowed"
                                            ?
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded">
                                                Borrowed
                                            </span>
                                            :
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                                                Returned
                                            </span>
                                        }

                                    </td>

                                    <td className="border p-3">

                                        {
                                            item.status === "borrowed"
                                            &&
                                            <button
                                                onClick={() => returnBook(item.id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                            >
                                                Return Book
                                            </button>
                                        }

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Borrowings;