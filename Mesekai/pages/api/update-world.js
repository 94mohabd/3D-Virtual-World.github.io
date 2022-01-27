import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');


export default async function handler(req, res) {
    let data = req.body;
    let username = data.username;
    let newWorld = data.worldName;
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
                world: newWorld
              });
            res.status(200).json({ msg: "new world updated" });
        } else {
            res.status(400).json({ msg: "User Not Found!" });
        }
    } 