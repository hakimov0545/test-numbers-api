import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { Numbers } from "./components/number";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Numbers />
		</QueryClientProvider>
	);
}

export default App;
