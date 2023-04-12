import axios from "axios"
import { useEffect, useState } from "react"

export default function FileList(){

    const [ fileList, setFileList ] = useState([])

    const getData = async () => {
        const { data } = await axios.get('http://localhost:8080/files')
        console.log(data)
        setFileList(data)
    }

    function handleRemove(fileName){
        axios.post(`http://localhost:8080/remove/${fileName}`)
        getData()
    }

    useEffect(() => {
        console.log('FileList')
        
        getData()
    }, [])

    const displayFiles = fileList.map(file => {
        return(
            <li key={file.url} className="w-full flex text-center">
                <a className="bg-blue-100 hover:bg-blue-200 active:bg-blue-300 w-full rounded-l-lg p-1" href={file.url}>{file.name}</a>
                <div className="flex">
                    <a className="bg-green-200 hover:bg-green-300 active:bg-green-400 text-green-400 hover:text-green-500 active:text-green-600 border-x-[1px] px-2 flex items-center" href={file.url}><img src="https://cdn-icons-png.flaticon.com/512/62/62055.png" className="w-4" alt="download" /></a>
                    <button className="bg-red-200 hover:bg-red-300 active:bg-red-400 text-red-400 hover:text-red-500 active:text-red-600 rounded-r-lg p-1 px-2"><img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917378.svg?token=exp=1681256102~hmac=bb0ba49290fbd3579b31db145e8fac05" className="w-4" alt="trash" onClick={() => handleRemove(file.name)} /></button>
                </div>
            </li>
        )
    })

    return(
        <div className="bg-white p-4 rounded-lg shadow-md w-[50%]">
            <div className="flex relative items-center justify-center">
                <h1 className="text-center font-semibold text-lg">File List</h1>
                <button onClick={getData} className="absolute right-0 top-0 text-blue-300 hover:text-blue-500 cursor-pointer">Carregar</button>
            </div>
            <ul className="flex flex-col w-ful gap-1 items-center max-h-48 overflow-auto">
                {displayFiles}
            </ul>
        </div>
    )
}