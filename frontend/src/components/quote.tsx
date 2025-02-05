export default function Quote() {
    return (
      <div className="flex h-full items-center justify-center p-6 md:p-12 bg-slate-300 ">
        <blockquote className="space-y-2">
          <p className="text-3xl text-black font-bold mb-4">"The Customer service i recieved was exceptional. The support team went above and beyond to address my concerns."</p>
          <footer className="text-xm text-black font-semibold ">-Jules Winnfield </footer>
          <footer className="text-sm text-slate-500">CEO, Acme Inc</footer>
        </blockquote>
      </div>
    )
  }