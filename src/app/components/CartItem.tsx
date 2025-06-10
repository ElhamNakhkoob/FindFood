function CartItem() {
  return (
    <div className="grid grid-cols-10 bg-slate-100 mb-4">
      <img className="col-span-2" src="/person.png" alt="" />
      <div>
        <h2>Product Name</h2>
        <p>
          number of Products: <span>2</span>
        </p>
        <p>
          Price: <span>22$</span>
        </p>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition">
            +
          </button>
          <span className="text-lg font-medium">3</span>
          <button className="px-4 py-2 bg-[#D9AC84] text-white rounded hover:bg-[#DE8436] transition">
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
