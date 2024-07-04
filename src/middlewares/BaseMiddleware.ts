abstract class AMiddleware implements IMiddleware {
  abstract handle(context: any): Promise<void>
}
