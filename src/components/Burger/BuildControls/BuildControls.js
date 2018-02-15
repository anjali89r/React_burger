import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css';

const controls = [
   {label: 'Salad', type: 'salad'},
   {label: 'Bacon', type: 'bacon'},
   {label: 'Cheese', type: 'cheese'},
   {label: 'Meat', type: 'meat'},

]



const buildControls = (props) => {

   const res = controls.map(el => {
      return <BuildControl
               key={el.label}
               label={el.label}
               added={()=>props.ingredientAdded(el.type)}
               removed={()=>props.ingredientReduced(el.type)}
               disabled={props.disabled[el.type]}
            />
   })

   return (
      <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {res}
        <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}>ORDER NOW</button>
      </div>
   )
}

export default buildControls;
