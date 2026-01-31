import Counter from '../../components/Counter/Counter';
import { useCart } from '../../context';
import TrashIcon from '../../assets/trash.svg';
import { formatPrice } from '../../utils';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Cart = () => {
	const { items, removeItem, changeQuantity, clear } = useCart();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [orderSuccess, setOrderSuccess] = useState(false);

	const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleCheckout = async () => {
		setIsProcessing(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		clear();
		setIsProcessing(false);
		setOrderSuccess(true);
	};

	if (orderSuccess) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen gap-6 px-4'>
				<h1 className='text-2xl text-[#0B254B] text-center orbitron-bold'>Pedido Realizado!</h1>
				<div className='flex flex-col items-center gap-4 text-center'>
					<p className='text-lg text-[#0B254B]'>Seu pedido foi processado com sucesso</p>
					<p className='text-sm text-gray-600'>Obrigado por comprar conosco!</p>
					<button
						onClick={() => navigate('/')}
						className='bg-[#0B254B] text-white px-6 py-3 rounded-lg hover:bg-[#0B254B]/90 transition-colors'
					>
						Voltar para a loja
					</button>
				</div>
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen gap-6 px-4'>
				<h1 className='text-2xl text-[#0B254B] text-center orbitron-bold'>Seu Carrinho</h1>
				<div className='flex flex-col items-center gap-4 text-center'>
					<p className='text-lg text-[#0B254B]'>Seu carrinho está vazio</p>
					<p className='text-sm text-gray-600'>Adicione alguns produtos para continuar comprando</p>
					<button
						onClick={() => navigate('/')}
						className='bg-[#0B254B] text-white px-6 py-3 rounded-lg hover:bg-[#0B254B]/90 transition-colors'
					>
						Continuar comprando
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-4 min-h-screen items-center'>
			<h1 className='text-2xl text-[#0B254B] text-center mt-10 orbitron-bold'>Seu Carrinho</h1>
			<div className='flex flex-col lg:flex-row gap-8 w-full max-w-6xl px-4'>
				<div className='flex flex-col gap-4 flex-1'>
					<h2 className='text-2xl text-[#0B254B] text-center orbitron-bold'>
						Detalhes do seu pedido
					</h2>
					{items.map((item) => (
						<div
							key={item.id}
							className='flex flex-col sm:flex-row gap-4 items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm'
						>
							<img src={item.image} alt={item.name} className='w-20 h-20 object-contain' />
							<div className='flex flex-col gap-2 text-center sm:text-start w-full'>
								<h3 className='text-lg text-[#0B254B] orbitron-bold'>{item.name}</h3>
								<p className='text-sm text-[#0B254B]'>{formatPrice(item.price)}</p>
							</div>
							<div className='flex flex-row gap-2 items-center'>
								<Counter
									initialValue={item.quantity}
									onChange={(value) => {
										changeQuantity({ ...item, quantity: value });
									}}
								/>
								<img
									src={TrashIcon}
									alt='trash'
									className='w-6 h-6 cursor-pointer mr-4'
									onClick={() => removeItem(item)}
								/>
							</div>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-4 w-full lg:w-80 bg-white p-6 rounded-lg shadow-md h-fit sticky top-4'>
					<h2 className='text-xl text-[#0B254B] orbitron-bold'>Resumo do pedido</h2>
					<div className='flex flex-col gap-2'>
						<div className='flex justify-between items-center'>
							<span className='text-[#0B254B]'>Subtotal</span>
							<span className='text-[#0B254B]'>{formatPrice(totalPrice)}</span>
						</div>
						<div className='flex justify-between items-center'>
							<span className='text-[#0B254B]'>Frete</span>
							<span className='text-[#0B254B]'>Grátis</span>
						</div>
						<div className='border-t border-gray-200 my-2'></div>
						<div className='flex justify-between items-center'>
							<span className='text-lg font-bold text-[#0B254B]'>Total</span>
							<span className='text-lg font-bold text-[#0B254B]'>{formatPrice(totalPrice)}</span>
						</div>
					</div>
					<button
						className='w-full bg-[#0B254B] text-white py-3 rounded-lg hover:bg-[#0B254B]/90 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleCheckout}
						disabled={isProcessing}
					>
						{isProcessing ? 'Processando...' : 'Finalizar pedido'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
