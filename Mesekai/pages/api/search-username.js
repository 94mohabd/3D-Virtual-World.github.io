import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');


export default async function handler(req, res) {
    // using params to get username could be changed to body!!
    let data = req.body;
    let username = data.username;
    let userFound = [];
    console.log("looking for username: %s", username);
    //const doc = await Users.doc(username).get();

    const doc = await Users.where('username', '==', username).get();
    doc.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      userFound.push(doc.data());
    });
    // check if user already in db 
    if (!doc.empty) {
        console.log(userFound);
        res.status(200).json({ msg: "User Found!", body: userFound});
    } else {
        console.log("User Id not found");
        res.status(400).json({ msg: "User Not Found!" });
    }
}