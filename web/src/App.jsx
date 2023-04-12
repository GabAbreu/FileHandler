import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"

export default function App(){
    return(
        <div className="flex flex-col justify-between w-screen h-screen">
            <Header />
            <Body />
            <Footer />
        </div>
    )
}