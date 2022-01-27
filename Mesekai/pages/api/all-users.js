import firebase from '../../firebase';
const Users = firebase.firestore().collection('Users');

// <------ printout the users accounts Database -------->
export default async function handler(req, res) {
    let allUsers = [];

    await Users.get().then((querySnapshot) => {
        querySnapshot.forEach(document => {
            allUsers.push(document.data());
            //console.log(document.data());
        })
    })
    console.log(allUsers);
    res.status(200).json({ msg: "All Users in database", body: allUsers });
}