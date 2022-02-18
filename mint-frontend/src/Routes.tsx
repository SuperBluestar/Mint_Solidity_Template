import Home from "pages/Home"

import Header from "layouts/Header"

const Routes = () => {
    return (
        <div className="w-full flex flex-col">
            <Header />
            <Home></Home>
        </div>
    )
}

export default Routes;