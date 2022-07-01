import Warning from "../../components/Warning";
import styles from "../../styles/Home.module.css";
import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import ProceedContext from "/contexts/ProceedContext"
import Note from "../../components/Note";
import axios from "axios";
import config from "../../confing.json";

export default function Id() {
    const router = useRouter();
    const {id} = router.query;
    const [proceed, setProceed] = useState(false)
    const [note, setNote] = useState("")
    const value = {proceed, setProceed}

    useEffect(() => {
        if (proceed) {
            axios.get("http://" + process.env.NEXT_PUBLIC_BACKEND + ":" + process.env.NEXT_PUBLIC_PORT + config.getNote + `?id=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (response.data.startsWith("^")) {
                        alert(response.data.split("^")[1])
                    } else {
                        setNote(response.data)
                    }
                })
                .catch(error => {
                    console.log(error);
                    return false;
                })
        }
    }, [id, proceed])

    return (
        <ProceedContext.Provider value = {value}>

            <div>
                <main className = {styles.main}>

                    {
                        (proceed ? <Note content = {note}/> : <Warning/>)
                    }
                </main>
            </div>
        </ProceedContext.Provider>


    )
}