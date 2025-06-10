export interface IProductItemProps {
  id?: string;
  image?: string;
  title?: string;
  price?: number;
  description?: string;
}

function ProductItem({ image, title, price }: IProductItemProps) {
  return (
    <div className="shadow-md rounded-md overflow-hidden bg-white flex flex-col h-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
        <p className="text-[#DE8436] font-bold text-sm sm:text-base">
          price: {price}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
