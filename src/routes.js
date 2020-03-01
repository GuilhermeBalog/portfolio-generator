import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Portfolio from './pages/Portfolio'
import Login from './pages/Login'

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/portfolio/:username" component={Portfolio} />
        </BrowserRouter>
    )
}

export default Routes