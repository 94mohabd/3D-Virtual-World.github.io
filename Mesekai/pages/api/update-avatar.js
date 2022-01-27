import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');


export default async function handler(req, res) {
    let data = req.body;
    let username = data.username;
    let newAvatar = data.avatarName;
    let userFound = [];
    //const doc = await Users.doc(username).get();

    const doc = await Users.where('username', '==', username).get();
    doc.forEach(doc => {
      //console.log(doc.id, '=>', doc);
      userFound.push(doc.id);
    });
    // check if user already in db 
    if (!doc.empty) {
            Users.doc(userFound[0]).update({
                avatar: newAvatar
              });
            res.status(200).json({ msg: "new avatar updated" });
        } else {
            res.status(400).json({ msg: "User Not Found!" });
        }
 } 