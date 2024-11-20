import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

async function Allbooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allbooks: BookData[] = await response.json();
  return (
    <div>
      {allbooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function Recobooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Recobooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Allbooks />
      </section>
    </div>
  );
}
