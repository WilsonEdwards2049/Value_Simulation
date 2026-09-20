/** 模拟 axios 错误形状，让 store 中既有的 error.response.status / .data.detail 判断继续生效。 */
export class ApiError extends Error {
  response: { status: number; data: { detail: string } };

  constructor(status: number, detail: string) {
    super(detail);
    this.name = 'ApiError';
    this.response = { status, data: { detail } };
  }
}
