import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";

// TODO: 보여 주기용 더미 데이터. 실제 프로필과 링크로 교체할 것.
const profile = {
  name: "김개발",
  bio: "풀스택 개발자| 요즘에는 ai 개발에 관심이 많아요",
  imageUrl: "/profile.png",
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
