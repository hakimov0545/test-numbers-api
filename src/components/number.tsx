import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Select, Typography, InputNumber, Skeleton } from "antd";
import { useDebounce } from "ahooks";

export const Numbers = () => {
	const [type, setType] = useState<string>("trivia");
	const [number, setNumber] = useState<number | null>(null);

	// Debounce hookdan foydalanib, debouncedNumber ni olamiz
	const debouncedNumber = useDebounce(number, { wait: 500 }); // 500ms kechikish

	const handleTypeChange = (value: string) => {
		setType(value);
	};

	const handleNumberChange = (value: number | null) => {
		setNumber(value);
	};

	// useQuery will refetch when "type" or "debouncedNumber" changes
	const { data, isLoading } = useQuery(
		["data", type, debouncedNumber], // Query key depends on type and debounced number
		async () => {
			const res = await axios.get(
				`http://numbersapi.com/${
					debouncedNumber || "random"
				}/${type}?json&min=1&max=9999`
			);
			return res.data;
		},
		{
			enabled: !!type, // Ensure the query runs only when type is defined
		}
	);

	return (
		<div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-10 max-w-[800px]">
				<Typography.Title
					style={{ fontSize: "50px" }}
					className="text-center text-gray-800 mb-10"
				>
					Numbers API
				</Typography.Title>
				<div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
					<div className="flex-1 text-center">
						{isLoading ? (
							<>
								<Skeleton.Input
									style={{
										width: 250,
										height: 40,
									}}
									active
								/>
								<Skeleton.Input
									style={{
										width: 250,
										height: 40,
										marginTop: "10px",
									}}
									active
								/>
							</>
						) : (
							<>
								<Typography.Title
									level={2}
									className="text-4xl text-gray-800"
								>
									{data?.number || "Random number"}
								</Typography.Title>
								<Typography.Title
									level={3}
									className="text-2xl text-gray-600"
								>
									{data?.text ||
										"No data available"}
								</Typography.Title>
							</>
						)}
					</div>

					{/* Select for Type */}
					<div className="flex-1 text-center">
						<Select
							value={type} // Add value to preserve selected type
							defaultValue="trivia"
							className="mb-4"
							style={{
								width: 250,
								height: 40,
								fontSize: "18px", // Adjust the font size here
							}}
							onChange={handleTypeChange}
							options={[
								{
									value: "trivia",
									label: (
										<p className="text-lg">
											Trivia
										</p>
									),
								},
								{
									value: "year",
									label: (
										<p className="text-lg">
											Year
										</p>
									),
								},
								{
									value: "date",
									label: (
										<p className="text-lg">
											Date
										</p>
									),
								},
								{
									value: "math",
									label: (
										<p className="text-lg">
											Math
										</p>
									),
								},
							]}
						/>
						<p className="text-green-500 mb-3">
							Leave empty for random
						</p>
						{/* Input for Number */}
						<InputNumber
							value={number} // Add value to preserve input number
							style={{
								width: 250,
								height: 40,
								fontSize: "18px", // Adjust the font size here
							}}
							min={1}
							max={9999}
							placeholder="Enter a number (optional)"
							onChange={handleNumberChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
