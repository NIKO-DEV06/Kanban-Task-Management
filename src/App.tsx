import MobileHeader from "./components/MobileHeader";
import Header from "./components/Header";

import Sidebar from "./components/Sidebar";

function App() {
  return (
    <main className="bg-[#F4F7FD] dark:bg-[#20212C]">
      <MobileHeader />
      <Header />
      <Sidebar />
    </main>
  );
}

export default App;
