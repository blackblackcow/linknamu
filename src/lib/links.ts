// TODO: 보여 주기용 더미 데이터. 실제 링크로 교체할 것.
// id는 클릭 수를 저장하는 키이므로 한 번 정하면 바꾸지 않는다.
export const links = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/" },
] as const;

export type Link = (typeof links)[number];

export const linkIds: readonly string[] = links.map((link) => link.id);
