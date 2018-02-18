import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const Ingredient_Prices = {
   salad: 0.5,
   bacon: 0.4,
   meat: 1.4,
   cheese: 0.7
}

class BurgerBuilder extends Component {
   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      totalPrice : 3,
      purchase: false,
      purchasing: false,
      loading: false
   }

   purchaseHandler = () => {
      this.setState({
         purchasing: true
      })
   }
   updatePurchaseState = (ingredients)=>{

      const sum = Object.keys(ingredients)
            .map(el => {
               return ingredients[el];
            })
            .reduce((initialSum, curr)=>{
               return initialSum + curr;
            }, 0)

      this.setState({
         purchase: sum > 0
      })
   }

   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceAddition = Ingredient_Prices[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      this.setState({
         ingredients: updatedIngredients,
         totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount <= 0){return;}
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
         ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceReduction = Ingredient_Prices[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceReduction;
      this.setState({
         ingredients: updatedIngredients,
         totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients );
   }
   cancelPurchaseHandler = ()=>{
      this.setState({
         purchasing: false
      })
   }
   continuePurchaseHandler = ()=> {
      //alert('ORDER PLACED!')
      this.setState({loading: true})
      const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                  name: 'Anjali',
                  address: {
                        street: '3011 christiana',
                        zipcode: '36446',
                        country: 'usa'
                  },
                  email: 'anj123@gmail.com'
            },
            deliveryMethod: 'fastest'
      }

      axios.post('/orders.json', order)
      .then(response => {
            this.setState({loading: false, purchasing: false})
            //console.log(response);
      }).catch(err => {
            this.setState({loading: false, purchasing: false})
            //console.log(err);
      })
   }
   render(){
      const disabledInfo = {
         ...this.state.ingredients
      }
      for (let key in disabledInfo){
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let  orderSummary;
      if(this.state.loading){
            orderSummary = <Spinner />
      }
      else{
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}/>
      }

      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
               { orderSummary}
            </Modal>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls
               ingredientAdded={this.addIngredientHandler}
               ingredientReduced={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchasable={this.state.purchase}
               ordered={this.purchaseHandler}
            />
         </Aux>
      );
   }
}
export default withErrorHandler(BurgerBuilder, axios);
