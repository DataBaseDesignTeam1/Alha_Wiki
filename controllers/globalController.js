import { connection } from "../db";

export const main = (req, res, next) => {
    // console.log(req.params);    
    connection.query('SELECT * FROM big_category ORDER BY big_category_index', function (error, results, fields) {
        if (error) throw error;
        // connected!

        // console.log(results);
        var big_categories = new Array();

        results.forEach(element => {
            var big_category = {
                index: element.big_category_index,
                name: element.big_category_name
            };
            big_categories.push(big_category);
        });
        
        var data = {
            data: big_categories
        };

        // res.json(data);
        // res.render(`main`, { big_categories: data });

        // big_categories.sort((a, b) => {
        //     return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
        // });
        
        // console.log(data);
        // console.log(data.data[0]);

        res.render(`main`, {
            title : "main",
            big_categories: data
        });
    });
}

export const login = (req, res, next) => {
    res.render(`login.html`);
}

export const logout = (req, res, next) => {
    res.send(`LOGOUT`);
}

export const signup = (req, res, next) => {
    res.render(`SignUp.html`);
}