import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { useCart, useProducts } from "../../context";
import { formatPrice } from "../../utils";
import { useNavigate, useParams } from "react-router";
import Selector from "../../components/Selector/Selector";
import type { Product } from "../../types";
import withForm from "../../components/withForm";
import RadioGroup from "../../components/RadioButton/RadioGroup";

const EnhancedRadioGroup = withForm(RadioGroup);
const EnhancedSelector = withForm(Selector);

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, products, setSelectedProduct } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.colors?.[0],
  );
  const [selectedSize, setSelectedSize] = useState(selectedProduct?.sizes?.[0]);
  const [product, setProduct] = useState<Product | null>(selectedProduct);

  useEffect(() => {
    if (!selectedProduct && id) {
      // Try to find the product in the products list first
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedProduct(foundProduct);
      } else {
        // If not found in the list, fetch it directly
        fetch(`http://localhost:3001/products/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
            setSelectedProduct(data);
          })
          .catch(() => {
            setProduct(null);
          });
      }
    }
  }, [id, selectedProduct, products, setSelectedProduct]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.sizes?.[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      ...product,
      quantity,
      colors: [selectedColor ?? ""],
      sizes: [selectedSize ?? ""],
    });
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-[#0B254B]">Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl text-[#0B254B] orbitron-bold mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-[#0B254B] opacity-80">
                {product.description}
              </p>
            </div>

            <div className="text-2xl font-bold text-[#780BF7]">
              {formatPrice(product.price ?? 0)}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 1 && (
							<div className='space-y-3'>
								<h3 className='text-lg font-semibold text-[#0B254B]'>Cor</h3>
								<EnhancedRadioGroup
									options={product.colors}
									initialValue={selectedColor}
									onChange={(value) => setSelectedColor(value as string)}
									controlledValue={selectedColor}
								/>
							</div>
						)}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#0B254B]">
                  Tamanho
                </h3>
                <EnhancedSelector
                  label="Selecione o tamanho"
                  options={product.sizes}
                  onChange={(value) => setSelectedSize(value as string)}
                  controlledValue={selectedSize}
                />
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#0B254B]">
                Quantidade
              </h3>
              <EnhancedSelector
                label="Selecione a quantidade"
                options={Array.from({ length: 10 }, (_, i) =>
                  (i + 1).toString(),
                )}
                onChange={(value) => setQuantity(Number(value))}
                controlledValue={quantity}
              />
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="add-to-cart"
              onClick={handleAddToCart}
              className="w-full py-4 text-lg font-semibold mt-4"
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
