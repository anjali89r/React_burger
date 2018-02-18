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
//    state = {
//       ingredients: {
//          salad: 0,
//          bacon: 0,
//          cheese: 0,
//          meat: 0
//       },
//       totalPrice : 3,
//       purchase: false,
//       purchasing: false,
//       loading: false
//    }

//state when fetching data
state = {
            ingredients: null,
            totalPrice : 3,
            purchase: false,
            purchasing: false,
            loading: false,
            error: false
         }

      componentDidMount(){
            axios.get('https://react-burgerproject-82b0b.firebaseio.com/ingredient.json')
                  .then(response => {
                  this.setState({ingredients: response.data})
                  })
                  .catch(err=>{
                        this.setState({error: true})
                  })
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
      orderSummary = null;


      //initially ingredients is null, so only have to load the ingredients aftetr fetching data
      let burger = this.state.error ? <p>Ingredients can't be loaded due to some error</p>:<Spinner />
      if(this.state.ingredients){
            burger = (
                  <Aux>
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

            )
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}/>
      }
      if(this.state.loading){
            orderSummary = <Spinner />
      }
      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
               { orderSummary}
            </Modal>
            {burger}
         </Aux>
      );
   }
}
export default withErrorHandler(BurgerBuilder, axios);
