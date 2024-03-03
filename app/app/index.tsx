// pages/index.tsx
import React from "react";
import { useQuery } from "react-query"; // T3 Stackで推奨される可能性があるデータフェッチライブラリ
import axios from "axios"; // HTTPクライアント

// 型安全なAPI呼び出しのためのエンドポイントとパラメータの型を定義
interface UserData {
  id: number;
  name: string;
  email: string;
}

// APIからユーザーデータを取得する関数
const fetchUserData = async (): Promise<UserData[]> => {
  const response = await axios.get("/api/users");
  return response.data;
};

const HomePage = () => {
  // React Queryを使用してユーザーデータを非同期でフェッチ
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserData[]>("users", fetchUserData);

  // データのローディング中はローディングインジケータを表示
  if (isLoading) return <div>Loading...</div>;

  // エラーがあれば表示
  if (error) return <div>An error occurred</div>;

  // ユーザーデータを表示
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
