import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import React from 'react';
import Checkout from './pages/checkout/checkout.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx'
import HomePage from './pages/homepage/homepage.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';

class App extends React.Component {

  unsuscribeFromAuth = null

  componentDidMount(){

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
          this.props.setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          });
        });

      }
      this.props.setCurrentUser(null);

    });
  }

  componentWillUnmount(){
    this.unsubsribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path='/signin' render={()=>this.props.currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user})=>(
  {
    currentUser: user.currentUser
  }
)

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user =>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
