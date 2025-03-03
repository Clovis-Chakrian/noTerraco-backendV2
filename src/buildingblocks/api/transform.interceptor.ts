import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiResponse } from "./api-response-dto";
import { Request } from "express";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(map(data => new ApiResponse(data, (request.method == 'POST' ? 201 : 200), request.path, request.method, [], 'SUCCESS')));
  }
}