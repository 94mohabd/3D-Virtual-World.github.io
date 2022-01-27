import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');


export default async function handler(req, res) {
    // using params to get username could be changed to body!!
    let data = req.body;
    let username = data.user;
    let userFound = [];
    console.log("looking for %s's avatar", username);
    //const doc = await Users.doc(username).get();

    const doc = await Users.where('username', '==', username).get();
    doc.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      userFound.push(doc.data());
    });
    // check if user already in db 
    if (!doc.empty) {
        console.log(userFound[0].avatar);
        res.status(200).json({ msg: "User Found!", body: userFound[0]});
    } else {
        console.log("User Id not found");
        res.status(400).json({ msg: "User Not Found!" });
    }
}