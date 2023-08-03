
const axios = require('axios');
const cors = require("cors");
const express = require("express");
const app = express();


app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {

    await name();
    function name() {
        

        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {


                const result = response.data;

                var ans;
                var book = [];
                for (var x in result) {
                    ans = { id: result[x].id, title: result[x].title, completed: result[x].completed }
                    book.push(ans);
                }

                res.send(book);

            })
            .catch(error => {
                console.log(error);
            });
    }

});


app.get("/user/:num", async (req, res) => {
    
    const id = req.params.num;

    await name();
    function name() {


        axios.get(` https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {

                

                var ans;
                const result = response.data;
                var book = [];


                



                axios.get('https://jsonplaceholder.typicode.com/todos')
                    .then(response => {


                        const result_todo = response.data;
                        var data = [];
                        for (var y in result_todo) {
                            if (result_todo[y].userId == req.params.num) {
                                var temp = result_todo[y];
                                data.push(temp)
                            }
                        }
                        book.push({ id: result.id, name: result.name, email: result.email, phone: result.phone ,  todos:data});
                        res.send(book);



                    })
                    .catch(error => {
                        console.log(error);
                    });




            })
            .catch(error => {
                console.log(error);
            });
    }

})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
