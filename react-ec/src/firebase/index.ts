import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/function'
import 'firebase/storage'
import 'firebase/auth'

import {firebaseConfig} from "./config"

firebase.initializeApp(firebaseConfig)

export const auth      = firebase.auth()
export const db        = firebase.firestore()
export const storage   = firebase.storage()
export const functions = firebase.functions()

export const FirebaseTimestamp = firebase.firestore.Timestamp