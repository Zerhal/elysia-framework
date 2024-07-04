
interface IMiddleware {
    handle(context: any): Promise<void>;
  }