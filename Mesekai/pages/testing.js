import React from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined} from '@ant-design/icons';


export default function Testing() {

    const[username, setUsername] = React.useState('');
    const[oldPassword, setOldPassword] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[newPassword, setNewPassword] = React.useState('');
    const[avatarName, setAvatarName] = React.useState('');
    const[worldName, setWorldName] = React.useState('');

    const[userList, setUserList] = React.useState([]);

    const[userFound, setUserFound] = React.useState([]);
    const[avatarFound, setAvatarFound] = React.useState([]);
    const[worldFound, setWorldFound] = React.useState([]);
    

    const handleUserName = (e) => {
        setUsername(e.target.value);
    };


    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };


    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };


    const handleAvatarName = (e) => {
        setAvatarName(e.target.value);
    };


    const handleWorldName = (e) => {
        setWorldName(e.target.value);
    };



/**********************************************************
 *  
 *      update Avatar
 */
    const updateAvatar = (e) => {
        if (username === '' && avatarName === '') {
            e.preventDefault();
            return;
        }

        
        const body = {
            username: username,
            avatarName: avatarName
        };


        fetch('/api/update-avatar', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status == 200) {
                alert("Avatar change Success");
            } else {
                alert("Avatar change Failure");
            }
        })
        .catch((err) => console.log(err));
    };



/**********************************************************
 *  
 *      update World
 */
const updateWorld = (e) => {
    if (username === '' && worldName === '') {
        e.preventDefault();
        return;
    }

    
    const body = {
        username: username,
        worldName: worldName
    };


    fetch('/api/update-world', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
            alert("World change Success");
        } else {
            alert("World change Failure");
        }
    })
    .catch((err) => console.log(err));
};




/**********************************************************
 *  
 *      search by username 
 */
 const searchByUserName = (e) => {
    if (username === '') {
        e.preventDefault();
        return;
    }
    

    const body = {
        username: username
    };


    fetch('/api/search-username', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
           return res.json();
        } else {
            alert("User Not Found Failure");
        }
    })
    .then((data) => {
        if(data.msg === "User Found!"){
            setUserFound(data.body);
        }
    })
    .catch((err) => console.log(err));
};



/**********************************************************
 *  
 *      display all registered users
 */
 const allUsers = (e) => {

    fetch('/api/all-users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
            return res.json();
        } else {
            alert("User Not Found Failure");
        }
    })
    .then((data) => {
        if(data.msg === "All Users in database"){
            setUserList(data.body);
        }
        
    })
    .catch((err) => console.log(err));
};



/**********************************************************
 *  
 *      update old password
 */
 const updateOldPassword = (e) => {
    if (username === '' && oldPassword === '' && newPassword === '') {
        e.preventDefault();
        return;
    }

    
    const body = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword
    };


    fetch('/api/update-password', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
            alert("Password change Success");
        } else {
            alert("Password change Failure");
        }
    })
    .catch((err) => console.log(err));
};



/**********************************************************
 *  
 *      display users's avatar
 */
 const getAvatar = (e) => {
    if (username === '') {
        e.preventDefault();
        return;
    }
    

    const body = {
        username: username
    };


    fetch('/api/get-avatar', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
           return res.json();
        } else {
            alert("User Not Found Failure");
        }
    })
    .then((data) => {
        if(data.msg === "User Found!"){
            setAvatarFound(data.body);
        }
    })
    .catch((err) => console.log(err));
};


/**********************************************************
 *  
 *      display users's avatar
 */
 const getWorld = (e) => {
    if (username === '') {
        e.preventDefault();
        return;
    }
    

    const body = {
        username: username
    };


    fetch('/api/get-world', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
           return res.json();
        } else {
            alert("User Not Found Failure");
        }
    })
    .then((data) => {
        if(data.msg === "User Found!"){
            setWorldFound(data.body);
        }
    })
    .catch((err) => console.log(err));
};


