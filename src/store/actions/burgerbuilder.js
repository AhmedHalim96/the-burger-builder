import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const addIngredient = (ingredientName) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
         ingredientName: ingredientName
        }
}

export const removeIngredient = (ingredientName) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
         ingredientName: ingredientName
        }
}

export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch => {
        axios.get('https://burger-builder-39bca.firebaseio.com/Ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}