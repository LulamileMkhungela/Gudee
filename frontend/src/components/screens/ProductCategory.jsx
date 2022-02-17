import capture from '../../images/Capture.PNG'
import captur1 from '../../images/iphone.png'
import capture2 from '../../images/Capture2.PNG'
import './cart.css'
import {useState, useEffect} from 'react'
import {addProduct} from "../../Redux/cartRedux";
import {addwishlist} from "../../Redux/wishlistRedux";
import axios from 'axios';


import {useSelector, useDispatch} from 'react-redux';
import Explore from './NavExplore'


const ProductCategory = () => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [wishquantity, setWishQuantity] = useState(1);
    const [products, setProducts] = useState([
        {
            id: "1",
            name: 'Laptop',
            cost: 'R200.99',
            description: 'dell i5 model with good results',
            image: {capture2}

        },
        {
            id: "2",
            name: 'iphone 1',
            cost: 'R1900.99',
            description: 'second hand cellphone',
            image: {captur1}

        },
        {
            id: "3",
            name: 'iphone 12',
            cost: 'R1900.99',
            description: 'second hand cellphone',
            image: {captur1}

        }
    ]);

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(
            addProduct({...product, quantity})
        );
    };
    const handlewishClick = () => {
        dispatch(
            addwishlist({...product, wishquantity})
        );
    };


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(' http://localhost:5000/api/products');
            setProducts(data);
            console.log(data);

        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="products">
                {products.map((product, idx) => (
                    <div className="product">
                        <div>
                            <img src={product.image} alt="name"/>
                            <div className="details">{product.name}
                            </div>
                            <div>{product.description}</div>
                            <div className="price">{product.cost}
                            </div>
                            <button onClick={handleClick}><i className="fa fa-briefcase"></i> Add to card</button>
                            <span><button className="wish" onClick={handlewishClick}> <i className="fa fa-heart-o"></i>add to WhishList</button></span>
                        </div>
                    </div>
                ))};
            </div>
        </div>
    )
}
export default ProductCategory;


