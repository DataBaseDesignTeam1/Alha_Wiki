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

export const get_select_business = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;
    var smallCategory_id = req.params.smallc_id;

    var category_nums = {
        big_category_index: bigCategory_id,
        small_category_index: smallCategory_id
    }

    var sql = `SELECT business_index, business_name, business_state, business_city, business_detail_address FROM business WHERE ? ORDER BY business_index`;
    connection.query(sql, { small_category_index: smallCategory_id }, (error, results, fields) => {
        if (error) throw error;

        console.log(results);
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

        res.render('select_business', {
            indexes: indexes,
            businesses: data
        });
    });
}

export const post_select_business = (req, res, next) => {
    // console.log(req.params);
    // console.log(req.body);

    var bigCategory_id = req.params.bigc_id;
    var smallCategory_id = req.params.smallc_id;
    var state = req.body.state;
    var city = req.body.city;

    var category_nums = {
        big_category_index: bigCategory_id,
        small_category_index: smallCategory_id
    }

    console.log(state + " " + city);

    var sql = `SELECT business_index, business_name, business_state, business_city, business_detail_address FROM business WHERE small_category_index=? AND business_state=? AND business_city=? ORDER BY business_index`;
    connection.query(sql, [smallCategory_id, state, city], (error, results, fields) => {
        if (error) throw error;
        console.log(results);
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

        var data = {
            data: businesses,
            indexes: category_nums
        }
        // console.log(data);
        // console.log(indexes.data);


        res.json(data);
    });
}

export const get_alba_wiki = (req, res, next) => {
    var bigCategory_id = req.params.bigc_id;
    var smallCategory_id = req.params.smallc_id;
    var business_id = req.params.business_id;

    var sql = `SELECT business_name, tip, recruit_url, is_recruiting, update_date, update_id FROM business WHERE ?`;
    connection.query(sql, { business_index: business_id }, (error, business, fields) => {
        if (error) throw error;

        var sql = `SELECT a.content, a.star_point, a.write_date, b.name FROM review AS a JOIN member AS b ON a.id = b.id WHERE a.business_index = ?`;
        connection.query(sql, [business_id], (error, results, fields) => {
            if (error) throw error;

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

export const post_write_review = (req, res, next) => {
    // console.log(req.body);

    var sql = 'SELECT business_index FROM business WHERE ?';
    connection.query(sql, { business_name: req.body.businessName }, (error, results, fields) => {
        if (error) throw error;

        // console.log(results);

        var sql = `INSERT INTO review (content, star_point, write_date, business_index, id) VALUES (?, ?, ?, ?, ?)`;

        var date = new Date();
        // console.log(`input_date : ${input_date}`);
        var content = req.body.content;
        var star_point = req.body.star_point;
        var input_date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        var business_index = results[0].business_index;
        var userId = req.body.userId;

        var params = [content, star_point, input_date, business_index, userId];
        // console.log(params);
        connection.query(sql, params, (error, rows, fields) => {
            if (error) throw error;

            console.log(`write a review`);
        });
    });
}

export const post_enroll_member = (req, res, next) => {

    // console.log(req.body);

    var sql = `INSERT INTO member (id, pw, name, age, state, city) VALUES (?, ?, ?, ?, ?, ?)`;

    var id = req.body.id;
    var pw = req.body.pw;
    var age = req.body.age;
    var name = req.body.name;
    var state = req.body.state;
    var city = req.body.city;

    var params = [id, pw, name, age, state, city];

    connection.query(sql, params, (error, results, fields) => {
        if (error) throw error;

        console.log('sign up new member');
    });
}

export const post_update_tip = (req, res, next) => {
    console.log(req.body);

    var sql = `UPDATE business SET tip=?, recruit_url=?, is_recruiting=?, update_date=?, update_id=? WHERE business_name=?`;

    var date = new Date();

    var tip = req.body.tip;
    var recruit_url = req.body.recruit_url;
    var is_recruiting = req.body.is_recruiting;
    var update_date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    var update_id = req.body.userId;

    var businessName = req.body.businessName;

    var params = [tip, recruit_url, is_recruiting, update_date, update_id, businessName];

    connection.query(sql, params, (error, results, fields) => {
        if (error) throw error;

        // console.log(results);
        console.log("update business tip");

        var params_json = {
            data: params
        }

        res.json(params_json);
    });
}

export const get_login = (req, res, next) => {
    res.render(`login`);
}

export const post_login = (req, res, next) => {
    var input_id = req.body.id;
    var input_pw = req.body.password;

    // console.log(input_id + " " + input_pw);
    var sql = `SELECT * FROM member WHERE id=? AND pw=?`;
    connection.query(sql, [input_id, input_pw], (error, results, fields) => {
        if (error) throw error;
        var status = 1;

        console.log(results);

        if (results.length != 0) {
            status = 1;
        }
        else {
            console.log("no member");
            status = 0;
        }

        // console.log(status);
        res.json(status);
    });
}

export const get_signup = (req, res, next) => {
    res.render(`signup`);
}

export const post_signup = (req, res, next) => {
    var new_id = req.body.id;

    var sql = `SELECT * FROM member WHERE id=?`;
    connection.query(sql, [new_id], (error, results, fields) => {
        if (error) throw error;

        var status = 1;

        if (results.length != 0) {
            // console.log(results);
            status = 0;
        }
        else {
            // console.log("nothing");
            status = 1;
        }

        // console.log(status);
        res.json(status);
    });
}

export const get_recommand = (req, res, next) => {
    res.render('recommand');
}

export const post_recommand = (req, res, next) => {
    var user_id = req.body.id;

    var sql = `SELECT a.content, a.star_point, a.write_date, a.business_index, b.name FROM review AS a JOIN member AS b ON a.id = b.id WHERE a.id = ? ORDER BY a.write_date DESC`;
    connection.query(sql, [user_id], (error, writes, fields) => {
        // console.log(writes);

        var reviews = new Array();
        writes.forEach(element => {
            var review = {
                content: element.content,
                star_point: element.star_point,
                write_date: element.write_date,
                business_index: element.business_index,
                name: element.name
            }
            reviews.push(review);
        });

        var my_review_data = {
            data: reviews
        }

        var sql = `SELECT a.content, a.star_point, a.write_date, a.business_index, b.name FROM review AS a JOIN member AS b ON a.id = b.id WHERE a.id != ? ORDER BY star_point DESC, a.write_date DESC`;
        connection.query(sql, [ user_id ], (error, results, fields) => {
            if(error) throw error;

            // console.log(results);
            var recommands = new Array();

            for(var i = 0; i < results.length; i++){
                var recommand = {
                    content: results[i].content,
                    star_point: results[i].star_point,
                    write_date: results[i].write_date,
                    business_index: results[i].business_index,
                    name: results[i].name
                }
                recommands.push(recommand);
                if(i >= 3){
                    break;
                }
            }

            var data = {
                my_review_data: reviews,
                recommand_data: recommands
            }

            res.json(data);
        });

    });
}
