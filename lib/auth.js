// import React, { useState } from "react";
// import app from "./firebase.init";



// export const AuthContext = React.createContext();


// const AuthProvider = ({ children }) => {
//     const auth = getAuth(app);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // useEffect(() => {
//     //     const fetchUser = async () => {
//     //         try {
//     //             const response = await axios.get('/api/auth/user');
//     //             setUser(response.data);
//     //         } catch (error) {
//     //             console.error('Failed to fetch user:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchUser();
//     // }, []);


//     const handlenewuser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }



//     const authinfo = {
//         user, loading, handlenewuser
//     }

//     return (
//         <AuthContext.Provider value={authinfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// }