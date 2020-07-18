var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/', (req, res) => {

    // var mysqlHost = process.env.MYSQL_HOST || '';
    // var mysqlPort = process.env.MYSQL_PORT || '';
    // var mysqlUser = process.env.MYSQL_USER || '';
    // var mysqlPass = process.env.MYSQL_PASS || '';
    // var mysqlDB = process.env.MYSQL_DB || '';

    var connectionOptions = {
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
    };
    res.status(200).send({
        success: 'true',
        message: 'Seja Bem-Vindo(a) ao mundo Docker!',
        version: '1.0.0',
    });
    console.log('MySQL Connection config:');
    console.log(connectionOptions);

    var connection = mysql.createConnection(connectionOptions);

    connection.connect();

    connection.query('SELECT * FROM SWITCH', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);

        responseStr = '';

        results.forEach(function (data) {
            responseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (responseStr.length == 0)
            responseStr = 'No records found';

        console.log(responseStr);

        res.status(200).send(responseStr);
    });

    connection.end();
});


app.listen(port, function () {
    console.log('Aplicação executando na porta: ' + port);
});