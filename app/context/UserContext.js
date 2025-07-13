'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import {  auth, firestore } from '@/lib/firebase.init'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && user.emailVerified) {
                const userDoc = await getDoc(doc(firestore, "users", user.uid))
                console.log("userdoc :",userDoc)
                if (!userDoc.exists()) {
                    const regData = JSON.parse(localStorage.getItem("registrationData") || '{}')
                    await setDoc(doc(firestore, "users", user.uid), {
                        name: regData.name || "",
                        email: user.email,
                        password: regData.password || "",
                        dueDate: regData.dueDate || null,
                    })
                    localStorage.removeItem("registrationData")
                }
                setUser({ ...user, ...userDoc.data() })
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    console.log("firstname", "UserContext", user)

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)