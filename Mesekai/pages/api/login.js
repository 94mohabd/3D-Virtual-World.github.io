import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');


const bcrypt = require('bcrypt');

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // parse input from request
        let username = req.body.username;
        let password = req.body.password;
        let userFound = [];
        let dbPassword;

        // query database
        const doc = await Users.where('username', '==', username).get();
        doc.forEach(doc => {
            //console.log(doc.id, '=>', doc.data());
            userFound.push(doc.data());
        });
        if (!doc.empty) {
            dbPassword = userFound[0].password;
            // check correct password
            const match = await bcrypt.compare(password, dbPassword);
            if (match) {
                const session = {user: username}
                return res.status(200).json({ msg: "login success", body: session });
            } else {
                return res.status(400).json({ msg: "incorrect password" });
            }
        } else {
            return res.status(400).json({ msg: "username not found" });
        }
    } else {
        return res.status(405).json({ msg: "handler only accepts POST" });
    }
}