import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../../shared/utility'


const INGREDIENT_PRICES ={
    salad: 1,
    bacon: 2.5,
    cheese: 1.5,
    meat: 6
}


const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    addedIngredients:[],
    building: false
}

const reducer = (state=intialState, action) => {
    switch (action.type){
        
        case actionTypes.ADD_INGREDIENT:
            const newIngArr = [...state.addedIngredients];
            return updateObject(state, {ingredients:updateObject(state.ingredients,{[action.ingredientName]: state.ingredients[action.ingredientName] + 1}),addedIngredients: newIngArr.concat(action.ingredientName),totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName], building: true}); 
            
        case actionTypes.REMOVE_INGREDIENT:
            const newIngArrR = [...state.addedIngredients].reverse();
            for(let i in [...newIngArrR]){
                if (action.ingredientName === newIngArrR[i]){
                    newIngArrR.splice(i, 1);
                    break;
                }
            }
            return updateObject(state, {addedIngredients: newIngArrR.reverse(),ingredients:updateObject(state.ingredients,{[action.ingredientName]: state.ingredients[action.ingredientName] - 1}), totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName], building: true} );

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, { ingredients:{salad: action.ingredients.salad, bacon: action.ingredients.bacon, cheese: action.ingredients.cheese,meat: action.ingredients.meat},error: false, addedIngredients:[],  totalPrice: 4, building: false})
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true}); 
                
        default:
            return state
    }
   
}

export default reducer;