import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links } from "@/lib/links";

// TODO: 보여 주기용 더미 데이터. 실제 프로필로 교체할 것.
const profile = {
  name: "김개발",
  bio: "풀스택 개발자| 요즘에는 ai 개발에 관심이 많아요",
  imageUrl: "/profile.png",
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-4 py-12">
      <ProfileHeader {...profile} />
      <LinkList links={links} />
    </main>
  );
}
