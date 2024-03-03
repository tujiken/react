export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    //URLからデータを取得
    fetch(url)
      //取得したデータをjson形式に変換
      .then((res) => res.json())
      //json形式に変換したデータをresolveで返す
      .then((data) => {
        resolve(data);
      });
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
