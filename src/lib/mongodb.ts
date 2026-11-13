import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 모드에서는 HMR로 모듈이 다시 로드되어도 연결을 재사용하도록 global에 보관한다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결에 실패하면 캐시를 비워서 다음 요청 때 다시 시도하게 한다.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export type ClickDoc = { _id: string; count: number };

export async function getClicksCollection() {
  const client = await getMongoClient();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}
