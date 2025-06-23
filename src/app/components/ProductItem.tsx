export interface IProductItemProps {
  id?: string;
  image?: string;
  title?: string;
  price?: number;
  description?: string;
}
export interface IProductList {
  first: number | null;
  last: number | null;
  next: number | null;
  items: number | null;
  pages: number;
  prev: number | null;
  data: IProductItemProps[];
}

function ProductItem({ image, title, price }: IProductItemProps) {
  return (
    <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-white flex flex-col h-full max-w-xs sm:max-w-sm mx-auto border border-gray-100">
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
          {title}
        </h3>
        <p className="text-[#DE8436] font-bold text-sm sm:text-base">
          Price: ${price}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
