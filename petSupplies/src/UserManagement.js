import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
export const usersKey = 'users';

export default function UserManagement({users, setUsers, styles, settings}) {
    function newUser() {
        const newUsers = users.slice();
        newUsers.push({uname: "", password: ""})
        setUsers(newUsers);
    }
    return (
        <>
            <View>
                {users.map((user, ind) => {
                    return <User key={ind} ind={ind} users={users} setUsers={setUsers} styles={styles} settings={settings} />
                })}
            </View>
            <Button title="new user" onPress={newUser} />
        </>
    )
}

function User({ind, users, setUsers, styles, settings}) {
    const [uname, setUname] = useState(users[ind].uname);
    const [password, setPassword] = useState(users[ind].password);
    function deleteUser() {
        const newUsers = users.toSpliced(ind, 1);
        setUsers(newUsers);
    }
    function saveUser() {
        if (uname.length < settings.usernameMinLength) {
            alert(`Username is below the minimum length of ${settings.usernameMinLength}`);
            return;
        }
        if (password.length < settings.passwordMinLength) {
            alert(`Password is below the minimum length of ${settings.passwordMinLength}`);
            return;
        }
        const newUsers = users.slice();
        newUsers[ind] = {...newUsers[ind], uname, password}
        setUsers(newUsers);
    }

    return (
        <View id="userContainer" style={styles.userContainer}>
            <Text style={styles.settingsLabelText}>
                User #{ind + 1}
            </Text>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textInputLabel}>
                    Username:
                </Text>
                <TextInput style={styles.textInput} value={uname} onChangeText={setUname}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textInputLabel}>
                    Password:
                </Text>
                <TextInput style={styles.textInput} value={password} onChangeText={setPassword} />
            </View>
            <Button title="Save" onPress={saveUser} />
            <Button title="Delete" color="red" onPress={deleteUser} />
        </View>
    )
}