import Container from "../components/Container";
import CartItem from "../components/CartItem";

function Cart() {
  return (
    <Container>
      <h1>Cart</h1>
      <div className="">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="border shadow-md">
        <h3>
          Price: <span>23$</span>
        </h3>
        <h3>
          takhfif <span>12$</span>
        </h3>
        <h3>
          Total Price: <span>33$</span>
        </h3>
        <div>
          <input placeholder="enter discount code" type="text" />
          <button>Code</button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
