import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
      purchasing: false
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
      alert('ORDER PLACED!')
   }
   render(){
      const disabledInfo = {
         ...this.state.ingredients
      }
      for (let key in disabledInfo){
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
               <OrderSummary ingredients={this.state.ingredients}
                  price={this.state.totalPrice}
                  cancel={this.cancelPurchaseHandler}
                  continue={this.continuePurchaseHandler}/>
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
export default BurgerBuilder;
