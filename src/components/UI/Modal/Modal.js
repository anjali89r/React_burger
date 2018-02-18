import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component{
      shouldComponentUpdate(nextProps, nextState){
            return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
      }
      componentWillUpdate(){
            console.log('MODAL SUMMARY UPDATES')
      }
      render(){
            return(
                  <Aux>
         <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div className={classes.Modal}
            style={{
               transform: (this.props.show) ? 'translateX(0)' : 'translateX(-100vh)',
               opacity: this.props.show ? '1':'0'
            }}>
         {this.props.children}
      </div>

      </Aux>
            )
      }
}

export default Modal;



// const modal = (props)=> (
//    <Aux>
//       <Backdrop show={props.show} clicked={props.modalClosed}/>
//    <div className={classes.Modal}
//          style={{
//             transform: (props.show) ? 'translateX(0)' : 'translateX(-100vh)',
//             opacity: props.show ? '1':'0'
//          }}>
//       {props.children}
//    </div>
//    </Aux>
// )

// export default modal;
