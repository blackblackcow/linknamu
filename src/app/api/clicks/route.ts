import { getClicksCollection } from "@/lib/mongodb";
import { linkIds } from "@/lib/links";

// 모든 링크의 클릭 수를 한 번에 반환한다. 예: { "github": 42, "blog": 3 }
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: [...linkIds] } }).toArray();
    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 링크 하나의 클릭 수를 1 늘린다. body: { "id": "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
