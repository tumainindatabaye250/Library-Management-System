const express= require('express');
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(express.json());
app.use(cors());
const connection = require("./db");
const port = process.env.PORT



app.get("/api/books",(req,res)=>{
    const retrieve = "SELECT * FROM books";
    connection.query(retrieve,(err,result)=>{
        if(err){
            res.status(500).json({Message : "Books not selected ❌",err})
        }
        else{
            res.status(200).json({Message : "Books selected ✅",result})
        }
    });
})



app.get("/api/books/:id",(req,res)=>{
    const id = req.params.id
    const retrieve = "SELECT * FROM  books WHERE id =? ";
    connection.query(retrieve,[id],(err,result)=>{
         if(err){
            res.status(500).json({Message : "Book not selected ❌ ",err})
        }
        else{
            res.json({Message : "Book selected ✅",result})
        }
    })
});


app.post("/api/books",(req,res)=>{
    const {title,author,isbn,category,quantity,available} = req.body;
    const insert = "INSERT INTO books (title,author,isbn,category,quantity,available) VALUES (?,?,?,?,?,?)";
    connection.query(insert,[title,author,isbn,category,quantity,available],(err,result)=>{
        if(err){
            res.status(500).json({Message : "Book not inserted ❌ ",err})
        }
        else{
            res.json({Message : "Book inserted ✅",result})
        }
    })
})





app.put("/api/books/:id", (req, res) => {

    const id = req.params.id;

    const {
        title,
        author,
        isbn,
        category,
        quantity,
        available
    } = req.body;

    // validation
    if (
        !title ||
        !author ||
        !isbn ||
        !category ||
        !quantity
    ) {
        return res.status(400).json({
            Message: "All fields are required ❌"
        });
    }

    const sql = `
    UPDATE books
    SET
        title = ?,
        author = ?,
        isbn = ?,
        category = ?,
        quantity = ?,
        available = ?
    WHERE id = ?
    `;

    connection.query(
        sql,
        [
            title,
            author,
            isbn,
            category,
            Number(quantity),
            Number(available),
            id
        ],
        (err, result) => {

            // IMPORTANT
            if (err) {

                console.log(err);

                return res.status(500).json({
                    Message: "Internal server error ❌"
                });

            }

            res.status(200).json({
                Message: "Book updated successfully ✅"
            });

        }
    );

});








app.delete("/api/books/:id",(req,res)=>{
    const id = req.params.id
    const remove = "DELETE FROM books WHERE id = ?";
    connection.query(remove,[id],(err,result)=>{
         if(err){
            res.status(500).json({Message : "Book not deleted❌ ",err})
        }
        else{
            res.status(200).json({Message : "Book deleted✅",result})
        }
    })
});



app.post("/api/borrow", (req, res) => {

    const {book_id,borrower_name,borrower_phone,borrow_date} = req.body;

    const checkBook = "SELECT * FROM books WHERE id = ?";

    connection.query(checkBook, [book_id], (err, data) => {

        if (err) {
            return res.status(500).json({
                Message: "Server error ❌"
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                Message: "Book not found ❌"
            });
        }

        if (data[0].available <= 0) {
            return res.status(400).json({
                Message: "Book unavailable ❌"
            });
        }

        const insert = `INSERT INTO borrowings(book_id, borrower_name, borrower_phone, borrow_date, status) VALUES (?, ?, ?, ?, ?)`;

        connection.query(insert,[book_id, borrower_name, borrower_phone, borrow_date, "borrowed"],(err, result) => {

                if (err) {
                    return res.status(500).json({
                        Message: "Borrow failed ❌"
                    });
                  }
        const updateBook = ` UPDATE books SET available = available - 1 WHERE id = ? `;

            connection.query(updateBook, [book_id]);
                res.status(200).json({
                    Message: "Book borrowed successfully ✅"
                });

            }
        );

    });

});






app.get("/api/borrowings", (req, res) => {

    const sql = `
    SELECT 
        borrowings.id,
        books.title,
        borrowings.borrower_name,
        borrowings.borrower_phone,
        borrowings.borrow_date,
        borrowings.return_date,
        borrowings.status
    FROM borrowings
    INNER JOIN books
    ON borrowings.book_id = books.id
    `;

    connection.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                Message: "Internal server error ❌"
            });

        }

        res.status(200).json({
            Message: "Borrowings selected ✅",
            result
        });

    });

});







app.put("/api/borrow/:id/return", (req, res) => {

    const { id } = req.params;
    // const { status, return_date } = req.body;

    const sql = `UPDATE borrowings SET status = ?, return_date = NOW() WHERE id = ?`;

    connection.query(
        sql,["returned",id],(err, result) => {
            if (err) {
                res.status(500).json({ Message: "Error ❌", err });
            } else {
                res.status(200).json({ Message: "Updated successfully ✅" });
            }

        }
    );

});








app.delete("/api/books/:id", (req, res) => {

    const id = req.params.id;

    console.log("Deleting ID:", id);

    const remove = "DELETE FROM books WHERE id = ?";

    connection.query(remove, [id], (err, result) => {

        if (err) {

            console.log("DELETE ERROR:", err);

            return res.status(500).json({
                Message: "Book not deleted ❌",
                err
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                Message: "Book not found ❌"
            });

        }

        res.status(200).json({
            Message: "Book deleted successfully ✅"
        });

    });

});


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}/api`)
});
