import React from 'react';
import './cart-icon.styless.scss';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {ReactComponent as ShoppingIcon}from '../../assets/original.svg';
import {selectCartItemCount} from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, itemCount}) =>(
  <div className='cart-icon' onClick = {toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>{itemCount}</span>
  </div>
)

const mapDispatchToProps = dispatch =>({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) =>({
    itemCount:selectCartItemCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps) (CartIcon);
