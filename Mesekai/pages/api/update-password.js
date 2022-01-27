import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');

const bcrypt = require('bcrypt');


export default async function handler(req, res) {
    let data = req.body;
    let username = data.username;
    let oldpassword = data.oldPassword;
    let newpassword = data.newPassword;
    let userFound = [];
    let userId = [];
    console.log(username,oldpassword,newpassword);
    let newHashPassword = bcrypt.hashSync(newpassword, 15);

    //const doc = await Users.doc(username).get();

    const doc = await Users.where('username', '==', username).get();
    doc.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      userFound.push(doc.data());
      userId.push(doc.id);
    });
    // check if user already in db 
    if (!doc.empty) {
        let oldEncryptedPassword = userFound[0].password;
        const match = await bcrypt.compare(oldpassword, oldEncryptedPassword);
        if (match) {
            Users.doc(userId[0]).update({
                password: newHashPassword
              });
              res.status(200).json({ msg: "password matchs! new password updated" });

        } else {
            res.status(400).json({ msg: "passwords don't match!" });
        }
    } else {
        res.status(400).json({ msg: "User Not Found!" });
    }
}