import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";

// TODO: 보여 주기용 더미 데이터. 실제 프로필과 링크로 교체할 것.
const profile = {
  name: "홍길동",
  bio: "웹 개발자 · 링크나무에 오신 걸 환영해요",
  imageUrl: "/profile-placeholder.svg",
};

const links = [
  { title: "GitHub", url: "https://github.com/" },
  { title: "LinkedIn", url: "https://www.linkedin.com/" },
  { title: "Blog", url: "https://example.com/" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-4 py-12">
      <ProfileHeader {...profile} />
      <nav className="flex w-full flex-col gap-5">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
