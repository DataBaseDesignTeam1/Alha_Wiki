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
            title: "main",
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

export const in_big_category = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;
    var bigCategory_name = "";

    var sql = 'SELECT big_category_name FROM big_category WHERE ?';
    connection.query(sql, { big_category_index: bigCategory_id }, (error, topic, fields) => {
        if (error) throw error;

        // console.log(results[0].big_category_name);
        // console.log(topic);
        var big_categories = new Array();
        topic.forEach(element => {
            var big_category = {
                name: element.big_category_name
            }
            big_categories.push(big_category);
        });
        var bigname = {
            data: big_categories
        }

        var sql = 'SELECT * FROM small_category WHERE ? ORDER BY small_category_index';
        connection.query(sql, { big_category_index: bigCategory_id }, (error, results, fields) => {
            if (error) throw error;
    
            // console.log({bigCategory_id : bigCategory_id});
            // console.log(results);
    
            var small_categories = new Array();
    
            results.forEach(element => {
                var small_category = {
                    index: element.small_category_index,
                    name: element.small_category_name
                };
                small_categories.push(small_category);
            });
    
            var data = {
                data: small_categories
            };
    
            // console.log(data);
            // console.log(bigCategory_name);
            console.log(bigname);
            res.render('select_category', {
                bigname : bigname,
                small_categories: data
            });
    
            // res.send('123');
        });

    });


    
}