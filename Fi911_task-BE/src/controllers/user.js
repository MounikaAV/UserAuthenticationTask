const express = require('express')
const router = express.Router()
var mysqlLib = require('../config/mysqlLib');

router.post('/all', async (req, res) => {
    const user_name = req.body.user_name
    mysqlLib.getConnection(function (err, mclient) {
        var sql = `SELECT user_id, user_name, first_name, last_name FROM Users WHERE user_name != \'${req.body.user_name}\' AND soft_delete=0`
        mclient.query(sql, function (err, rows) {
            if (err) throw err;
            console.log("Fetched Users");
            res.status(200).json(rows);
        });
    });
})

router.post('/update', async (req, res) => {
    const user_name = req.body.current_user_name
    const userData = req.body.tobeUpdatedUserData
    console.log(userData)
    mysqlLib.getConnection(function (err, mclient) {
        var sql = `UPDATE Users SET first_name = \'${userData.first_name}\',last_name = \'${userData.last_name}\', updated_date = NOW() WHERE user_id = \'${userData.user_id}\'`
        mclient.query(sql, function (err, rows) {
            if (err) throw err;
            // else if (rows.length <= 0) res.status(400).json({ message: 'no Users Exists' })
            else {
                console.log('Updated User Successfully')
                res.status(200).json({ message: `Updated User Successfully of user_Id ${userData.user_id}` });
            }
        });
    });
})

router.post('/delete', async (req, res) => {
    const user_name = req.body.current_user_name
    const userData = req.body.tobeDeletedUserData
    mysqlLib.getConnection(function (err, mclient) {
        var sql = `UPDATE Users SET soft_delete = True, deleted_date = NOW() WHERE user_id = \'${userData.user_id}\'`
        mclient.query(sql, function (err, rows) {
            if (err) throw err;
            else {
                console.log('Deleted User Successfully')
                res.status(200).json({ message: `Deleted User Successfully of user_Id ${userData.user_id}` });
            }
        });
    });
})

module.exports = router;