/**********************************************************
 *  
 *      reset password
 */
 const resetPassword = (e) => {
    if (username === '' && email === '' && newPassword === '') {
        e.preventDefault();
        return;
    }

    
    const body = {
        username: username,
        email: email,
        newPassword: newPassword
    };


    fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.status == 200) {
            alert("Password change Success");
        } else {
            alert("Password change Failure");
        }
    })
    .catch((err) => console.log(err));
};



   

    return (
        <div>
            <header>
                <h1>Testing</h1>
            </header>
            <h2>  Buttons for Testing APIs </h2>
            <Form>
                
            <Form.Item name="username" rules={[{required: true, message: "Please input your username!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                    type="text" name="username" value={username} onChange={handleUserName} />
                </Form.Item>

            
            <Form.Item name="avatar" rules={[{required: true, message: "Please input your avatar!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Avatar Name" 
                    type="text" name="avatarName" value={avatarName} onChange={handleAvatarName} />
                </Form.Item>
                
                
                <Form.Item name="world" rules={[{required: true, message: "Please input your world!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="World Name" 
                    type="text" name="worldName" value={worldName} onChange={handleWorldName} />
                </Form.Item>
                <br/><br/>
                </Form>

            <Button type="primary" htmlType="submit" className="login-form-button" onClick={updateAvatar}>update avatar</Button>
            <br/><br/>


            <Button type="primary" htmlType="submit" className="login-form-button" onClick={updateWorld}>update World</Button>
            <br/><br/>

            <Button type="primary" htmlType="submit" className="login-form-button" onClick={getAvatar}>get avatar</Button>
            <br/><br/>
            {avatarFound.map( (user,i ) => <div key = {i} style = {{color: "green"}}>username : {user.username}<br/>
                                                                                   avatar : {user.avatar} <br/>
                                                                                   </div>)}

            <Button type="primary" htmlType="submit" className="login-form-button" onClick={getWorld}>get world</Button>
            <br/><br/>
            {worldFound.map( (user,i ) => <div key = {i} style = {{color: "green"}}>username : {user.username}<br/>
                                                                                   world : {user.world} <br/>
                                                                                   </div>)}
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={searchByUserName}>search by username</Button>
            <br/><br/>
            {userFound.map( (user,i ) => <div key = {i} style = {{color: "green"}}>username : {user.username}<br/>
                                                                                   email : {user.email}<br/>
                                                                                   avatar : {user.avatar} <br/>
                                                                                   world : {user.world}</div>)}

            


            <h3><b>  Update Old Password </b> </h3>
            
            <Form.Item name="username" rules={[{required: true, message: "Please input your username!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                    type="text" name="username" value={username} onChange={handleUserName} />
                </Form.Item>


            <Form.Item name="password" rules={[{required: true, message: "Please input your Old password!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Old Password" 
                    type="Password" name="OldPassword" value={oldPassword} onChange={handleOldPassword} />
                </Form.Item>


                <Form.Item name="password" rules={[{required: true, message: "Please input your New password!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="New Password" 
                    type="Password" name="NldPassword" value={newPassword} onChange={handleNewPassword} />
                </Form.Item>


                <Button type="primary" htmlType="submit" className="login-form-button" onClick={updateOldPassword}>update password</Button>
                <br/><br/>
                <br/><br/>
                <h3><b>  Reset Password </b> </h3>
            
            <Form.Item name="username" rules={[{required: true, message: "Please input your username!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                    type="text" name="username" value={username} onChange={handleUserName} />
                </Form.Item>


            <Form.Item name="email" rules={[{required: true, message: "Please input your email!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" 
                    type="email" name="email" value={email} onChange={handleEmail} />
                </Form.Item>


                <Form.Item name="password" rules={[{required: true, message: "Please input your New password!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="New Password" 
                    type="Password" name="NldPassword" value={newPassword} onChange={handleNewPassword} />
                </Form.Item>


                <Button type="primary" htmlType="submit" className="login-form-button" onClick={resetPassword}>Reset password</Button>
                <br/><br/>
                <br/><br/>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={allUsers}>display all registered users</Button>
                <br/><br/>
                <h3><b>List of users: </b></h3>
                {userList.map( (user,i ) => <div key = {i} style = {{color: "green"}}>username #{i+1}: {user.username}<br/>
                                                                                      email : {user.email}<br/>
                                                                                      avatar : {user.avatar} <br/>
                                                                                      world : {user.world}</div>)}
        </div>
    );
}