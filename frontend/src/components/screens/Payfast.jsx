 import React from 'react'
 import "./payfast.css";
 import {useSelector, useDispatch} from 'react-redux';
 import pay from '../../images/pay.png';

 const Payfast = () => {

  const cart = useSelector((state) => state.cart);

const handlePaying =(e)=>{
     e.preventDefault();
     


}




  return (
<div className='payments-method'>
    <form action="https://www.payfast.co.za/eng/process" method="post">
    <input type="hidden" name="merchant_id" value="15885475"/>
    <input type="hidden" name="merchant_key" value="8ybbtqzq9t8kb"/>
    <input type="hidden" name="amount" value="100.00"/>
    <input type="hidden" name="item_name" value="Test Product"/>
    {/* <input type="submit"/> */}
<button class="button button--full" type="submit"><img src={pay}/>Payfast</button>

 </form>
</div>



  )
}

export default Payfast;












 