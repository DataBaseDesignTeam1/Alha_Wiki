import { connection } from "../db";
import routes from "../routes";

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

export const in_big_category = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;

    var sql = 'SELECT big_category_name FROM big_category WHERE ?';
    connection.query(sql, { big_category_index: bigCategory_id }, (error, topic, fields) => {
        if (error) throw error;

        // console.log(results[0].big_category_name);
        // console.log(topic);
        var big_categories = new Array();
        topic.forEach(element => {
            var big_category = {
                index: bigCategory_id,
                name: element.big_category_name
            }
            big_categories.push(big_category);
        });
        var bigCategory = {
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
            // console.log(bigCategory);

            res.render('select_category', {
                bigCategory: bigCategory,
                small_categories: data
            });
        });
    });
}

export const select_business = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;
    var smallCategory_id = req.params.smallc_id;

    var bigCategory_name = "";
    var smallCategory_name = "";

    var category_nums = {
        big_category_index: bigCategory_id,
        small_category_index: smallCategory_id
    }

    var sql = `SELECT business_index, business_name, business_state, business_city, business_detail_address FROM business WHERE ? ORDER BY business_index`;
    connection.query(sql, { small_category_index: smallCategory_id }, (error, results, fields) => {
        if (error) throw error;
        // console.log(results);
        var businesses = new Array();
        results.forEach(element => {
            var business = {
                business_index: element.business_index,
                business_name: element.business_name,
                business_state: element.business_state,
                business_city: element.business_city,
                business_detail_address: element.business_detail_address
            }
            businesses.push(business);
        });

        var indexes = {
            data: category_nums
        }

        var data = {
            data: businesses
        }
        // console.log(data);
        // console.log(indexes.data);
        // res.send("select_business");
        res.render('select_business', {
            indexes: indexes,
            businesses: data
        });
    });

}

export const get_alba_wiki = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;
    var smallCategory_id = req.params.smallc_id;
    var business_id = req.params.business_id;
    
    var sql = `SELECT business_name, tip, recruit_url, is_recruiting, update_date, update_id FROM business WHERE ?`;
    connection.query(sql, { business_index : business_id }, (error, business, fields) => {
        if(error) throw error;

        var sql = `SELECT a.content, a.star_point, a.write_date, b.name FROM review AS a JOIN member AS b ON a.id = b.id WHERE a.business_index = ?`;
        connection.query(sql, [business_id], (error, results, fields) => {
            if(error) throw error;

            // console.log(results);
            var reviews = new Array();
            results.forEach(element => {
                var review = {
                    content: element.content,
                    star_point: element.star_point,
                    write_date: element.write_date,
                    writer: element.name
                }
                reviews.push(review);
            });
            var data = {
                data: reviews
            }
            // console.log(data);
            // console.log(business[0]);
            res.render('albawiki', {
                business: business[0],
                reviews: data
            });
        });
    });
}
export const post_alba_wiki = (req, res, next) => {
    res.send("123");
}

export const post_write_review = (req, res, next) => {
    console.log(req.body);

    var sql = 'SELECT business_index FROM business WHERE ?';
    connection.query(sql, { business_name : req.body.businessName },(error, results, fields) => {
        if(error) throw error;

        console.log(results);

        var sql = `INSERT INTO review (content, star_point, write_date, business_index, id) VALUES (?, ?, ?, ?, ?)`;

        
        var date = new Date();
        // console.log(`input_date : ${input_date}`);
        var content = req.body.content;
        var star_point = req.body.star_point;
        var input_date = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0"+date.getDate()).slice(-2);
        var business_index = results[0].business_index;
        var userId = req.body.userId;

        var params = [content, star_point, input_date, business_index, userId];
        console.log(params);
        connection.query(sql, params, (error, rows, fields) => {
            if(error) throw error;

            console.log(rows);
        });        
    });

    
    
}

export const login = (req, res, next) => {
    res.render(`login`);
}

export const logout = (req, res, next) => {
    res.send(`LOGOUT`);
}

export const signup = (req, res, next) => {
    res.render(`SignUp.html`);
}

