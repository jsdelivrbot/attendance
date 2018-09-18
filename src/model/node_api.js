var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// const mysql = require('mysql');
var dateFormat = require('dateformat');
var urlencodedParser = require('urlencoded-parser');
var http = require('http').Server(app);
var formidable = require('formidable');

var Sequelize = require('sequelize');
var userName = 'orange';
var password = 'orange505'; // update me
var hostName = '192.168.0.113'; //192.168.0.181 old
var sampleDbName = 'ORANGE_PAYROLL_INDIA';

var sampleDb = new Sequelize(sampleDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,

    port: 49172, // Default port
    logging: false, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000, // timeout = 30 seconds
        encrypt: false
    }
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded(
    {
        extended: true
    }));
app.use(bodyParser.json());
app.post('/api/attendance', urlencodedParser, function (req, res) {
    console.log(req.res.search);
    console.log(req.res.date);
    if (req.body.search && req.body.date) {
        var search = req.body.search;
        var date = new Date(req.body.date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var day = date.getDay();
        
        console.log(month)
        // CAST(Emp_InOut_Record.For_Date AS DATE) = '" + [date] + "'
        sampleDb.query("SELECT * FROM Emp_Master INNER JOIN Emp_InOut_Record on Emp_Master.Emp_Id = Emp_InOut_Record.Emp_Id where Emp_Master.Emp_First_Name LIKE '%" + [search] + "%' AND DATEPART(yy, Emp_InOut_Record.For_Date) = '" + [year] + "' AND DATEPART(mm, Emp_InOut_Record.For_Date) = '" + [month] + "' AND DATEPART(dd, Emp_InOut_Record.For_Date) = '" + [day] + "'", { type: sampleDb.QueryTypes.SELECT })
            .then(users => {
                res.send({
                    data: users
                })
            })

    } else {
        sampleDb.query("SELECT * FROM Emp_Master LEFT JOIN Emp_InOut_Record on Emp_Master.Emp_Id = Emp_InOut_Record.Emp_Id where Emp_InOut_Record.In_Out_Flag = 'O' ORDER BY Emp_InOut_Record.For_Date DESC", { type: sampleDb.QueryTypes.SELECT })
            .then(users => {
                res.send({
                    data: users
                })
            })
    }

});

app.post('/api/filter', urlencodedParser, function (req, res) {

    if (req.body.search && req.body.date) {
        var search = req.body.search;
        var date = new Date(req.body.date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        console.log(date);
        console.log(month)

        sampleDb.query("SELECT * FROM Emp_Master INNER JOIN Emp_InOut_Record on Emp_Master.Emp_Id = Emp_InOut_Record.Emp_Id where Emp_Master.Emp_First_Name LIKE '%" + [search] + "%' AND DATEPART(yy, Emp_InOut_Record.For_Date) = '" + [year] + "' AND DATEPART(mm, Emp_InOut_Record.For_Date) = '" + [month] + "'", { type: sampleDb.QueryTypes.SELECT })
            .then(users => {
                res.send({
                    data: users
                })
            })

    } else {
        sampleDb.query("SELECT * FROM Emp_Master LEFT JOIN Emp_InOut_Record on Emp_Master.Emp_Id = Emp_InOut_Record.Emp_Id where Emp_InOut_Record.In_Out_Flag = 'O' ORDER BY Emp_InOut_Record.For_Date DESC", { type: sampleDb.QueryTypes.SELECT })
            .then(users => {
                res.send({
                    data: users
                })
                // We don't need spread here, since only the results will be returned for select queries
            })
    }

});


/* ****************************************server configuration******************************************** */
var server = app.listen(5102, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port)
});

/* ****************************************************end************************************************* */