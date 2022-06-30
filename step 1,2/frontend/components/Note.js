export default function Note({content}) {
    return (
        <div className={"w-1/3 h-96 shadow sm:rounded-md px-4 py-5 bg-white sm:p-6"}>
            <p >{content}</p>
        </div>
    )
}