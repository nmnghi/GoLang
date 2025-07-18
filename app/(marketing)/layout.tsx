import Footer from "./footer";
import Header from "./header";

export default function MarketingLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1 flex flex-col items-center justify-center">
            {children}
        </main>
        <Footer/>
    </div>
  );
}