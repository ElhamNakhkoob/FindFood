export interface IProductItemProps {
  id?: string;
  image?: string;
  title?: string;
  price?: number;
  description?: string;
}

function ProductItem({ image, title, price }: IProductItemProps) {
  return (
    <div className="shadow-md">
      <img src={image} alt="steack" />
      <div className="p-2">
        <h3>{title}</h3>
        <p>
          price: <span>{price}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
