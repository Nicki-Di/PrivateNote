import {useState} from "react";
import axios from "axios";
import config from "/utils/confing.json";


export default function AddNote() {
    const [note, setNote] = useState("")
    const [link, setLink] = useState("")
    const submit = () => {
        if (note) {
            console.log(config.baseURL + process.env.NEXT_PUBLIC_PORT + config.addNote)
            axios.post(config.baseURL + process.env.NEXT_PUBLIC_PORT + config.addNote, {
                "content": note,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    setLink(`http://localhost:3000/notes/${response.data}`)

                })
                .catch(error => {
                    alert("Adding note failed! :( ")
                    console.log(error);
                    return false;
                })
        } else {
            alert("Don't you wanna write something?!")
        }
    }
    return (
        <div className = {"w-1/3"}>
            <form>
                <div className = "shadow sm:rounded-md mt-8">
                    <div className = "px-4 py-5 bg-white sm:p-6">
                        <div>
                            <label htmlFor = "about" className = "block text-sm font-medium text-gray-700">
                                Note
                            </label>
                            <div className = "mt-1">
                      <textarea
                          id = "note"
                          name = "note"
                          rows = {12}
                          className = "px-3 shadow-sm focus:ring-violet-500 focus:border-violet-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder = "Blah blah..."
                          value = {note}
                          onChange = {(e) => setNote(e.target.value)}
                      />
                            </div>
                            <a className = "mt-2 text-sm text-gray-500" href = {link ? link : ""}>
                                {link ? "Note link" : "You will get the link after submit."}
                            </a>
                        </div>
                    </div>
                    <div className = "px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type = "button"
                            className = "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            onClick = {() => {
                                submit()
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}