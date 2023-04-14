import { useState } from "react"
import axios from "axios"

export default function FileUploader(props){
    const [formData, setFormData] = useState({file: []})

    function removeFile(fileName){
        setFormData(prevState => ({
            ...prevState,
            file: prevState.file.filter(file => file.name != fileName)
        }))
    }

    const showFiles = formData.file.map(file => {
        return (
            <li key={file.name} className="flex text-center w-full">
                <p className="bg-blue-100 hover:bg-blue-200 active:bg-blue-300 w-full rounded-l-lg p-1">{file.name}</p>
                <button className="bg-red-200 hover:bg-red-300 active:bg-red-400 text-red-400 hover:text-red-500 active:text-red-600 rounded-r-lg p-1 px-2" onClick={() => removeFile(file.name)}>X</button>
            </li>
        )
    })

    function handleSubmit(event){
        event.preventDefault()
        const getData = async () => {
            try{
                const { data } = await axios.post('http://localhost:3001/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                setFormData({file: []})
                alert(data.message)
            }catch(e){
                alert(e.response.data.message)
            }
        }
        
        getData()
    }

    function handleUploadFile(event){
        const { files } = event.target
        if(files.length > 0 ){
            let result = []
            for( const newfile of files){
                let isNew = true
                formData.file.forEach(file => {
                    if(file.name == newfile.name){
                        isNew = false
                    }
                })
                if(isNew){
                    result.push(newfile)
                }else{
                    window.alert('Arquivo já selecionado!')
                }
            }

            setFormData(prevState => ({
                ...prevState,
                file: [...prevState.file, ...result]
            }))
        }
        event.target.value = ''
    }

    function handleChange(event){
        const { name, value, File } = event.target
        console.log(File)
        console.log(event.target.file)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return(
        <div className="bg-white p-4 rounded-lg w-[50%] shadow-md">
            <h1 className="text-center font-semibold text-lg">File Upload</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* <div className="flex flex-col">
                    <label className="text-center" htmlFor="name">Name</label>
                    <input className="outline-none rounded-lg border-[1px] shadow-inner border-blue-200 p-2" required
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div> */}
                <div className="flex flex-col items-center gap-2">
                    <label className="text-center bg-blue-200 p-2 rounded-lg cursor-pointer hover:bg-blue-300 active:bg-blue-400 flex items-center" htmlFor="file"><img src="https://cdn-icons-png.flaticon.com/512/237/237510.png" alt="attach" className="w-4" />Add</label>
                    <input className="outline-none rounded-lg border-[1px] shadow-inner border-blue-200 p-2" hidden
                        id="file"
                        name="file"
                        type="file"
                        multiple
                        onChange={handleUploadFile}
                    />
                    <ul className="flex flex-col w-ful gap-1 items-center max-h-48 overflow-auto w-full">
                        {showFiles}
                    </ul>
                </div>
                <button className="bg-green-300 p-2 rounded-lg hover:bg-green-400 active:bg-green-500">Enviar</button>
            </form>
        </div>
    )
}