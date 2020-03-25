import * as React from "react"
// import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import About from "./views/About"
import AccountManagement from "./views/AccountManagement"
import ChatList from './views/ChatList'
import ChatWindow from "./views/ChatWindow"
import Dashboard from "./views/Dashboard"
import Landing from "./views/Landing"
import Marketplace from "./views/Marketplace"
import NewSalesItem from "./views/NewSalesItem"
import NotFound from "./views/NotFound"
import Review from "./views/Review"
import SalesItem from "./views/SalesItem"
import SearchResults from "./views/SearchResults"
import LoggedInRoute from "./LoggedInRoute"
import LoggedOutRoute from "./LoggedOutRoute"

const Pages = () => {
    return (
        <Switch>
            <LoggedOutRoute path="/" exact={true} component={Landing} />
            <LoggedOutRoute path="/about" exact={true} component={About} />

            <LoggedInRoute path="/home" exact={true} component={Dashboard} />
            <LoggedInRoute path="/account" exact={true} component={AccountManagement} />
            <LoggedInRoute path="/chat" exact={true} component={ChatList} />
            <LoggedInRoute path="/chat/:chatid" exact={true} component={ChatWindow} />
            <LoggedInRoute path="/marketplace" exact={true} component={Marketplace} />
            <LoggedInRoute path="/marketplace/new" exact={true} component={NewSalesItem} />
            <LoggedInRoute path="/marketplace/:itemid" exact={true} component={SalesItem} />
            <LoggedInRoute path="/marketplace/:itemid/review" exact={true} component={Review} />
            <LoggedInRoute path="/marketplace/search" exact={true} component={SearchResults} />

            <Route path="**" component={NotFound} />
        </Switch>
    )
}

export default Pages