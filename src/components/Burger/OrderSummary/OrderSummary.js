import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
      //THIS COULD BE A FUNTIONAL COMPONENT, componentWillUpdate is not neede here
      componentWillUpdate(){
            console.log('ORDER SUMMARY UPDATES')
      }
      render(){
            const orderSummary = Object.keys(this.props.ingredients)
            .map(el => {
               return (
                  <li key={el}>
                     <span style={{textTransform: 'capitalize'}}>{el}</span>: {this.props.ingredients[el]}
                  </li>
               )
            })
            return(
                  <Aux>
            <h3>Here is your order!</h3>
            <p>your burger with following ingredients</p>
            <ul>
               {orderSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger"
               clicked={this.props.cancel}
            >CANCEL</Button>
            <Button btnType="Success"
               clicked={this.props.continue}
            >CONTINUE</Button>

         </Aux>
            )
      }
}


export default OrderSummary;



// const orderSummary = (props) => {
//    const orderSummary = Object.keys(props.ingredients)
//          .map(el => {
//             return (
//                <li key={el}>
//                   <span style={{textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]}
//                </li>
//             )
//          })
//    return(
//       <Aux>
//          <h3>Here is your order!</h3>
//          <p>your burger with following ingredients</p>
//          <ul>
//             {orderSummary}
//          </ul>
//          <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//          <p>Continue to checkout?</p>
//          <Button btnType="Danger"
//             clicked={props.cancel}
//          >CANCEL</Button>
//          <Button btnType="Success"
//             clicked={props.continue}
//          >CONTINUE</Button>

//       </Aux>
//    )
// }


