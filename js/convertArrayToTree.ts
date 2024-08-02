/**
 * 構建包含兩個泛型 key 的對象
 * @template P - 第一個泛型鍵的類型
 * @template PP - 第二個泛型鍵的類型
 * @typedef {Object} Params
 * @property {string} [key in P] - 第一個泛型鍵的屬性，類型為字符串
 * @property {string} [key2 in PP] - 第二個泛型鍵的屬性，可選，類型為字符串
 */
type Params<P extends string, PP extends string> = {
  [key in P]: string;
} & {
  [key2 in PP]?: string;
};

/**
 * 添加子節點屬性
 * @template T - 節點類型
 * @template C - 子節點屬性名類型，默認為 'children'
 * @typedef {Object} AddChildern
 * @property {Array<AddChildern<T, C>>} [key3 in C] - 子節點數組
 */
type AddChildern<
  T extends ArrayNode<any, any>,
  C extends string = 'children',
> = T & { [key3 in C]: Array<AddChildern<T, C>> };

/**
 * 數組節點類型
 * @template P - 第一個泛型鍵的類型，默認為 'id'
 * @template PP - 第二個泛型鍵的類型，默認為 'parentId'
 * @typedef {Params<P, PP>} ArrayNode
 */
type ArrayNode<
  P extends string = 'id',
  PP extends string = 'parentId',
> = Params<P, PP>;

/**
 * 樹節點類型
 * @template T - 節點類型
 * @template P - 第一個泛型鍵的類型，默認為 'id'
 * @template PP - 第二個泛型鍵的類型，默認為 'parentId'
 * @template C - 子節點屬性名類型，默認為 'children'
 * @typedef {AddChildern<T, C>} TreeNode
 */
type TreeNode<
  T,
  P extends string = 'id',
  PP extends string = 'parentId',
  C extends string = 'children',
> = T extends ArrayNode<P, PP> ? AddChildern<T, C> : never;

/**
 * 將數組轉換為樹結構
 * @template T - 數組元素類型
 * @template P - 第一個泛型鍵的類型，默認為 'id'
 * @template PP - 第二個泛型鍵的類型，默認為 'parentId'
 * @template C - 子節點屬性名類型，默認為 'children'
 * @param {Array<T>} arr - 輸入數組
 * @param {P} [id='id'] - 元素的 ID 屬性名
 * @param {PP} [parentId='parentId'] - 元素的父 ID 屬性名
 * @param {C} [children='children'] - 子節點屬性名
 * @returns {Array<TreeNode<T, P, PP, C>>} - 轉換後的樹結構數組
 */
export function ｀<
  T,
  P extends string = 'id',
  PP extends string = 'parentId',
  C extends string = 'children',
>(
  arr: T extends ArrayNode<P, PP> ? T[] : never,
  id: P = 'id' as P,
  parentId: PP = 'parentId' as PP,
  children: C = 'children' as C,
) {
  const temp: { [str: string]: TreeNode<T, P, PP, C> } = {};
  const tree: TreeNode<T, P, PP, C>[] = [];
  for (let i = 0; i < arr.length; i++) {
    temp[arr[i][id]] = arr[i] as TreeNode<T, P, PP, C>;
  }
  for (let i = 0; i < arr.length; i++) {
    if (temp[arr[i][parentId]]) {
      let childrenValue = temp[arr[i][parentId]][children];
      if (!childrenValue) {
        childrenValue = [] as unknown as TreeNode<T, P, PP, C>[C];
      }
      childrenValue!.push(arr[i] as TreeNode<T, P, PP, C>);
      temp[arr[i][parentId]][children] = childrenValue;
    } else {
      tree.push(arr[i] as TreeNode<T, P, PP, C>);
    }
  }
  return tree;
}