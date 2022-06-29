import {ExclamationIcon} from '@heroicons/react/solid'
import ProceedContext from "/contexts/ProceedContext"
import {useContext} from "react";

export default function Warning() {
    const {proceed, setProceed} = useContext(ProceedContext)

    return (
        <div className = "rounded-md bg-yellow-50 p-4 w-1/3">
            <div className = "flex">
                <div className = "flex-shrink-0">
                    <ExclamationIcon className = "h-5 w-5 text-yellow-400" aria-hidden = "true"/>
                </div>
                <div className = "ml-3 flex-1 md:flex md:justify-between">
                    <p className = "text-sm text-yellow-700">By opening this link, you gonna lose the note!</p>
                    <p className = "mt-3 text-sm md:mt-0 md:ml-6">
                        <a href = "#" className = "whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-600"
                           onClick = {() => {
                               setProceed(true)
                           }}
                        >
                            Proceed <span aria-hidden = "true">&rarr;</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}