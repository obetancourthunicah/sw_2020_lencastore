import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default ({component:CustomComponent, auth, ...rest})=>{
    return(
      <Route
        {...rest}
        component={
          (props)=>{
            return (
                (auth.isLogged) ?
                (<CustomComponent {...props} auth={auth} />):
                (
                  <Redirect
                    to={
                      {
                        pathname:"/login",
                        state:{
                          from: props.location
                        }
                      }
                    }
                  />
                )
            )
          }
        }
      />
    )

}
