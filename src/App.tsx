import './App.css'
import {Link, HashRouter as Router, Route, Routes} from "react-router-dom";
import * as React from "react";
import {House} from "lucide-react";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {

    return (
        <Router>
            <nav
                className={"bg-sky-900 text-sky-50 text-2xl w-full z-20 sticky top-0 flex justify-center "}
            >
                <div className={"container max-w-screen-xl p-2 flex justify-between box-border"}>
                    <Link to="/" className={"font-bold"}>Todo</Link>
                    <div className={"flex gap-2 items-center"}>
                        <Link to="/"><House size={24}/></Link>
                        {/*<Link to="/settings"><SettingsIcon size={24}/> </Link>*/}
                    </div>
                </div>
            </nav>
            <main className="flex items-center flex-col">
                <div className={"container xl:max-w-screen-xl mt-4 mb-6"}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {/*<Route path="/settings" element={<Settings/>}/>*/}
                    </Routes>
                </div>
            </main>
            <footer className="bg-sky-900 flex justify-center font-bold fixed w-full bottom-0">
                <a className="text-sky-100" href="https://github.com/abdullah-tuncer/react-todo" target="_blank">GitHub</a>
            </footer>
        </Router>
    )
}

export default App
