import FileList from "./FileList"
import FileUploader from "./FileUploader"


export default function Body(){
    return(
        <div className="flex flex-col w-full items-center justify-center gap-4 p-2">
            <FileList />
            <FileUploader />
        </div>
    )
}