import UrlBox from "@/components/UrlBox";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full items-center justify-center p-5">
      <h1 className="text-4xl font-bold text-center mt-12 mb-8">ShorterUrl</h1>
      <UrlBox />
    </main>
  )
}
