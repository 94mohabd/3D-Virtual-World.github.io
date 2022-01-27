import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');

const bcrypt = require('bcrypt');

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // parse input from request
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        let userFound = [];
        
        // defalut world and avatar for new registered users
        let avatar = "ybot";
        let world = "grid";

        // secure password
        const hashPassword = bcrypt.hashSync(password, 15);

        // query database check if username already in database
        const doc = await Users.where('username', '==', username).get();
        doc.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          userFound.push(doc.data());
        });
        if (!doc.empty) {
            res.status(400).json({ msg: "username already exists" });
        } else {
            await Users.doc().set({
                username: username,
                email: email,
                password: hashPassword,
                avatar: avatar,
                world: world
            })
            res.status(200).json({ msg: "registration success" });
        }
    } else {
        res.status(405).json({ msg: "handler only accepts POST" });
    }
}
