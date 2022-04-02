import { useEffect, useState } from 'react';

function App() {
	const titles = ['Position', 'Coin', 'Price', 'Price Change', '24h Volume'];
	const [coins, setCoins] = useState([]);
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [textSearch, setTextSearch] = useState('');
	const handleChange = e => {
		setTextSearch(e.target.value);
	};

	useEffect(() => {
		const searchCoin = textSearch => {
			setFilteredCoins(
				coins.filter(
					coin =>
						coin.name.toLowerCase().includes(textSearch.toLowerCase()) ||
						coin.symbol.toLowerCase().includes(textSearch.toLowerCase())
				)
			);
		};
		searchCoin(textSearch);
	}, [textSearch, coins]);

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
		)
			.then(res => res.json())
			.then(data => {
				setCoins(data);
				setFilteredCoins(data);
			})
			.catch(err => console.error(err));
	}, []);
	return (
		<div className='container text-white p-3 mt-3'>
			<h1 className='pt-6'>CoinMarket</h1>
			<input
				type='text'
				className='form-control bg-dark text-light border-0 my-4 text-center rounded-0'
				onChange={handleChange}
        placeholder='Search coin'
			/>
			<table className='table table-dark'>
				<thead>
					<tr>
						{titles.map((title, i) => (
							<th key={i}>{title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredCoins.map((coin, i) => (
						<tr key={coin.id}>
							<td className='text-muted'>{i + 1}</td>
							<td>
								<img
									src={coin.image}
									alt={coin.name}
									style={{ width: '2rem' }}
								/>
								<span className='ms-3'>{coin.name}</span>
								<span className='text-muted text-uppercase ms-2'>
									{coin.symbol}
								</span>
							</td>
							<td>$ {coin.current_price.toLocaleString()}</td>
							<td
								className={
									coin.price_change_percentage_24h > 0
										? 'text-success'
										: 'text-danger'
								}
							>
								{coin.price_change_percentage_24h}
							</td>
							<td>{coin.total_volume.toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
